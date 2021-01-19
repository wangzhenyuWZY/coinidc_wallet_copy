<!-- home -->
<template>
  <div class="container">
    <h2 class="title">{{$t('mall99')}}</h2>
    <van-cell-group>
      <van-cell :title="$t('mall72')" :value="namePsd.walletName" is-link arrow-direction @click="namepop=true" />
    </van-cell-group>
    <van-cell-group class="group">
      <van-cell :title="$t('mall39')" value="" is-link arrow-direction @click="showMemo(1)" />
      <van-cell :title="$t('mall38')" value="" is-link arrow-direction @click="showMemo(2)"/>
    </van-cell-group>
    <van-cell-group class="mycode">
      <van-cell :title="$t('mall47')" :value="inviteCode"/>
    </van-cell-group>
    <button class="outbtn" @click="confirmout">{{$t('mall100')}}</button>
    <van-tabbar v-model="activeNav" active-color="#6362F1">
      <van-tabbar-item @click="toWallet">
        <!-- <template #icon="props"> -->
        <template>
          <div class="tabbar_img">
            <img :src="activeNav == 0?require('../../assets/zican.svg'):require('../../assets/assetsh.png')" />
          </div>
        </template>
        <div class="tabbar_zise">{{$t('mall8')}}</div>
      </van-tabbar-item>
      <van-tabbar-item  @click="toMall">
        <template>
          <div class="tabbar_img">
            <img :src="activeNav == 1?require('../../assets/liulanqs.png'):require('../../assets/liulanq.svg')" />
          </div>
        </template>
        <div class="tabbar_zise">{{$t('mall9')}}</div>
      </van-tabbar-item>
      <van-tabbar-item>
        <template>
          <div class="tabbar_img">
            <img :src="activeNav == 2?require('../../assets/meIcoActive.png'):require('../../assets/meIco.png')" />
          </div>
        </template>
        <div class="tabbar_zise">{{$t('mall99')}}</div>
      </van-tabbar-item>
    </van-tabbar>


    <alert2 :show='psdpop' :label="$t('mall22')" @close="psdpop = false;password=''" @closeback="psdpop = false;password=''">
      <div class="mall2">
        <div class="ditals_bg">
          <div class="dital2" style="padding-top:26px;border-radius:0;box-shadow:none;">
            <div class="willt_pwd">{{$t('mall23')}}</div>
            <div class="inputs"><input type="password" v-model="password" :placeholder="$t('mall24')"></div>
          </div>
        </div>
        <van-button class="btns btnst" type="info" @click="confirmShow">{{$t('mall20')}}</van-button>
      </div>
    </alert2>
    <alert2 :show='namepop' :label="$t('mall101')" @close="namepop = false;password=''" @closeback="namepop = false;password=''">
      <div class="mall2">
        <div class="ditals_bg">
          <div class="dital2" style="padding-top:26px;border-radius:0;box-shadow:none;">
            <div class="willt_pwd">{{$t('mall72')}}</div>
            <div class="inputs"><input v-model="username" :placeholder="$t('mall102')"></div>
          </div>
        </div>
        <van-button class="btns btnst" type="info" @click="updatename">{{$t('mall20')}}</van-button>
      </div>
    </alert2>
    <modelKey :show="show" @close="show=false" />
  </div>
