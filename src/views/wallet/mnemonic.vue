<!-- home -->
<template>
  <div class="container">
    <Title :title="$t('mall53')"></Title>
    <div class="createContainer">
      <p class="createTitle">{{$t('mall53')}}助记词</p>
      <div class="mnem">
        <textarea class="input_text" v-model="mnemonic" :placeholder="$t('mall54')" />
      </div>
      <div class="set_input">
        <Input :label="$t('mall72')" :icon='false' :placeholder="$t('mall102')" v-model="name" />
      </div>
      <div class="set_input">
        <Input :label="$t('mall22')" :showEye='false' :placeholder="$t('mall23')" v-model="password" />
      </div>
      <div class="set_input">
        <Input  :label="$t('mall45')" :placeholder="$t('mall45')" :showEye='false' v-model="passwordAgen" />
      </div>
      <div class="btn">
        <!-- <van-button class="globel_button" style="margin-bottom:15px;"  @click="toKey">导入密钥
        </van-button> -->
        <van-button class="globel_button" :loading="isConfirm" :disabled='isConfirm' type="info"  @click="handelClick">{{$t('mall20')}}
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
var lightwallet = require('eth-lightwallet')
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
      mnemonic:'',
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
    toKey(){
      this.$router.push('/wallet/priKey')
    },
    handelClick() {
      let that = this
      if(this.password!==this.passwordAgen){
        Toast(this.$t('mall110'))
        return
      }
      var secretSeed = this.mnemonic//注记词
      var password = this.password;//密码
      var global_keystore = null
      let privateKey = null
      let addresses = null
      let flag = lightwallet.keystore.isSeedValid(secretSeed)
      if(!flag){
        Toast(this.$t('mall111'))
        return
      }
      this.isConfirm = true
      lightwallet.keystore.createVault({
          password: password,
          seedPhrase: secretSeed,
          //random salt
          hdPathString: "m/44'/195'/0'/0"
        }, function (err, ks) {
          global_keystore = ks
          global_keystore.keyFromPassword(password, function(err, pwDerivedKey) {
            global_keystore.generateNewAddress(pwDerivedKey);
            addresses = global_keystore.getAddresses()[0];
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
            let data = {
                walletName:that.name,
                walletPassword: that.password
            }
            setStore('namepsd', data)
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
