<template>
  <div class="container">
    <div class="title_bg">
      <Title :title="$t('mall3')" hide></Title>
      <div class="title">{{$t('mall31')}}</div>
      <div class="qrcode">
        <div class="padds">
          <vue-qr :correctLevel="3" :autoColor="false" :text="address" :size="121" :margin="0" :logoMargin="3"></vue-qr>
        </div>
      </div>
      <div class="ids m_top20">{{walletName}}</div>
      <div class="ids2">{{address}}</div>
      <div class="btns">
        <van-button class="globel_button tag-read" type="info" @click="copyAddress" :data-clipboard-text="address">{{$t('mall32')}}</van-button>
      </div>
    </div>

  </div>
</template>

<script>
const TronWeb = require('tronweb');
import Clipboard from 'clipboard'; 
import { getStore, objIsNull } from "@/config/utils";
import Title from '@/components/Title'
import VueQr from 'vue-qr'
import { Toast } from 'vant';
export default {
  data() {
    return {
      active: 0,
      navIndex: 1,
      codeUrl: 'www.baidu.com',
      walletName:'',
      address:''
    }
  },
  components: {
    Title,
    VueQr
  },
  created(){
    this.address = getStore('trxAddress')
    // if(window.tronWeb){
    //   this.address = window.tronWeb.defaultAddress.base58

    // }else{
    //   this.createTronWeb()
    // }
    
    let namePsd = getStore('namepsd')
    namePsd = JSON.parse(namePsd)
    this.walletName = namePsd.walletName
  },
  methods: {
    onChange(index) {
      this.active = index
      console.log(index)
    },
    nav(index) {
      this.navIndex = index
    },
    createTronWeb(){
      let that = this
      let walletItem = getStore("walletItem");
      let privateKey = ''
      if (!objIsNull(walletItem)) {
        walletItem = JSON.parse(walletItem)
        privateKey = walletItem.wallet.privateKey
      }
      const fullNode = 'https://api.trongrid.io';
      const solidityNode = 'https://api.trongrid.io';
      const eventServer = 'https://api.trongrid.io';
      window.tronWeb = new TronWeb(fullNode,solidityNode,eventServer,privateKey)
      this.address = window.tronWeb.defaultAddress.base58
      if(window.tronWeb){
        window.tronWeb.setAddress(window.tronWeb.defaultAddress.base58) 
      }
    },
    copyAddress(){
      var clipboard = new Clipboard('.tag-read')  
          clipboard.on('success', e => {  
            Toast(this.$t('mall33'));
          // 释放内存  
          clipboard.destroy()  
        })  
        clipboard.on('error', e => {  
          // 不支持复制  
          console.log('该浏览器不支持自动复制')  
          // 释放内存  
          clipboard.destroy()  
        })
    }
  }
}
</script>

<style lang="less" scoped>
.btns {
  padding: 0 15px;
  margin-top: 30px;
  padding-bottom: 40px;
  .sive_qrcode {
    height: 50px;
    border-radius: 4px;
    border: 1px solid #8997b3;
    font-size: 16px;
    font-weight: 500;
    color: #8997b3;
    text-align: center;
    line-height: 50px;
  }
}

.title_bg {
  height: 100vh;
  background: url(../../assets/bg2.png) no-repeat;
  background-size: 100% 220px;
  position: relative;
  .title {
    font-size: 20px;
    font-weight: 600;
    color: #ffffff;
    text-align: center;
    margin-top: 38px;
  }
  .qrcode {
    text-align: center;
    margin-top: 30px;
    .padds {
      display: inline-block;

      box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08);
      border-radius: 12px;
      padding: 10px;
      margin: 0 auto;
      background: #fff;
    }
  }
  .ids {
    font-size: 16px;
    font-weight: 600;
    color: #000000;
    text-align: center;
  }
  .ids2 {
    font-size: 14px;
    font-weight: 400;
    color: #8997b3;
    margin-top: 8px;
    text-align: center;
  }
}
</style>
