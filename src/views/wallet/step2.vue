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
      <div class="key m_top20" @click="show =true">
        <span>{{$t('mall38')}}</span>
        <img src="../../assets/back.svg" alt="">
      </div>
      <div class="key m_top20" @click="toMnemonic">
          <span>{{$t('mall39')}}</span>
          <img src="../../assets/back.svg" alt="">
      </div>
      <div class="reading m_top20">
        <span>
          <img src="../../assets/reading_show.svg" alt="" v-show="!reading" @click="reading =!reading">
          <img src="../../assets/reading.svg" alt="" v-show="reading" @click="reading =!reading">
        </span>
        <span>{{$t('mall40')}}</span>
      </div>
      <div class="m_top20">
        <van-button class="globel_button" :loading="false" :disabled='!reading' type="info" @click="show1 = true">{{$t('mall20')}}</van-button>
      </div>
    </div>
    <modelKey :show="show" @close="show=false" />
    <backup :show="show1" @close="show1= false" @chage="chage" />
  </div>
</template>

<script>
import Title from '@/components/Title'
import modelKey from './key'
import backup from './backup'
export default {
  data() {
    return {
      title: this.$t('mall34'),
      showEye: false,
      from: {
        pwd1: '',
        pwd2: ''
      },
      show: false,
      show1: false,
      reading: false
    }
  },
  components: {
    Title,
    modelKey,
    backup
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    chage() {
      this.$router.push({
        path: "/walletAssets/wallet"
      })
    },
    toMnemonic(){
      this.$router.push('/validation/step1')
    }
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