</template>
<script>
import alert2 from '../mall/globelModel2'
import {Cell,CellGroup,Dialog} from 'vant'
import { Toast } from 'vant';
import { getStore, objIsNull,setStore } from "@/config/utils";
import modelKey from '../wallet/key'
import {updateName} from '@/api/user'
export default {
  data() {
    return {
      show:false,
      psdpop:false,
      password:'',
      active:0,
      activeNav:2,
      username:'',
      namepop:false,
      namePsd:{},
      inviteCode:getStore('myInviteCode'),
      hasUserid:false
    }
  },
  components: {
    alert2,
    modelKey,
    [Dialog.Component.name]: Dialog.Component
  },
  computed: {},
  created(){
    let namePsd = getStore('namepsd')
    this.namePsd = JSON.parse(namePsd)
    
  },
  mounted() { 
     
  },
  methods: {
    toMall(){
      this.$router.push({
                  path: "/mall"
              });
    },
    toWallet(){
      this.$router.push({
                  path: "/walletAssets/wallet"
              });
    },
    showMemo(type){
      this.active = type
      this.psdpop = true
    },
    confirmout(){
      let that = this
      Dialog.confirm({
        title: that.$t('mall103'),
        message: that.$t('mall104')
      }).then(() => {
        localStorage.clear()
        window.tronWeb = null
        that.$router.push('/walletAssets/index')
      }).catch(() => {
        // on cancel
      });
    },
    confirmShow(){
      let namePsd = getStore('namepsd')
      namePsd = JSON.parse(namePsd)
      let passwordTrue = namePsd.walletPassword
      if(this.password!==passwordTrue){
        Toast(this.$t('mall28'))
        return
      }
      if(this.active==1){
        this.$router.push('/validation/beifen')
      }else if(this.active==2){
        this.show = true
      }
    },
    updatename(){
      let that = this
      updateName({name:this.username}).then(res=>{
        if(res.data.resultCode=='999999'){
          that.namePsd.walletName = this.username
          setStore('namepsd',that.namePsd)
          Toast(that.$t('mall105'))
          this.username = ''
          that.namepop = false
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.container{
  position: absolute;
  top:0;
  right:0;
  bottom:0;
  left:0;
  background:#F4F6FA;
  padding-bottom:0;
  .title{
    text-align:center;
    line-height:40px;
    color:#131F30;
    font-size:17px;
    padding-bottom:22px;
    padding-top:10px;
  }
  .outbtn{
    width:90%;
    height:50px;
    text-align:center;
    margin:66px 5%;
    line-height:50px;
    border-radius:5px;
    font-size:16px;
    background: #3C3BEE;
    color:#fff;
  }
}
.mall2 {
  background: #dadeec;
  box-shadow: 2px 2px 1px 0px rgba(38, 47, 131, 0.61);
  border-radius: 5px;
  padding: 25px 10px 10px;
  .ditals_bg {
  }
  .dital2 {
    background: #f9fbff;
    box-shadow: 2px 2px 2px 0px #bfc2d8;
    border-radius: 5px;
    padding: 38px 12px 33px 10px;
    
    
    .imgs {
      text-align: center;
      img {
        width: 100px;
        height: 100px;
      }
    }
    .weib {
      font-size: 16px;
      font-weight: 600;
      color: #303030;
      text-align: center;
      margin-top: 12px;
      margin-bottom: 5px;
    }
    .linwe {
      font-size: 12px;
      font-weight: 400;
      color: #4f5f7f;
      text-indent: 30px;
    }
  }
  .btn_slet {
    display: flex;
    align-items: center;
    margin: 12px 0;
    img {
      width: 14px;
      height: 14px;
    }
    .seta {
      font-size: 14px;
      font-weight: 600;
      color: #303030;
      margin: 0 10px;
    }
    .seta1 {
      font-size: 12px;
      font-weight: 400;
      color: #8997b3;
    }
  }
  .btns {
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: linear-gradient(360deg, #545fa8 0%, #8894e4 100%);
    box-shadow: 2px 2px 0px 0px rgba(224, 225, 255, 0.5);
    border-radius: 6px;
    color: #ffffff;
    border: 1px solid #4b56a0;
    font-size: 16px;
    font-weight: 500;
    display:block;
    width:100%;
    &.btnst {
      margin-top: 10px;
    }
  }
}
.willt_pwd {
      font-size: 16px;
      font-weight: 400;
      color: #000000;
    }
.inputs {
      display: flex;
      margin-top: 10px;
      input {
        flex: 1;
        height: 50px;
        background: #ffffff;
        box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08);
        border-radius: 6px;
        border: 1px solid #cad5de;
        font-size: 14px;
        font-weight: 400;
        color: #000;
        padding-left: 10px;
        width: auto;
        &::placeholder {
          color: #b6c6d3;
        }
      }
    }    
.van-cell__title{
  color:#000000;
}
.van-cell__value{
  color:#8997B3;
}
.group{
  position:relative;
  top:22px;
}
.mycode{
  position:relative;
  top:44px;
}
.tabbar_img {
  text-align: center;
  img {
    width: 20px;
  }
}
</style>
