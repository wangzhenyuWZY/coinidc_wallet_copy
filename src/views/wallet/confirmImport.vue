<!-- home -->
<template>
  <div class="container">
    <!-- <Title :title="$t('mall53')"></Title> -->
    <div class="daoruStep">
      <p>步骤2/<span>2</span>邀请信息</p>
    </div>
    <div class="createContainer">
      <div class="set_input">
        <Input :label="$t('mall125')" :icon='false' :disabled='hasUser' :modelVal='address' v-model="address" />
      </div>
      <div class="set_input">
        <Input :label="$t('mall72')" :icon='false' :disabled='hasUser' :placeholder="$t('mall102')" :modelVal='name' v-model="name" />
      </div>
      <div class="set_input" v-show="!hasUser">
        <div class="globle_inputs">
          <div class="input_lable">{{$t('mall47')}}</div>
          <div class="globle_input">
            <div class="input_lt">
              <input :placeholder="$t('mall48')" v-model="inviteCode">
            </div>
          </div>
        </div>
      </div>
      <div class="btn">
        <van-button class="globel_button" :loading="isConfirm" :disabled='isConfirm' type="info"  @click="handelClick">{{$t('mall109')}}
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
const TronWeb = require('tronweb');
var lightwallet = require('eth-lightwallet')
import Title from '@/components/Title'
import Input from '@/components/Input'
import { setStore,getStore,objIsNull} from "@/config/utils";
import { Toast} from 'vant'
import {preImport} from '@/api/user'
import {login} from '@/api/user'
export default {
  data() {
    return {
      showEye: false,
      isConfirm:false,
      address:'',
      inviteCode:'',
      name:'',
      walletDetail:{},
      hasUser:false
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
    let walletDetail = sessionStorage.getItem('importWalletDetail')
    if (!objIsNull(walletDetail)) {
      this.walletDetail = JSON.parse(walletDetail)
      this.createTronWeb()
      this.checkPreImport()
    }
  },
  methods: {
    createTronWeb(){
      let that = this
      let privateKey = that.walletDetail.privateKey
      const fullNode = 'https://api.trongrid.io';
      const solidityNode = 'https://api.trongrid.io';
      const eventServer = 'https://api.trongrid.io';
      window.tronWeb = new TronWeb(fullNode,solidityNode,eventServer,privateKey)
      that.address = window.tronWeb.defaultAddress.base58
      if(window.tronWeb){
        window.tronWeb.setAddress(window.tronWeb.defaultAddress.base58)
      }
    },
    checkPreImport(){
      let that = this
      preImport({trxAddress:this.address}).then(res=>{
        if(res.data.resultCode==999999){
          that.name = res.data.resultData
          that.address = this.address
        }else if(res.data.resultCode==100005){
            let userId = getStore('idctUserId');
            let walletList = getStore("walletList");
            if (!objIsNull(walletList)) {
              this.hasUser = false;
            }else {
              if(userId){
                that.hasUser  = true
              }else{
                that.hasUser  = false;
              }
            }
        }
      })
    },
    handelClick() {
      let that = this
      let walletList = getStore('walletList')
      let wallet = []
      if (!objIsNull(walletList)) {
        wallet = JSON.parse(walletList)
      }
      let data = {
        name:this.name,
        idctUserId:wallet.length>0?'':(getStore('idctUserId')?getStore('idctUserId'):''),
        inviteCode:this.inviteCode,
        trxAddress:this.address
      }
      login(data).then((res)=>{
        if(res.data.resultCode==999999){
          setStore('token', res.data.resultData)
          that.walletDetail.walletName = that.name
          that.walletDetail.inviteCode = that.inviteCode
          if(!objIsNull(walletList)){
            walletList = JSON.parse(walletList)
            walletList.forEach((item,index)=>{
              item.isCurrent = false
            })
            walletList.push(that.walletDetail)
            setStore('walletList', JSON.stringify(walletList));
          }else{
            let arr = []
            arr.push(that.walletDetail)
            setStore('walletList', JSON.stringify(arr));
          }
          that.$router.push('/walletAssets/wallet')
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
.globle_inputs {
  .input_lable {
    font-size: 16px;
    font-weight: 400;
    color: #000000;
    margin-bottom: 10px;
  }
  .globle_input {
    display: flex;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08);
    border-radius: 6px;
    border: 1px solid #cad5de;
    padding-right: 15px;
    .input_lt {
      flex: 1;
      padding-left: 12px;
      overflow: hidden;
      display: flex;
      input {
        flex: 1;
        height: 50px;
        font-size: 14px;

        &::placeholder {
          color: #b6c6d3;
          font-size: 14px;
        }
      }
    }
    .rg_icon {
      display: flex;
      align-items: center;
    }
  }
}
</style>
