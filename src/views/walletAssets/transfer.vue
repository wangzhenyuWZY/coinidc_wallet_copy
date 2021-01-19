<template>
  <div class="container">
    <div class="title_bg">
      <Title :title="$t('mall2')" hide></Title>

      <div class="padding">
        <div class="from_input">
          <div class="account_title">
            <div class="title">{{$t('mall11')}}</div>
            <div class="borders">
              <div class="bordrs_lt">

                <div class="inputs">
                  <input type="text" disabled v-model="myAccount">
                </div>
              </div>
            </div>

          </div>
          <div class="account_title">
            <div class="title">{{$t('mall12')}}</div>
            <div class="borders">
              <div class="bordrs_lt">
                <div class="inputs">
                  <input type="text" :placeholder="$t('mall13')" @input="checkAddress" v-model="toAccount">
                </div>
              </div>
            </div>
          </div>
          <div class="account_title" @click="showPicker = true">
            <div class="title ">{{$t('mall14')}}</div>
            <div class="borders">
              <div class="bordrs_lt">

                <div class="inputs">
                  <div class="input_lt">{{transferCoin.coinCode}}</div>
                  <img src="../../assets/back.svg" alt="">
                </div>
              </div>
            </div>
          </div>
          <div class="account_title">
            <div class="title ">
              <div class="title2"> <span>{{$t('mall15')}}</span><span>{{$t('mall16')}} {{transferCoin.balance}}</span></div>
            </div>
            <div class="borders">
              <div class="bordrs_lt">
                <div class="inputs">
                  <input type="text" :placeholder="$t('mall17')" v-model="transNum">
                  <span class="input_rg" @click="transNum=transferCoin.balance">{{$t('mall18')}}</span>
                </div>
                <div class="poundage">
                  <span>{{$t('mall19')}}</span>
                  <span>0.00</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div class="btns">
        <van-button class="globel_button" :loading="false" :disabled='false' type="info" @click="transfer">{{$t('mall21')}}</van-button>
      </div>
    </div>
    <van-popup v-model="showPicker" round position="bottom">
      <van-picker show-toolbar title="" :columns="columns" @cancel="showPicker = false" item-height="40" @confirm="onConfirm"
                  :confirm-button-text="$t('mall20')" />
    </van-popup>
    <alert2 :show='show56' :label="$t('mall22')" @close="show56 = false" @closeback="show56 = false;">
      <div class="mall2">
        <div class="ditals_bg">
          <div class="dital2">
            <div class="willt_pwd">{{$t('mall23')}}</div>
            <div class="inputs"><input type="password" v-model="password" :placeholder="$t('mall24')"></div>

          </div>
        </div>
        <div class="btns btnst" @click="doTransfer">{{$t('mall20')}}</div>
      </div>
    </alert2>
  </div>
</template>

