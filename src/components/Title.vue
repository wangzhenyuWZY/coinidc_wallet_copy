<template>
  <van-nav-bar :title="title" left-arrow :class="hide?'mobles':''">
    <van-icon name="arrow-left" slot="left" :color="hide?'#FFFFFF':'#2D2D2D'" size="20px" v-show="isback" @click="goback" />
  </van-nav-bar>
</template>
<script>
export default {
  name: 'TabBar',
  props: {
    title: {
      type: String,
      default: ''
    },
    hide: {
      type: Boolean,
      default: false
    },
    isback:{
      type:Boolean,
      default:true
    }
  },
  data() {
    return {

    }
  },
  methods: {
    goback() {
      this.$router.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style   >
.van-hairline--bottom::after {
  border: 0;
}
.van-nav-bar__title {
  font-size: 17px;
  color: #131f30;
}
.mobles {
  background-color: transparent;
}
.mobles .van-nav-bar__title {
  color: #fff;
}
</style>
