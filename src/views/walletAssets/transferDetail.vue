<template>
    <div class="assetsContainer">
        <div class="coinHead">
            <img src="../../assets/sucIco.png">
            <h2 :class="transDetail.type==2 || transDetail.type==4?'green':'red'">{{transDetail.type==2 || transDetail.type==4?'+':'-'}}{{transDetail.amount}}</h2>
            <p>{{transDetail.timeStart}}</p>
        </div>
        <h2 class="assetstitle">基本信息</h2>
        <div class="coinDetail">
            <div class="detailItem">
                <span class="fl">转出地址</span>
                <div class="fr">
                    <span>{{transDetail.fromAddress}}</span>
                </div>
            </div>
            <div class="detailItem">
                <span class="fl">接受账户</span>
                <div class="fr">
                    <span>{{transDetail.toAddress}}</span>
                </div>
            </div>
            <div class="detailItem">
                <span class="fl">交易Hash</span>
                <div class="fr">
                    <span>{{transDetail.txHash}}</span>
                </div>
            </div>
            <div class="detailItem">
                <span class="fl">区块高度</span>
                <div class="fr">
                    <span>{{transDetail.blockIndex}}</span>
                </div>
            </div>
            <div class="detailItem">
                <span class="fl">矿工费</span>
                <div class="fr">
                    <span>0</span>
                </div>
            </div>
            <div class="detailItem">
                <span class="fl">详细数据</span>
                <div class="fr tag-read" @click="copyBack" :data-clipboard-text="href+transDetail.txHash">
                    <span>TRONSCAN<img class="back" src="../../assets/backIco.png"></span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Clipboard from 'clipboard'; 
import { Toast } from 'vant';
export default {
  data() {
    return {
      transDetail:this.$route.query.transdetail,
      href:'https://tronscan.io/#/transaction/'
    }
  },
  created(){
  },
  methods: {
    copyBack(){
      var clipboard = new Clipboard('.tag-read')  
          clipboard.on('success', e => {  
            Toast('复制成功，请使用浏览器打开');
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
        padding:47px 0px 54px;
        overflow: hidden;
        text-align:center;
        img{
            width:60px;
            height:60px;
        }
        h2{
            font-size:23px;
            color:#00AB72;
            line-height:32px;
            font-weight: 600;
            padding-bottom:7px;
            padding-top:10px;
            &.red{
                color: #ff545d;
            }
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
                width:60%;
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
                    word-break: break-word;
                    float: right;
                    .back{
                        width:22px;
                        height:22px;
                        vertical-align: middle;
                    }
                }
            }
        }
    }
}
</style>