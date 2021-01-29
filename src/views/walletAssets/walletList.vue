<template>
  <div class="container">
    <div class="walletList">
      <div class="walletItemUl">
        <div class="walletItem" :class="item.isCurrent?'active':''" v-for="(item,index) in walletList" :key="index" @click="changeWallet(item,index)">
          <h2 class="walletName">{{item.walletName}}</h2>
          <p class="walletAddress">{{item.address}}</p>
          <i class="radioico"></i>
        </div>
      </div>
    </div>
    <div class="createOrImport">
      <router-link :to="{path:'/wallet/step1',query: { isLogin: true }}" class="btn">{{$t('mall34')}}</router-link>  
      <router-link to="/wallet/mnemonic" class="btn active">{{$t('mall109')}}</router-link> 
    </div> 
    <van-tabbar v-model="active" active-color="#6362F1" @change="onChange">
      <van-tabbar-item @click="toWallet">
        <!-- <template #icon="props"> -->
        <template>
          <div class="tabbar_img">
            <img :src="active == 0?require('../../assets/zican.svg'):require('../../assets/assetsh.png')" />
          </div>
        </template>
        <div class="tabbar_zise">{{$t('mall8')}}</div>
      </van-tabbar-item>
      <van-tabbar-item  @click="toMall">
        <template>
          <div class="tabbar_img">
            <img :src="active == 1?require('../../assets/liulanqs.png'):require('../../assets/liulanq.svg')" />
          </div>
        </template>
        <div class="tabbar_zise">{{$t('mall9')}}</div>
      </van-tabbar-item>
      <van-tabbar-item>
        <template>
          <div class="tabbar_img">
            <img :src="active == 2?require('../../assets/walletSel.png'):require('../../assets/wallet.png')" />
          </div>
        </template>
        <div class="tabbar_zise">{{$t('mall1')}}</div>
      </van-tabbar-item>
      <van-tabbar-item @click="toHome">
        <template>
          <div class="tabbar_img">
            <img :src="active == 3?require('../../assets/meIcoActive.png'):require('../../assets/meIco.png')" />
          </div>
        </template>
        <div class="tabbar_zise">{{$t('mall99')}}</div>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
const TronWeb = require('tronweb');
import {login,queryWalletList} from '@/api/user'
import { getStore, setStore, objIsNull } from "@/config/utils"
import { Toast } from 'vant';
export default {
  data() {
    return {
      active: 2,
      walletList:[],
      walletItem:{}
    }
  },
  created(){
    let walletList = getStore('walletList')
    if(!objIsNull(walletList)){
      this.walletList = JSON.parse(walletList)
      let walletItem = this.walletList.filter(res=>{
        return res.isCurrent == true
      })
      this.walletItem = walletItem[0]
    }
    this.createTronWeb()
  },
  mounted(){
    
  },
  methods: {
    createTronWeb(){
      let that = this
      let privateKey = this.walletItem.privateKey
      const fullNode = 'https://api.trongrid.io';
      const solidityNode = 'https://api.trongrid.io';
      const eventServer = 'https://api.trongrid.io';
      window.tronWeb = new TronWeb(fullNode,solidityNode,eventServer,privateKey)
      this.walletList.forEach((item,index)=>{
        item.address = window.tronWeb.address.fromHex(item.address)
      })
      if(window.tronWeb){
        window.tronWeb.setAddress(window.tronWeb.defaultAddress.base58)
      }
    },
    toWallet(){
      this.$router.push({
                  path: "/walletAssets/wallet"
              });
    },
    toMall(){
      this.$router.push({
                  path: "/mall"
              });
    },
    toHome(){
      this.$router.push({
                  path: "/home"
              });
    },
    onChange(index) {
      console.log(index)
    },
    changeWallet(item,index){
      let that = this
      let walletName = item.walletName
      let data = {
        name:walletName,
        idctUserId:getStore('idctUserId')?getStore('idctUserId'):'',
        inviteCode:window.btoa(item.inviteCode),
        trxAddress:window.tronWeb.address.fromHex(item.address)
      }
      login(data).then((res)=>{
        if(res.data.resultCode==999999){
          setStore('token', res.data.resultData)
          queryWalletList().then((result)=>{
            if(result.data.resultCode==999999){
              setStore('trxAddress',result.data.resultData.address)
              setStore('myInviteCode', result.data.resultData.inviteCode)
            }
          })
          that.$router.push('/walletAssets/wallet')
        }else{
          Toast(res.data.resultDesc)
        }
      })
      this.walletList.forEach((item,kdex)=>{
        item.isCurrent = false
        if(index==kdex){
          item.isCurrent = true
        }
      })
      setStore('walletList', JSON.stringify(this.walletList));
    }
  }
}
</script>

