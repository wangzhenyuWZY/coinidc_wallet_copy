<!-- home -->
<template>
  <div class="container">
    <!-- <Title :title="title"></Title> -->
    <div class="createContainer">
      <p class="createTitle">{{$t('mall34')}}<span>(Step1/<span class="title_colr">2</span>)</span></p>
      <div class="set_input">
        <Input :label="$t('mall72')" :icon='false' :placeholder="$t('mall102')" v-model="name" />
      </div>
      <div class="set_input">
        <Input :showEye="false" :label="$t('mall43')" :placeholder="$t('mall44')" v-model="password" />
      </div>
      <div class="set_input">
        <Input :showEye="false" :label="$t('mall45')" :placeholder="$t('mall46')" v-model="passwordAgain" />
      </div>
      <div class="set_input" v-show="hasUserid">
        <Input :label="$t('mall47')" :icon='false' :placeholder="$t('mall48')" v-model="inviteCode" />
      </div>
      <div class="btn">
        <!-- <van-button class="globel_button" :loading="false" :disabled='disableds' type="info" loading-text="下载Keystore文件">下载Keystore文件</van-button> -->
        <van-button class="globel_button" :loading="isCreateding" :disabled='isCreateding' type="info" loading-text="确认" @click="handelClick">确认
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
const TronWeb = require('tronweb');
import Title from '@/components/Title'
import Input from '@/components/Input'
import { Notify } from 'vant'
import { objIsNull, removeStore, getStore,setStore, createWallet } from "@/config/utils";
import {login} from '@/api/user'
import { Toast } from 'vant'
export default {
  data() {
    return {
      title: this.$t('mall41'),
      showEye: false,
      password:'',
      passwordAgain:'',
      name:'',
      inviteCode:'',
      hasUserid:false,
      address:'',
      isCreateding:false
    }
  },
  components: {
    Title,
    Input
  },
  computed: {
    disableds() {
      return false
      //   if (this.from.pwd1 == '' || this.from.pwd2 == '') {
      //     return true
      //   }
      //   return false
    }
  },
  mounted() {
    removeStore("mnemonic");
    removeStore("walletItem");
    let userId = getStore('idctUserId')
    if(userId){
      this.hasUserid = false
    }else{
      this.hasUserid = true
    }
  },
  created(){
    if(!this.$route.query.isLogin){
      let walletList = getStore("walletList");
      if (!objIsNull(walletList)) {
        walletList = JSON.parse(walletList)
        walletList = walletList.filter(res=>{
          return res.isCurrent == false
        })
        setStore('walletList', JSON.stringify(walletList));
      }
    }
  },
  methods: {
    createTronWeb(walletItem){
      let that = this
      let privateKey = walletItem.privateKey
      const fullNode = 'https://api.trongrid.io';
      const solidityNode = 'https://api.trongrid.io';
      const eventServer = 'https://api.trongrid.io';
      window.tronWeb = new TronWeb(fullNode,solidityNode,eventServer,privateKey)
      that.address = window.tronWeb.defaultAddress.base58
      if(window.tronWeb){
        window.tronWeb.setAddress(window.tronWeb.defaultAddress.base58)
      }
      walletItem.address = window.tronWeb.defaultAddress.base58
      that.userLogin(walletItem)
    },
    handelClick() {
      if (objIsNull(this.name) || objIsNull(this.name)) {
        Toast(this.$t('mall49'))
        return;
      }
      if (objIsNull(this.password) || objIsNull(this.passwordAgain)) {
        Toast(this.$t('mall50'))
        return;
      }
      if (this.password.length > 15 || this.passwordAgain.length > 15) {
        Toast(this.$t('mall51'))
        return;
      }
      if (this.password !== this.passwordAgain) {
        Toast(this.$t('mall52'))
        return;
      }
      this.isCreateding = true
      createWallet(this.name,this.password,this.inviteCode).then((walletItem)=>{
        this.createTronWeb(walletItem)
      })
    },
    userLogin(walletItem){
      let that = this
      let data = {
        name:this.name,
        idctUserId:getStore('idctUserId')?getStore('idctUserId'):'',
        inviteCode:window.btoa(this.inviteCode),
        inviterCode:window.btoa(this.inviteCode),
        trxAddress:window.tronWeb.defaultAddress.base58
      }
      login(data).then((res)=>{
        that.isCreateding = false
        if(res.data.resultCode==999999){
          setStore('token', res.data.resultData)
          let walletList = getStore('walletList')
          if(!objIsNull(walletList)){
            walletList = JSON.parse(walletList)
            walletList.forEach((item,index)=>{
              item.isCurrent = false
            })
            walletList.push(walletItem)
            setStore('walletList', JSON.stringify(walletList));
          }else{
            let arr = []
            arr.push(walletItem)
            setStore('walletList', JSON.stringify(arr));
          }
          that.$router.push({
              path: "/wallet/step2",
              query: {
                  walletName:this.name,
                  walletPassword: this.password
              }
          });
        }else{
          Toast(res.data.resultDesc)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
