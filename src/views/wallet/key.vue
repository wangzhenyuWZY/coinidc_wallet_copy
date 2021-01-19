<template>
  <van-popup :value="show" :style="{ width: '94.67%' ,borderRadius: '6px'}">
    <div class="popup_model">
      <div class="popup_title">
        <span class="title_lt"></span>
        <span class="title_center">{{$t('mall38')}}</span>
        <span class="title_rg" @click="close"> <img src="../../assets/colse.svg" alt=""> </span>
      </div>
      <div class="popup_size m_top20">{{$t('mall55')}}</div>
      <div class="popup_key">
        <div style="overflow: hidden;text-overflow: ellipsis;">{{privateKey}}</div>
        <div class="cp tag-read" :data-clipboard-text="privateKey" @click="copyAddress"><img src="../../assets/icon_cp.svg" alt=""></div>
      </div>
      <div class="qrcode">
        <vue-qr :correctLevel="3" :autoColor="false" :text="privateKey" :size="121" :margin="0" :logoMargin="3"></vue-qr>
      </div>
      <div class="popup_buttons">
        <div @click="close">{{$t('mall56')}}</div>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { getStore, objIsNull } from "@/config/utils";
import VueQr from 'vue-qr'
import Clipboard from 'clipboard'; 
import { Toast } from 'vant';
export default {
  props: ['show'],
  components: {
    VueQr
  },
  data() {
    return {
      title: '创建钱包',
      privateKey:'11'
    }
  },
  methods: {
    close() {
      this.$emit('close')
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
  },
  created(){
    let walletItem = getStore("walletItem");
    debugger
    if (!objIsNull(walletItem)) {
      walletItem = JSON.parse(walletItem)
      this.privateKey = walletItem.wallet.privateKey
    }
  }
}
</script>

<style lang="less" scoped>
.popup_model {
  padding: 20px;
  .popup_title {
    display: flex;
    justify-content: space-between;
    justify-items: center;
    font-size: 16px;
    font-weight: 500;
    color: #000000;
  }
  .popup_size {
    font-size: 12px;
    color: #000000;
  }
  .popup_key {
    display: flex;
    background: #ebeff2;
    border-radius: 6px;
    padding: 8px 10px;
    font-size: 12px;
    font-weight: 400;
    color: #8997b3;
    margin-top: 8px;
    .cp {
      margin-left: 8px;
    }
  }
  .qrcode {
    text-align: center;
    padding: 30px 0;
  }
  .popup_buttons {
    display: flex;
    justify-content: space-between;
    > div {
      width: 98%;
      height: 50px;
      border-radius: 4px;
      line-height: 50px;
      font-size: 16px;
      font-weight: 500;
      text-align: center;
      &:nth-child(1) {
        border: 1px solid #8997b3;
        color: #8997b3;
      }
      &:nth-child(2) {
        background: #3c3bee;
        color: #fff;
      }
    }
  }
}
</style>
