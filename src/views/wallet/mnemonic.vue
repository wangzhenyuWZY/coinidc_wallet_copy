<!-- home -->
<template>
  <div class="container">
    <!-- <Title :title="$t('mall53')"></Title> -->
    <div class="daoruStep">
      <p>步骤1/<span>2</span>基本信息</p>
      <div class="daoruTab">
        <a :class="tab==0?'active':''" @click="tab=0">助记词</a>
        <a :class="tab==1?'active':''" @click="tab=1">私钥</a>
      </div>
    </div>
    <div class="createContainer">
      <p class="createTitle">{{tab==0?$t('mall53'):$t('mall123')}}</p>
      <div class="mnem" v-show="tab==0">
        <textarea class="input_text" v-model="mnemonic" :placeholder="$t('mall54')" />
      </div>
      <div class="mnem" v-show="tab==1">
        <textarea class="input_text" v-model="pwDerivedKey" :placeholder="$t('mall124')" />
      </div>
      <!-- <div class="set_input">
        <Input :label="$t('mall72')" :icon='false' :placeholder="$t('mall102')" v-model="name" />
      </div> -->
      <div class="set_input">
        <Input :label="$t('mall22')" :showEye='false' :placeholder="$t('mall23')" v-model="password" />
      </div>
      <div class="set_input">
        <Input  :placeholder="$t('mall45')" :showEye='false' v-model="passwordAgen" />
      </div>
      <div class="btn">
        <van-button class="globel_button" :loading="isConfirm" :disabled='isConfirm' type="info"  @click="handelClick">{{$t('mall106')}}
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
const hdkey = require('ethereumjs-wallet/dist/hdkey');
const util = require('ethereumjs-util');
const Wallet = require('ethereumjs-wallet');
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
      name:'',
      tab:0,
      pwDerivedKey:''
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
  created(){
    sessionStorage.clear()
  },
  methods: {
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
      let walletItem = {}
      if(this.tab==0){
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
              walletItem = {
                mnemonic:secretSeed,
                privateKey:privateKey,
                address:addresses,
                isFirstIn:true,
                walletName:'',
                walletPassword:password,
                isCurrent:true,
                inviteCode:''
              }
              that.isConfirm = false
              sessionStorage.setItem('importWalletDetail',JSON.stringify(walletItem))
              that.$router.push('/wallet/confirmImport')
            })
          })
      }else{
        let fixturePrivateKeyStr =  this.pwDerivedKey
        let fixturePrivateKeyBuffer = Buffer.from(fixturePrivateKeyStr, 'hex')
        let fixtureWallet = Wallet.default.fromPrivateKey(fixturePrivateKeyBuffer); 
        let fixturePrivateKey = fixtureWallet.getPrivateKey().toString('hex');
        let address = util.pubToAddress(fixtureWallet.getPublicKey(), true)
        address = util.bufferToHex(address)
        walletItem = {
          mnemonic:secretSeed,
          privateKey:this.pwDerivedKey,
          address:address,
          isFirstIn:true,
          walletName:'',
          walletPassword:password,
          isCurrent:true,
          inviteCode:''
        }
        that.isConfirm = false
        sessionStorage.setItem('importWalletDetail',JSON.stringify(walletItem))
        that.$router.push('/wallet/confirmImport')
      }
      
      // let walletList = getStore('walletList')
      // if(!objIsNull(walletList)){
      //   walletList = JSON.parse(walletList)
      //   walletList.forEach((item,index)=>{
      //     item.isCurrent = false
      //   })
      //   walletList.push(walletItem)
      //   setStore('walletList', JSON.stringify(walletList));
      // }else{
      //   let arr = []
      //   arr.push(walletItem)
      //   setStore('walletList', JSON.stringify(arr));
      // }
      
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
