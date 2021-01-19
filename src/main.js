import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { objIsNull,getStore,setStore} from "@/config/utils";
import bip39 from 'bip39';
import ethers from 'ethers';
import i18n from './lang'
Vue.prototype.bip39 = bip39;
Vue.prototype.ethers = ethers;
// 设置 js中可以访问 $cdn
import { $cdn } from '@/config'
Vue.prototype.$cdn = $cdn

// 全局引入按需引入UI库 vant
import '@/plugins/vant'
// 引入全局样式
import '@/assets/css/index.scss'
// 移动端适配
import 'lib-flexible/flexible.js'
import './styles/index.less'
// filters
import './filters'
Vue.config.productionTip = false

import VueWechatTitle from 'vue-wechat-title'//动态修改title
Vue.use(VueWechatTitle)

router.beforeEach((to, from ,next) => {
  beforeCheck()
  if(to.path === '/walletAssets/index'){
    let token = getStore("token");
    if (!token) {
      next()
    }else{
      next({path:'/walletAssets/wallet'})
    }
  }else{
    next()
  }
  return
})

function getUrlKey(name,url){
  　return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url) || [, ""])[1].replace(/\+/g, '%20')) || null
}
function beforeCheck(){
    var lang = getStore('lang')
    var hreflang = getUrlKey('lang',window.location.href)
    // debugger
    if(!lang){
      if(hreflang){
        setStore('lang',hreflang)
      }else{
        setStore('lang','zh_CN')
      }
    }else{
      if(hreflang){
        setStore('lang',hreflang)
      }
    }
    let idctUserId = getUrlKey('user_id',window.location.href)
    if(idctUserId){
      setStore('idctUserId',idctUserId)
    }
    
    // alert(idctUserId)
    // alert(lang)
    // alert('链接上的参数lang'+hreflang)
}

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
