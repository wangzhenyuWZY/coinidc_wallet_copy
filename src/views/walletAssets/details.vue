<template>
  <div class="container">
    <div class="title_bg">
      <!-- <Title :title="coin.coinCode" hide></Title> -->
      <div class="assetsDtal">
        <p><img :src="coin.icon" alt=""></p>
        <p>{{coin.balance}} {{coin.coinCode}}</p>
        <router-link class="toDetail" to="/walletAssets/assetsDetail">简介</router-link>
      </div>
    </div>
    <div class="detals_nav">
      <div :class="navIndex=='all'?'nav_item':''" @click="nav('all')">{{$t('mall18')}}</div>
      <div :class="navIndex==1?'nav_item':''" @click="nav(1)">{{$t('mall2')}}</div>
      <div :class="navIndex==2?'nav_item':''" @click="nav(2)">{{$t('mall3')}}</div>
    </div>
    <div class="wallet_scoll">
      <!-- <div class="currency__list">
        <div class="item" v-for="(item,index) in transactionList" :key="index">
          <div class="item_lt">
            <p>{{item.txHash}}</p>
            <p>{{item.timeStart}}</p>
          </div>
          <div class="item_lt item_rg">
            {{item.amount}}
          </div>
        </div>
      </div> -->
      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="$t('mall63')"
        @load="getTransation"
          class="currency__list"
      >
        <van-cell v-for="(item,index) in transactionList" :key="index" class="item" @click="toTransDetail(item)">
            <div class="item_lt">
              <p>{{item.txHashxing}}</p>
              <p>{{item.timeStart}}</p>
            </div>
            <div class="item_lt item_rg" :class="item.type==2 || item.type==4?'green':'red'">
              {{item.type==2 || item.type==4?'+':'-'}}{{item.amount}}
            </div>
        </van-cell>
      </van-list>
    </div>
    <van-tabbar v-model="active" active-color="#4F5F7F" @change="onChange">
      <van-tabbar-item @click="withdraw">
        <!-- <template #icon="props"> -->
        <router-link class="tabbar_ls tabbar_ls1" tag="div" :to="{path:'/walletAssets/transfer',query: { coin: coin.coinCode}}">
          <template>
            <span class="tabbar_img">
              <img width="18px" src="../../assets/assets.png" />
            </span>
          </template>
          <span class="tabbar_zise">{{$t('mall2')}}</span>
        </router-link>

      </van-tabbar-item>
      <van-tabbar-item @click="chongbi">
        <router-link class="tabbar_ls" tag="div" to="/walletAssets/collection">
          <template>
            <span class="tabbar_img">
              <img src="../../assets/asstes1.svg" />
            </span>
          </template>
          <span class="tabbar_zise">{{$t('mall3')}}</span>
        </router-link>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import {queryTransaction} from '@/api/user'
import Title from '@/components/Title'
import { List } from 'vant'
import { getStore} from "@/config/utils";
export default {
  data() {
    return {
      active: 0,
      navIndex: 'all',
      coin:JSON.parse(getStore('coin')),
      transactionList:[],
      pageNum:1,
      show:false,
      loading:false,
      finished:false
    }
  },
  components: {
    Title
  },
  created(){
    this.getTransation()
  },
  methods: {
    getTransation(){
      let that = this
      that.show = true
      that.loading = true
      let params = {
        pageNum:this.pageNum,
        coinCode:this.coin.coinCode,
        type:this.navIndex
      }
      queryTransaction(params).then(res=>{
        that.loading = false
        if(res.data.resultCode==999999){
          res.data.resultData.forEach((item,index)=>{
            item.txHashxing = that.plusXing(item.txHash,5,5)
            that.transactionList.push(item)
          })
        }
        if(that.pageNum<res.data.pages){
          that.pageNum++
        }else{
          that.finished = true;
        }
      })
    },
    plusXing (str,frontLen,endLen) { 
      var len = str.length-frontLen-endLen;
      var xing = '';
      for (var i=0;i<len;i++) {
        xing ='*******';
      }
      return str.substring(0,frontLen)+xing+str.substring(str.length-endLen);
    },
    onChange(index) {
      this.active = index
      console.log(index)
    },
    nav(index) {
      this.pageNum = 1
      this.navIndex = index
      this.transactionList = []
      this.getTransation()
    },
    withdraw(){
      this.$router.push({
                  path: "/walletAssets/transfer",
                  query: {
                      coin:this.coin.coinCode
                  }
              });
    },
    chongbi(){
      this.$router.push({
                  path: "/walletAssets/collection"
              });
    },
    toTransDetail(item){
      this.$router.push({
                  path: "/walletAssets/transferDetail",
                  query: {
                      transdetail:item
                  }
              });
    }
  }
}
</script>