<script>
const TronWeb = require('tronweb');
import alert2 from '../mall/globelModel2'
import bigNumber from 'bignumber.js'
import Title from '@/components/Title'
import { Notify } from 'vant';
import {queryWalletList} from '@/api/user'
import { getStore, objIsNull } from "@/config/utils";
export default {
  data() {
    return {
      show56:false,
      active: 0,
      navIndex: 1,
      transferCoin: {},
      showPicker: false,
      columns: ['USDT', 'IDCT', 'TRX'],
      myAccount:'',
      toAccount:'',
      coinList:[],
      transNum:0,
      password:''
    }
  },
  components: {
    Title,
    alert2
  },
  created(){
    if(!window.tronWeb){
      this.createTronWeb()
    }else{
      this.myAccount = window.tronWeb.defaultAddress.base58
    }
    this.getMyToken()
  },
  methods: {
    getMyToken(){
      let that = this
      queryWalletList().then((res)=>{
        if(res.data.resultCode==999999){
          that.coinList = res.data.resultData.lstWallet
          this.coinList.forEach((item,index)=>{
            if(this.$route.query.coin){
              if(this.$route.query.coin==item.coinCode){
                this.transferCoin = item
              }
            }else{
              if(item.coinCode=='USDT'){
                this.transferCoin = item
              }
            }
          })
        }
      })
    },
    onChange(index) {
      this.active = index
      console.log(index)
    },
    nav(index) {
      this.navIndex = index
    },
    onConfirm(value) {
      this.showPicker = false
      this.coinList.forEach((item,index)=>{
        if(item.coinCode==value){
          this.transferCoin = item
        }
      })
    },
    transfer(){
      let isAddress = window.tronWeb.isAddress(this.toAccount)
      if(!isAddress){
        Notify({ type: 'warning', message: this.$t('mall25') });
        return
      }
      if(this.transNum==0){
        Notify({ type: 'warning', message: this.$t('mall26') });
        return
      }
      if(this.transNum>this.transferCoin.balance){
        Notify({ type: 'warning', message: this.$t('mall27')  });
        return
      }
      this.show56 = true
    },
    async doTransfer(){
      let that = this
      this.show56 = false
      let namePsd = getStore('namepsd')
      namePsd = JSON.parse(namePsd)
      let passwordTrue = namePsd.walletPassword
      if(this.password!==passwordTrue){
        Notify({ type: 'warning', message: this.$t('mall28')  });
        return
      }
      let transNum = new bigNumber(this.transNum)
        transNum = transNum.times(Math.pow(10,6))
      if(this.transferCoin.coinCode=='TRX'){
        let transObj = await window.tronWeb.transactionBuilder.sendTrx(this.toAccount, transNum.toFixed(), window.tronWeb.defaultAddress.base58)
        window.tronWeb.trx.sign(transObj).then(function(signedTransaction) {
            window.tronWeb.trx
              .sendRawTransaction(signedTransaction)
              .then(function(res) {
                that.password = ''
                that.transNum = ''
                that.toAccount = ''
                Notify({ type: 'success', message: that.$t('mall29') });
                that.$router.push('/walletAssets/wallet')
              })
          })

     }else{
        let that = this
        let func = 'transfer(address,uint256)'
        let params = [
          {'type':'address','value':this.toAccount},
          {'type':'uint256','value':transNum.toFixed()}
        ]
        console.log(this.transferCoin.contract,func)
        let transfer = await window.tronWeb.transactionBuilder.triggerSmartContract(this.transferCoin.contract,func, {},params)
        window.tronWeb.trx.sign(transfer.transaction).then(function(signedTransaction) {
            window.tronWeb.trx
              .sendRawTransaction(signedTransaction)
              .then(function(res) {
                Notify({ type: 'success', message: that.$t('mall29') });
                that.$router.push('/walletAssets/wallet')
              })
          })
      }
    },
    checkAddress(){
      let isAddress = window.tronWeb.isAddress(this.toAccount)
      if(!isAddress){
        Notify({ type: 'warning', message: this.$t('mall25') });
      }
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
      this.myAccount = window.tronWeb.defaultAddress.base58
      if(window.tronWeb){
        window.tronWeb.setAddress(window.tronWeb.defaultAddress.base58) 
      }
    }  
  }
}
</script>

<style lang="less" scoped>
.btns {
  padding: 0 15px;
  margin-top: 20px;
  padding-bottom: 40px;
}

.title_bg {
  height: 100vh;
  background: url(../../assets/bg2.png) no-repeat;
  background-size: 100% 220px;
  position: relative;

  .padding {
    padding: 0 15px;
    padding-top: 22px;
  }
  .from_input {
    background: #ffffff;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08);
    border-radius: 12px;
    padding-top: 20px;
    padding-right: 15px;
    padding-left: 11px;
    height: 460px;
    .account_title {
      .title {
        font-size: 16px;
        font-weight: 400;
        color: #000000;
        padding-left: 12px;
        position: relative;
        .title2 {
          color: #000000;
          position: relative;
          overflow: hidden;
          span:nth-child(1) {
            float: left;
          }
          span:nth-child(2) {
            float: right;
            font-size: 12px;
            font-weight: 400;
            color: #8997b3;
            margin-top: 4px;
          }
        }
        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 9px;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          border: 1px solid #aeb8c2;
        }
      }
      .borders {
        padding-left: 2px;
        .bordrs_lt {
          padding-top: 10px;
          padding-bottom: 20px;
          border-left: 1px solid #f4f6fa;
          padding-left: 9px;
        }
        .poundage {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
          padding-bottom: 14px;
          span {
            font-size: 12px;
            font-weight: 400;
          }
          span:nth-child(1) {
            color: #8997b3;
          }
          span:nth-child(2) {
            color: #000;
          }
        }
      }
      .inputs {
        display: flex;
        align-items: center;
        height: 50px;
        background: #ffffff;
        box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08);
        border-radius: 6px;
        padding-left: 11px;
        padding-right: 14px;
        border: 1px solid #cad5de;
        .saoyisao {
          width: 18px;
        }
        .input_lt {
          flex: 1;
          color: #000000;
        }
        input {
          flex: 1;
          font-size: 14px;
          font-weight: 400;
          color: #000000;
          &::placeholder {
            color: #b6c6d3;
          }
        }
        img {
          width: 18px;
        }
        .input_rg {
          font-size: 14px;
          font-weight: 500;
          color: #6362f1;
        }
      }
    }
  }
}
.willt_pwd {
      font-size: 16px;
      font-weight: 400;
      color: #000000;
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
    padding:0;
    &.btnst {
      margin-top: 10px;
    }
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
}

/deep/ .van-picker-column__item--selected {
  background: #f4f6fa;
  height: 60px;
  font-size: 16px;
  font-weight: 600;
  font-size: 16px;
}
/deep/ .van-picker-column__item{width:100%;}
</style>
