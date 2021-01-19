<!-- home -->
<template>
  <div class="container">
    <Title title="导入私钥"></Title>
    <div class="createContainer">
      <p class="createTitle">私钥</p>
      <div class="mnem">
        <textarea class="input_text" v-model="pwDerivedKey" placeholder="输入私钥" />
      </div>
      <div class="set_input">
        <Input label="密码" :showEye='false' placeholder="钱包密码" v-model="password" />
      </div>
      <div class="set_input">
        <Input placeholder="确认密码" :showEye='false' v-model="passwordAgen" />
      </div>
      <div class="btn">
        <van-button class="globel_button" :loading="isConfirm" :disabled='isConfirm' type="info"  @click="handelClick">确定
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
var lightwallet = require('eth-lightwallet')
var ethers = require('ethers')
import Title from '@/components/Title'
import Input from '@/components/Input'
import { setStore} from "@/config/utils";
import { Toast} from 'vant'
export default {
  data() {
    return {
      title: '创建钱包',
      showEye: false,
      password:'',
      passwordAgen:'',
      pwDerivedKey:'',
      isConfirm:false
    }
  },
  components: {
    Title,
    Input
  },
  computed: {
    
  },
  mounted() {

  },
  methods: {
    handelClick() {
      let that = this
      var privedKey = this.pwDerivedKey
      var password = this.password;//密码
      var global_keystore = null
      let privateKey = null
      let addresses = null
      if (privedKey.substr(0, 2) !== "0x") {
        privedKey = "0x" + privedKey;
      }
    //   let wallet = new ethers.Wallet(privedKey)
      let provider = ethers.getDefaultProvider();
let walletWithProvider = new ethers.Wallet(privedKey, provider);
      console.log(walletWithProvider.mnemonic)
      let keyStore = new lightwallet.keystore()
      let secretSeed = keyStore.getSeed(privedKey)
      console.log(secretSeed)
    //   return
    //   if(!flag){
    //     Toast('助记词有误')
    //     return
    //   }
      this.isConfirm = true
      lightwallet.keystore.createVault({
          password: password,
          seedPhrase: '',
          //random salt
          hdPathString: "m/44'/195'/0'/0"
        }, function (err, ks) {
          global_keystore = ks
          global_keystore.keyFromPassword(password, function(err, pwDerivedKey) {
            global_keystore.generateNewAddress(pwDerivedKey);
            addresses = global_keystore.getAddresses()[0];
            let secretSeed = global_keystore.getSeed(privedKey)
            privateKey = global_keystore.exportPrivateKey(addresses,pwDerivedKey)
            let wallet = {
              privateKey:privateKey,
              address:addresses
            };
            let walletItem = {}
            walletItem.wallet = wallet;
            walletItem.isFirstIn = true;
            setStore('mnemonic', secretSeed);
            setStore('walletItem', walletItem)
            that.isConfirm = false
            that.$router.push('/walletAssets/wallet')
          })
        })
    }
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
.createContainer {
  padding-top: 32px;
}
.mnem {
  width: 100%;
  overflow: hidden;
  display: flex;
  margin-top: 10px;
  .input_text {
    flex: 1;
    background: #ffffff;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08);
    border-radius: 3px;
    border: 1px solid #cad5de;
    resize: none;
    height: 120px;
    padding: 11px 12px;
    font-size: 14px;
    color: #000;
    &::placeholder {
      font-size: 14px;
      color: #b6c6d3;
    }
  }
}
</style>