<style lang="less" scoped>
.title_bg {
  height: 110px;
  background: linear-gradient(90deg, #394CCC 0%, #2538B4 100%);
  .assetsDtal {
    padding-top: 42px;
    .toDetail{
      float:right;
      width: 60px;
      height: 28px;
      border-radius: 14px;
      border: 1px solid rgba(255, 255, 255, 0.23);
      text-align:center;
      line-height:28px;
      font-size:12px;
      color:#fff;
      margin-right:20px;
    }
    p {
      text-align: center;
      display: inline-block;
      vertical-align: middle;
    }
    p:nth-child(1) {
      img {
        width: 26px;
        height:26px;
      }
      padding-left:20px;
      padding-right:12px;
    }
    p:nth-child(2) {
      font-size: 22px;
      font-weight: 500;
      color: #ffffff;
    }
  }
}
.detals_nav {
  padding: 20px 10px;
  display: flex;
  justify-content: space-around;
  div {
    height: 26px;
    background: #f4f6fa;
    border-radius: 13px;
    line-height: 26px;
    font-size: 14px;
    font-weight: 400;
    color: #aeb8c2;
    text-align: center;
    padding: 0 36px;
    &.nav_item {
      color: #ffffff;
      background: #394CCC;
    }
  }
}
.wallet_scoll {
  height: 400px;
  overflow: scroll;
  padding: 0 10px;
  padding-top: 14px;
  .currency__list {
    height:100%;
    .item {
      display: flex;
      justify-content: space-between;
      background: #ffffff;
      box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08);
      border-radius: 6px;
      padding: 18px 10px;
      margin-bottom: 10px;
      .item_lt {
        float:left;
        width:60%;
        p {
          color: #000000;
          font-size: 12px;
          font-weight: 500;
          line-height: 16px;
          padding-bottom: 1px;
        }
        p:nth-child(2) {
          color: #8997b3;
        }
      }
      .item_rg {
        font-size: 14px;
        font-weight: 600;
        float: right;
        width: 40%;
        text-align: right;
        &.red {
          color: #ff545d;
        }
        &.green {
          color: #00ab72;
        }
      }
    }
  }
}
.tabbar_ls {
  display: flex;
  align-items: center;
}
.tabbar_ls1::before {
  position: absolute;
  content: '';
  right: 0;
  top: 18px;
  height: 13px;
  border-right: 1px solid #cad5de;
  border-style: dotted;
}
.tabbar_img {
  text-align: center;
  display: inline-block;
  margin-right: 10px;
}
.tabbar_zise {
  display: inline-block;
}
.van-tabbar-item {
  position: relative;
}
.van-cell{
  display: flex;
  justify-content: space-between;
  background: #ffffff;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08);
  border-radius: 6px;
  padding: 18px 10px;
  margin-bottom: 10px;
  .item_lt {
    p {
      color: #000000;
      font-size: 12px;
      font-weight: 500;
    }
    p:nth-child(2) {
      color: #8997b3;
    }
  }
  .item_rg {
    font-size: 14px;
    font-weight: 600;
    &.red {
      color: #ff545d;
    }
    &.green {
      color: #00ab72;
    }
  }
}
</style>
