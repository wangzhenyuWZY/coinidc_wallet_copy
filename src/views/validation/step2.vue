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
        <div class="list2v ">
          <div class="list ">
            <div class="list_item" v-for="(item,index) in wordsListCopy" :key="index">
              <span class="type">{{item}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="validation_listvt2 validation_list">

        <div class="list list2">
          <div class="list_item" v-for="(item,index) in wordsList" :key="index" @click="hdelClick(item,index)" :class="item.show?'blues':''">
            <span class="type">{{item.mnemonic}}</span>
          </div>
        </div>
      </div>
      <div class="btn_list m_top20">
        <van-button class="globel_button" :loading="false" :disabled='disabled' type="info" @click="toHome">{{$t('mall20')}}</van-button>
        <div class="btn2 m_top20" @click="goBack">{{$t('mall107')}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getStore, setStore, removeStore, objIsNull } from "@/config/utils";
import Title from '@/components/Title'
export default {
  data() {
    return {
      title: '创建钱包',
      showEye: false,
      show: false,
      show1: false,
      reading: false,
      disabled:true,
      mnemonic:[],
      wordsList:[],
      wordsListCopy:[]
    }
  },
  components: {
    Title
  },
  watch: {
    wordsListCopy(list) {
      if(list.length==12){
        this.disabled = false
      }
    }
  },
  computed: {

  },
  mounted() {
    let mnemonic = getStore("mnemonic");
    if (!objIsNull(mnemonic)) {
      this.mnemonic = mnemonic.split(" ");
      console.log(this.mnemonic)
      this.mnemonic = this.mnemonic.sort(function(){return Math.random()>0.5?-1:1;});
      this.mnemonic.forEach(element => {
        this.wordsList.push({
          mnemonic:element,
          show:false
        })
      });
    }
  },
  methods: {
    checkWordList() {
      if (this.mnemonic.toString() === this.wordsListCopy.toString()) {
        alert('成功')
      } else {
        alert('shibai')
      }
    },
    hdelClick(d,index) {
      if(!d.show){
        d.show = true
        this.$set(this.wordsList, index, d)
        this.wordsListCopy.push(d.mnemonic)
      }
    },
    toHome(){
      let wordsListCopy = this.wordsListCopy.join(' ')
      let mnemonic = getStore("mnemonic");
      if(wordsListCopy!==mnemonic){
        alert('顺序有误')
        return
      }
      let wallet = this.$route.query;
      let walletList = JSON.parse(getStore("walletList"));
      let walletItem = JSON.parse(getStore("walletItem"));
      this.$set(walletItem, "details", wallet);
      if (objIsNull(walletList) || walletList.length == 0) {
        let list = [];
        list.push(walletItem);
        setStore("walletList", list);
      } else {
        walletList.push(walletItem);
        setStore("walletList", walletList);
      }
      this.$router.push('/wallet/step2')
      // this.$router.replace({ name: "wallet" });
    },
    goBack(){
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