<style lang="less" scoped>
 .createOrImport{
    background:#F7F8FA;
    padding:15px 10px;
    text-align:center;
    position: fixed;
    bottom: 50px;
    width: 100%;
    box-sizing: border-box;
    z-index:9;
    .btn{
      width:155px;
      height:46px;
      border: 1px solid #8997B3;
      border-radius: 4px;
      text-align:center;
      line-height:46px;
      font-size:16px;
      color:#8997B3;
      box-sizing: border-box;
      display:inline-block;
      vertical-align: middle;
      &:first-child{
        margin-right:10px;
      }
      &.active{
        border:none;
        background:#3C3BEE;
        color:#fff;
      }
    }
  }
.walletList{
  height:calc(100vh - 120px);
  background: #F7F8FA;
  .walletItemUl{
    height:calc(100vh - 200px);
    overflow-y: scroll;
    padding:10px;
    background:#F7F8FA;
  }
  .walletItem{
    width: 355px;
    height: 70px;
    padding:12px 10px;
    box-sizing: border-box;
    background: #FFFFFF;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08);
    border-radius: 6px;
    position: relative;
    margin-bottom:10px;
    .walletName{
      font-size:14px;
      color:#000000;
      line-height:20px;
      padding-bottom:8px;
    }
    .walletAddress{
      font-size:12px;
      color:#8997B3;
      line-height:17px;
    }
    .radioico{
      position:absolute;
      right:14px;
      top:50%;
      width:22px;
      height:22px;
      margin-top:-11px;
      background:url(../../assets/radioIco.png) no-repeat center;
      background-size: 100% 100%;
    }
    &.active{
      .radioico{
        background:url(../../assets/radioSelIco.png) no-repeat center;
        background-size: 100% 100%;
      }
    }
  }
}
.title_bg {
  height: 236px;
  background: url(../../assets/bg2.png) no-repeat;
  background-size: 100% 100%;
  
  .assetsDtal {
    padding-top: 33px;
    p {
      text-align: center;
    }
    p:nth-child(1) {
      font-size: 28px;
      font-weight: 500;
      color: #ffffff;
    }
    p:nth-child(2) {
      font-size: 14px;
      font-weight: 500;
      color: #cad5de;
    }
  }
  .wallet_btn {
    display: flex;
    padding: 0 20px;
    justify-content: space-between;
    margin-top: 45px;
    .btn {
      width: 48%;
      height: 36px;
      background: #ffffff;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 500;
      color: #4f5f7f;
      text-align: center;
      line-height: 36px;
    }
  }
}
.wallet_scoll {
  height: calc(100vh - 236px);
  overflow: scroll;
  padding: 0 10px;
  padding-top: 14px;
  .wallet_energy {
    display: flex;
    justify-content: space-between;
    .energy_lt {
      width: 45%;
      .dv1 {
        font-size: 12px;
        font-weight: 400;
        color: #000000;
        margin-bottom: 5px;
font-family: PingFangSC-Regular, PingFang SC;
      }
      .dv2 {
        height: 6px;
        background: #e7ebf1;
        border-radius: 2px;
        margin-bottom: 5px;
        p {
          height: 6px;
          background: linear-gradient(270deg, #afafff 0%, #6362f1 100%);
          border-radius: 2px;
        }
      }
      .dv3 {
        font-size: 12px;
        font-weight: 400;
        color: #8997b3;
        span {
          font-size: 14px;
          font-weight: 600;
          color: #000000;
        }
      }
    }
  }
  .currency__list {
    margin-top: 15px;
    padding-bottom: 65px;
    .item {
      margin-bottom: 10px;
      padding: 13px 10px 10px;
      background: #ffffff;
      box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08);
      border-radius: 6px;
      border: 1px solid #e7ebf1;
      .item_top {
        display: flex;
        img {
          width: 40px;
          height: 40px;
          margin-right: 9px;
        }
        .item_assets {
          flex: 1;
          p {
            display: flex;
            justify-content: space-between;
            &:nth-child(2) {
              margin-top: 2px;
            }
            
            span {
              &:nth-child(1) {
                font-size: 12px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #000000;
              }
              &:nth-child(2) {
                font-size: 12px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #8997b3;
              }
            }
            &:first-child{
              span{font-weight:600;}
            }
          }
        }
      }
      .item_btn {
        display: flex;
        justify-content: space-between;
        .currency_btn {
          width: 45%;
          height: 26px;
          line-height: 26px;
          background: #f4f6fa;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 400;
          color: #4f5f7f;
          text-align: center;
          margin-top: 13px;
        }
      }
    }
  }
}
.tabbar_img {
  text-align: center;
  img {
    width: 20px;
  }
}
.tabbar_zise {
  margin-top: 3px;
}
.van-tabbar{
  box-shadow: 0px -2px 7px 0px rgba(5, 6, 51, 0.05);
}
</style>
