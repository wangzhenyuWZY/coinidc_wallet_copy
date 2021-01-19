import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

import zh from './config/zh'
import en from './config/en'
import ja from './config/ja'
import kr from './config/kr'
let lang = 'zh_CN'
var hreflang = getUrlKey('lang',window.location.href)
if(hreflang){
  lang = hreflang
}else{
  lang = localStorage.getItem('lang')
}
if(lang!=='zh_CN' && lang!=='zh_HK' && lang!=='en_US' && lang!=='ja_JP' && lang!=='ko_KR'){
  lang = 'zh_CN'
}
const i18n = new VueI18n({
  locale: lang,
  messages: {
    'zh_CN':zh,
    'zh_HK':zh,
    'en_US':en,
    'ja_JP':ja,
    'ko_KR':kr
  }
})

function getUrlKey(name,url){
  　return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url) || [, ""])[1].replace(/\+/g, '%20')) || null
}
export default i18n

