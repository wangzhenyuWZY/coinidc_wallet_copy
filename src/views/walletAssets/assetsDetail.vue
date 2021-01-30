<template>
    <div class="assetsContainer">
        <div class="coinHead">
            <img :src="coinDetail.icon">
            <h2>{{coinDetail.coinCode}}</h2>
            <p>{{coinDetail.coinName}}</p>
        </div>
        <h2 class="assetstitle">{{$t('mall128')}}</h2>
        <div class="coinDetail">
            <div class="detailItem">
                <span class="fl">{{$t('mall129')}}</span>
                <div class="fr">
                    <a class="tag-read" @click="copyBack" :data-clipboard-text="coinDetail.home">{{coinDetail.home}}</a>
                </div>
            </div>
            <div class="detailItem">
                <span class="fl">{{$t('mall130')}}</span>
                <div class="fr">
                    <a class="tag-read" v-show="coinDetail.whitePaper" @click="copyBack" :data-clipboard-text="coinDetail.whitePaper">{{coinDetail.coinCode}} White Paper</a>
                </div>
            </div>
            <div class="detailItem">
                <span class="fl">{{$t('mall131')}}</span>
                <div class="fr">
                    <span>{{coinDetail.totalSupply}}</span>
                </div>
            </div>
            <div class="detailItem">
                <span class="fl">{{$t('mall132')}}</span>
                <div class="fr">
                    <span>{{coinDetail.circulatingSupply}}</span>
                </div>
            </div>
            <div class="detailItem">
                <span class="fl">{{$t('mall133')}}</span>
                <div class="fr">
                    <span>{{coinDetail.holders}}</span>
                </div>
            </div>
            <div class="detailItem">
                <span class="fl">{{$t('mall134')}}</span>
                <div class="fr">
                    <a class="tag-read" v-show="coinDetail.safetyReport" @click="copyBack" :data-clipboard-text="coinDetail.safetyReport">{{coinDetail.coinCode}} Report</a>
                </div>
            </div>
            <div class="detailItem">
                <span class="fl">{{$t('mall135')}}</span>
                <div class="fr">
                    <a class="tag-read" v-show="coinDetail.twitter" @click="copyBack" :data-clipboard-text="coinDetail.twitter"><img src="../../assets/tuite.png"></a>
                    <a class="tag-read" v-show="coinDetail.facebook" @click="copyBack" :data-clipboard-text="coinDetail.facebook"><img src="../../assets/facebook.png"></a>
                    <a class="tag-read" v-show="coinDetail.github" @click="copyBack" :data-clipboard-text="coinDetail.github"><img src="../../assets/github.png"></a>
                    <a class="tag-read" v-show="coinDetail.telegram" @click="copyBack" :data-clipboard-text="coinDetail.telegram"><img src="../../assets/telegram.png"></a>
                </div>
            </div>
        </div>
        <h2 class="assetstitle">{{$t('mall136')}}</h2>
        <div class="coinDetail">
            <p class="coinInfo">{{coinDetail.profile}}</p>
        </div>
    </div>
</template>
<script>
import Clipboard from 'clipboard'; 
import { Toast } from 'vant';
import {getCoinInfo} from '@/api/user'
import { getStore} from "@/config/utils";
export default {
  data() {
    return {
      coinDetail:{}
    }
  },
  created(){
    let that = this  
    let coin = JSON.parse(getStore('coin'))  
    getCoinInfo({coinCode:coin.coinCode}).then(res=>{
        if(res.data.resultCode==999999){
            that.coinDetail = res.data.resultData
        }
    })
  },
  methods: {
    copyBack(){
      var clipboard = new Clipboard('.tag-read')  
          clipboard.on('success', e => {  
            Toast(this.$t('mall127'));
          clipboard.destroy()  
        })  
        clipboard.on('error', e => {   
          // 释放内存  
          clipboard.destroy()  
        })
    }
  }
}
</script>
<style lang='less' scoped>
.assetsContainer{
    position: absolute;
    top:0;
    right:0;
    bottom:0;
    left:0;
    background:#F7F8FA;
    .coinHead{
        padding:24px 20px;
        overflow: hidden;
        img{
            width:60px;
            height:60px;
            float:left;
            margin-right:15px;
        }
        h2{
            font-size:16px;
            color:#000000;
            line-height:22px;
            font-weight: 600;
            padding-bottom:10px;
            padding-top:6px;
        }
        p{
            font-size:12px;
            color:#8997B3;
            line-height:17px;
        }
    }
    .assetstitle{
        font-size:14px;
        color:#8997B3;
        line-height:20px;
        padding:0 10px 12px;
    }
    .coinDetail{
        background:#fff;
        padding:16px 10px;
        margin-bottom:20px;
        .coinInfo{
            font-size:14px;
            color:#4F4F4F;
            line-height:23px;
            text-indent: 15px;
        }
        .detailItem{
            overflow: hidden;
            padding-bottom:12px;
            .fl{
                float:left;
                font-size:14px;
                color:#8997B3;
                line-height:20px;
            }
            .fr{
                float:right;
                a{
                    font-size:14px;
                    color:#1C63FF;
                    line-height:20px;
                    text-align:right;
                    img{
                        width:20px;
                        height: 20px;
                        margin-left:10px;
                    }
                }
                span{
                    font-size:14px;
                    color:#000000;
                    line-height:20px;
                    text-align:right;
                }
            }
        }
    }
}
</style>