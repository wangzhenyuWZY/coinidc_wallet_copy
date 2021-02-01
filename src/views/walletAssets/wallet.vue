<template>
  <div class="container">
    <div class="title_bg">
      <!-- <Title :title="$t('mall1')" :isback="false" hide></Title> -->
      <div class="assetsDtal">
        <p>{{totalBalance}} IDCT</p>
        <!-- <p>≈{{convertedBalance}}</p> -->
      </div>
      <div class="wallet_btn">
        <router-link tag="div" to="/walletAssets/transfer" class="btn"><i class="zzico"></i>{{$t('mall2')}}</router-link>
        <router-link tag="div" to="/walletAssets/collection" class="btn"><i class="skico"></i>{{$t('mall3')}}</router-link>
      </div>
    </div>
    <div class="wallet_scoll">
      <div class="wallet_energy">
        <div class="energy_lt">
          <div class="dv1">{{$t('mall4')}}</div>
          <div class="dv2">
            <p :style="'width:'+energyBi+'%'"></p>
          </div>
          <div class="dv3"><span>{{walletInfo.energy || 0}}</span>/{{walletInfo.energyLimit || 0}}</div>
        </div>
        <div class="energy_lt">
          <div class="dv1">{{$t('mall5')}}</div>
          <div class="dv2">
            <p  :style="'width:'+freeNetBi+'%'"></p>
          </div>
          <div class="dv3"><span>{{walletInfo.freeNet || 0}}</span>/{{walletInfo.freeNetLimit || 0}}</div>
        </div>
      </div>
      <div class="currency__list">
        <van-pull-refresh v-model="isLoading" @refresh="getMyToken">
          <div class="item" v-for="(item,index) in coinList" :key="index" @click="toDetail(item)">
            <div class="item_top">
              <img :src="item.img" alt="">
              <div class="item_assets">
                <p>
                  <span>{{item.coinCode}}</span>
                  <span>{{item.balance}}</span>
                </p>
                <p>
                  <span>{{item.coinName}}</span>
                  <span>≈{{item.convertedBalance}} IDCT</span>
                </p>
              </div>
            </div>
          </div>
        </van-pull-refresh>
      </div>
    </div>
    <van-tabbar v-model="active" active-color="#6362F1" @change="onChange">
      <van-tabbar-item>
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
      <van-tabbar-item  @click="toWalletList">
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
import axios from 'axios'
import { getStore, setStore, objIsNull } from "@/config/utils";
import Title from '@/components/Title'
import {login,queryWalletList} from '@/api/user'
import contracts from '@/api/contracts'
import { PullRefresh } from 'vant'
export default {
  data() {
    return {
      active: 0,
      tronWeb:null,
      trxBalance:0,
      totalBalance:0,
      convertedBalance:0,
      energyBi:0,
      freeNetBi:0,
      walletInfo:{},
      isLoading:false,
      walletItem:{},
      coinList:[{
        name:'TRX',
        decimals:6,
        balance:0,
        price:0,
        img:require('@/assets/trx.png')
      },{
        name:'IDC',
        decimals:6,
        balance:0,
        price:0,
        img:require('@/assets/idct.png')
      },{
        name:'USDT',
        decimals:6,
        balance:0,
        price:0,
        img:require('@/assets/usdt.png')
      }],
      walletList:[]
    }
  },
  components: {
    Title,
    VanPullRefresh:PullRefresh
  },
  created(){
    let walletList = getStore("walletList");
    if (!objIsNull(walletList)) {
      walletList = JSON.parse(walletList)
      this.walletList = walletList
      let walletItem = walletList.filter(res=>{
        return res.isCurrent == true
      })
      this.walletItem = walletItem[0]
    }
    this.createTronWeb()
    let idctUserId = this.getUrlKey('idctUserId',window.location.href)
    if(idctUserId){
      setStore('idctUserId',idctUserId)
    }
  },
  mounted(){
    window.loadImages = () => this.loadImages()
  },
  methods: {
    loadImages(){
      alert('loadimages的回调')
    },
    toDetail(item){
      setStore('coin',item)
      this.$router.push({
                  path: "/walletAssets/details",
                  query: {
                      coin:item
                  }
              });

    },
    withdraw(item){
      this.$router.push({
                  path: "/walletAssets/transfer",
                  query: {
                      coin:item.coinCode
                  }
              });
    },
    chongbi(){
      this.$router.push({
                  path: "/walletAssets/collection"
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
    toWalletList(){
      this.$router.push({
                  path: "/walletAssets/walletList"
              });
    },
    onChange(index) {
      this.active = index
      console.log(index)
    },
    createTronWeb(){
      let that = this
      let privateKey = this.walletItem.privateKey
      const fullNode = 'https://api.trongrid.io';
      const solidityNode = 'https://api.trongrid.io';
      const eventServer = 'https://api.trongrid.io';
      window.tronWeb = new TronWeb(fullNode,solidityNode,eventServer,privateKey)
      if(window.tronWeb){
        window.tronWeb.setAddress(window.tronWeb.defaultAddress.base58)
        let token = getStore('token')
        if(!token){
          // this.userLogin()
        }else{
          this.getMyToken()
        }
      }
      // this.tronWeb.trx.getBalance(this.tronWeb.defaultAddress.base58).then(res => {
      //   that.coinList[0].balance = that.tronWeb.fromSun(res)
      // })
      // this.getIdcBalance()
      // this.getUsdtBalance()
      // this.getTokenPrice()
    },
    // async getIdcBalance(){
    //   let that = this
    //   let func = 'balanceOf(address)'
    //   let params = [{'type':'address','value':this.tronWeb.defaultAddress.base58}]
    //   this.tronWeb.transactionBuilder.triggerConstantContract(contracts.IDC,func, {},params).then(res=>{
    //     let balance = parseInt(res.constant_result[0],16)
    //     that.coinList[1].balance = balance/Math.pow(10,6)
    //   })
    // },
    // async getUsdtBalance(){
    //   let that = this
    //   let func = 'balanceOf(address)'
    //   let params = [{'type':'address','value':this.tronWeb.defaultAddress.base58}]
    //   this.tronWeb.transactionBuilder.triggerConstantContract(contracts.USDT,func, {},params).then(res=>{
    //     let balance = parseInt(res.constant_result[0],16)
    //     that.coinList[2].balance = balance/Math.pow(10,6)
    //   })
    // },
    getMyToken(){
      let that = this
      queryWalletList().then((res)=>{
        if(res.data.resultCode==999999){
          that.isLoading = false
          that.totalBalance = res.data.resultData.balance
          that.convertedBalance = res.data.resultData.convertedBalance
          that.coinList = res.data.resultData.lstWallet
          setStore('trxAddress',res.data.resultData.address)
          that.coinList.forEach((item,index)=>{
            if(item.coinCode=='TRX'){
              item.img = require('../../assets/trx.png')
            }else if(item.coinCode=='IDCT'){
              item.img = require('../../assets/idct.png')
            }else if(item.coinCode=='USDT'){
              item.img = require('../../assets/usdt.png')
            }
          })
          that.walletInfo = res.data.resultData
          setStore('myInviteCode', res.data.resultData.inviteCode)
          if(res.data.resultData.energyLimit!==0&&res.data.resultData.energy!==0){
            that.energyBi = res.data.resultData.energy/res.data.resultData.energyLimit*100
          }
          if(res.data.resultData.freeNetLimit!==0&&res.data.resultData.freeNet!==0){
            that.freeNetBi = res.data.resultData.freeNet/res.data.resultData.freeNetLimit*100
          }
        }
      })
    },
    getUrlKey(name,url){
      　return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url) || [, ""])[1].replace(/\+/g, '%20')) || null
    },
    userLogin(){
      let that = this
      let walletName = this.walletItem.walletName
        let data = {
          name:walletName,
          idctUserId:this.walletList.length>0?'':(getStore('idctUserId')?getStore('idctUserId'):''),
          inviteCode:this.walletItem.inviteCode,
          trxAddress:window.tronWeb.defaultAddress.base58
        }
        login(data).then((res)=>{
          if(res.data.resultCode==999999){
            setStore('token', res.data.resultData)
            that.getMyToken()
          }
        })
    },
    async sendToken(){
      let that = this
      let func = 'approve(address,uint256)'
      let params = [
        {'type':'address','value':contracts.OWL},
        {'type':'uint256','value':100000000}
      ]
      let transfer = await window.tronWeb.transactionBuilder.triggerSmartContract(contracts.IDC,func, {},params)
      window.tronWeb.trx.sign(transfer.transaction).then(function(signedTransaction) {
          window.tronWeb.trx
            .sendRawTransaction(signedTransaction)
            .then(function(res) {
              debugger
              console.log(res)
            })
        })
    }
  }
}
</script>

<style lang="less" scoped>
.title_bg {
  height: 180px;
  background: linear-gradient(90deg, #394CCC 0%, #2538B4 100%);
  border-radius: 0px 0px 20px 20px;
  .assetsDtal {
    padding-top: 33px;
    padding-left:20px;
    p {
      text-align: left;
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
    padding: 0 20px;
    justify-content: space-between;
    margin-top: 45px;
    overflow:hidden;
    .btn {
      float:left;
      width: 110px;
      height: 32px;
      background: #FFFFFF;
      border-radius: 18px;
      font-size: 11px;
      font-weight: 500;
      color: #121212;
      text-align: center;
      line-height: 32px;
      margin-right:20px;
      i{
        display:inline-block;
        vertical-align: middle;
        width:12px;
        height:12px;
        margin-right:6px;
        margin-top:-2px;
        &.zzico{
          background:url(../../assets/zzico.png) no-repeat center;
          background-size:100% 100%;
        }
        &.skico{
          background:url(../../assets/skico.png) no-repeat center;
          background-size:100% 100%;
        }
      }
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
            font-size: 12px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #8997b3;
            &:first-child{
              font-size:14px;
              color:#000000;
              font-weight:600;
            }
            &:nth-child(2) {
              margin-top: 2px;
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
