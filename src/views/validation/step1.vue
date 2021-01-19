<!-- home -->
<template>
  <div class="container">
    <Title :title="title"></Title>
    <div class="createContainer">
      <p class="createTitle">{{$t('mall34')}}<span>(Step2/<span class="title_colr">2</span>)</span></p>
      <p class="createTitle m_top20">{{$t('mall35')}}</p>
      <div class="create_size">
        <p>﹒{{$t('mall36')}}</p>
        <p>﹒{{$t('mall37')}}</p>
      </div>
      <div class="validation_list">
        <div class="list">
          <div class="list_item" v-for="(d,index) in wordsList" :key="index">
            <span class="size_number">{{index}}</span>
            <span class="type">{{d}}</span>
          </div>
        </div>
        <div class="list_btn" v-show="false">
          <div class="cp">
            <img src="../../assets/icon_cp.svg" alt="">
            <span>复制</span>
          </div>
          <div class="cp cp1">
            <img src="../../assets/showqroced.svg" alt="">
            显示二维码
          </div>
        </div>
      </div>
      <div class="btn_list m_top20">
        <router-link to="/validation/step2"><div class="btn1">{{$t('mall106')}}</div></router-link>
        <!-- <div class="btn2 m_top20">上一步</div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { getStore, objIsNull } from "@/config/utils";
import Title from '@/components/Title'
export default {
  data() {
    return {
      title: '创建钱包',
      showEye: false,
      from: {
        pwd1: '',
        pwd2: ''
      },
      codeUrl: 'https://www.baidu.com/',
      show: false,
      show1: false,
      reading: false,
      wordsList:[]
    }
  },
  components: {
    Title
  },
  computed: {
    
  },
  mounted() {
    let mnemonic = getStore("mnemonic");
    if (!objIsNull(mnemonic)) {
      this.wordsList = mnemonic.split(" ");
    }
  },
  methods: {
    chage() {
      alert('点击确定')
    }
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
