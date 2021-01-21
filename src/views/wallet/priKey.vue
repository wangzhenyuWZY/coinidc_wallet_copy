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
        <Input :label="$t('mall72')" :icon='false' :placeholder="$t('mall102')" v-model="name" />
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
const hdkey = require('ethereumjs-wallet/dist/hdkey');
const util = require('ethereumjs-util');
const Wallet = require('ethereumjs-wallet');
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
      isConfirm:false,
      name:''
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
      if(this.password!==this.passwordAgen){
        Toast(this.$t('mall110'))
        return
      }
      let fixturePrivateKeyStr =  this.pwDerivedKey
      let fixturePrivateKeyBuffer = Buffer.from(fixturePrivateKeyStr, 'hex')
      let fixtureWallet = Wallet.default.fromPrivateKey(fixturePrivateKeyBuffer);
      
      let fixturePrivateKey = fixtureWallet.getPrivateKey().toString('hex');
      let address = util.pubToAddress(fixtureWallet.getPublicKey(), true)
      address = util.bufferToHex(address)
      
      let wallet = {
        privateKey:this.pwDerivedKey,
        address:address
      };
      let walletItem = {}
      walletItem.wallet = wallet;
      setStore('walletItem', walletItem)
      let data = {
          walletName:this.name,
          walletPassword: this.password
      }
      setStore('namepsd', data)
      this.$router.push('/walletAssets/wallet')
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
