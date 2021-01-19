<template>
    <div>
        <alert2 :show='show' :label="$t('mall59')" @close="closePop" :mall="true" @closeback="closePop">
      <div class="mall3" @click.stop.prevent>
        <div class="mall_center">
          <div class="imgs">
            <img src="../../assets/mall6.svg" alt="">
            <img src="../../assets/mall6.svg" alt="">
          </div>
          <div class="mall3_body">
            <div class=relad>
              <div class="re_list">
                <div class="re_img" v-for="(item,index) in awardCode" :key="index">
                    <transition name="down-up-translate-fade">
                        <img :src="item.value" alt="">
                    </transition>
                </div>
              </div>
              <div class="hends">
                <div class="hend_top"></div>
                <div class="hend_b"></div>
              </div>
            </div>
          </div>
          <div class="imgs">
            <img src="../../assets/mall6.svg" alt="">
            <img src="../../assets/mall6.svg" alt="">
          </div>
        </div>
        <div class="mall3btn">
          <div @click="doDraw">{{$t('mall60')}}</div>
        </div>
      </div>
    </alert2>
    </div>
</template>

<script>
import alert2 from './globelModel2'
import {getdraw} from '@/api/user'
import { Toast } from 'vant'
	export default {
        name: 'numberRolling',
        components:{
            alert2
        },
		data () {
			return {
				interval: null,
				interval_one: null,
                interval_two: null,
                chars : ['1', '2', '3', '4', '5', '6', '7'],
				awardCode: [
					{name: 'oneDigit', value: require('@/assets/mall1.png')},
					{name: 'tenDigit', value: require('@/assets/mall1.png')},
					{name: 'hundredsDigit', value: require('@/assets/mall1.png')}
				],
			}
		},
		props:{
			show:{
          type:Boolean,
          default:false
      },
      drawNum:{
          type:Number,
          default:1
      }
    },
    created(){
        // this.start()
        
    },
		// 开奖效果方法
		methods: {
            doDraw(){
                let that = this
                this.start()
                this.start_one()
                this.start_two()
                setTimeout(function(){
                    getdraw({'owlLevel':that.drawNum}).then(res=>{
                        that.end()
                        if(res.data.resultCode==999999){
                            if(res.data.resultData.result=='Y'){
                                that.drawCode = res.data.resultData
                                that.$emit('drawcode',drawCode)
                            }else{
                              that.$emit('notDraw')
                            }
                        }else if(res.data.resultCode=100006){
                            that.$emit('notGold')
                        }else{

                        }
                    })
                },2000)
                
            },
            closePop(){
                this.$emit('closepop')
            },
			start() {
				var _this = this;
				if (!this.interval) {
					let i = 0
					this.interval = setInterval(function() {
                        let num = _this.generateMixed(1)
						_this.awardCode[0].value = require('@/assets/mall'+num+'.png') 
					}, 300)
				}
			},
			end(i) {
                this.awardCode[0].value = require('@/assets/mall'+this.drawNum+'.png')
                this.awardCode[1].value = require('@/assets/mall'+this.drawNum+'.png')
                this.awardCode[2].value = require('@/assets/mall'+this.drawNum+'.png')
				clearInterval(this.interval)
                this.interval = null
                clearInterval(this.interval_one)
                this.interval_one = null
                clearInterval(this.interval_two)
				this.interval_two = null
			},
			start_one() {
				var _this = this;
				if (!this.interval_one) {
					let j = 0
					this.interval_one = setInterval(function() {
						let num = _this.generateMixed(1)
						_this.awardCode[1].value = require('@/assets/mall'+num+'.png')
					}, 100)
				}
			},
			end_one(j) {
				clearInterval(this.interval_one)
				this.interval_one = null
			},
			start_two() {
				this.show_two = !this.show_two
				var _this = this;
				let k = 0
				if (!this.interval_two) {
					this.interval_two = setInterval(function() {
						let num = _this.generateMixed(1)
						_this.awardCode[2].value = require('@/assets/mall'+num+'.png')
					}, 100)
				}
			},
			end_two(k) {
				clearInterval(this.interval_two)
				this.interval_two = null
			},
			prizeNumber(code) {
				this.awardCode[0].value = code.substr(0,1)
				this.awardCode[1].value = code.substr(1,1)
				this.awardCode[2].value = code.substr(2,1)
            },
            generateMixed(n) {
                var res = "";
                for(var i = 0; i < n; i++) {
                    var id = Math.ceil(Math.random() * 6);
                    res += this.chars[id];
                }
                return res;
            }
		},
		beforeDestroy: function() {
			if(this.interval){
			  clearInterval(this.interval)
			}
			if(this.interval_one){
			  clearInterval(this.interval_one)
			}
			if(this.interval_two){
			  clearInterval(this.interval_two)
			}
		}
	}
</script>
<style lang="scss" scoped>
	.down-up-translate-fade-enter-active,
    .down-up-translate-fade-leave-active {
        transition: all .1s;
        -webkit-transition: all .1s;
        -moz-transition: all .1s;
        -o-transition: all .1s;
    }
    .down-up-translate-fade-enter,
    .down-up-translate-fade-leave-active {
        opacity: 1;
    }
    .down-up-translate-fade-leave-active {
        transform: translateY(-50px);
        -webkit-transform: translateY(-50px);
        -moz-transform: translateY(-50px);
        -o-transform: translateY(-50px);
    }
    .mall3 {
  padding-top: 6px;
  .mall_center {
    background: #ffcb02;
    border-radius: 5px;
    .imgs {
      display: flex;
      justify-content: space-between;
      padding: 5px 8px;
      img {
        width: 16px;
        height: 16px;
      }
    }
  }
  .mall3_body {
    padding: 0 10px;

    .relad {
      padding: 13px;
      background: #ffaa01;
      border-radius: 5px;
      .hends {
        position: absolute;
        top: 90px;
        right: -13px;
        text-align: right;
        .hend_top {
          width: 13px;
          height: 46px;
          background: linear-gradient(90deg, #eda214 0%, #fffe6d 100%);
          border-radius: 4px;
          position: absolute;
          top: -46px;
          left: 14px;
        }
        .hend_b {
          width: 18px;
          height: 37px;
          border-radius: 0 0 6px 0;
          border-bottom: 5px solid #e57223;
          border-right: 5px solid #e57223;
        }
      }

      .re_list {
        background: #de3507;
        border-radius: 5px;
        padding: 8px;
        display: flex;
        justify-content: space-between;
        .re_img {
          width:80px;
          height:80px;  
          img {
            width: 80px;
            height:80px;
          }
        }
      }
    }
  }
  .mall3btn {
    margin-top: 18px;
    padding-bottom: 8px;
    div {
      background: url(../../assets/mall3btn.svg) no-repeat;
      background-size: 100% 100%;
      width: 170px;
      height: 42px;
      line-height: 42px;
      font-size: 16px;
      font-weight: 500;
      color: #ffffff;
      text-align: center;
      margin: 0 auto;
    }
  }
}
</style>