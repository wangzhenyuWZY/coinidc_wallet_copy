<template>
  <div class="coins-rolling" ref="coins" :class="rolling">
    <div v-for="num in coinsNum" class="coin" :key="num" :class="'coin-' + num">
      <img src="../themes/images/common/coin.jpg" alt="">
    </div>
  </div>
</template>
<script>
  export default {
    name: 'coinsRolling',
    data() {
      return {
        rolling: ''
      }
    },
    props: {
      coinsNum: {
        type: Number,
        default: 8
      },
      show: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      touchstart () {
        let self = this;
        self.rolling = 'collect';
        window.coinsRollingTimer = setTimeout(function() {
          self.rolling = '';
          clearTimeout(window.coinsRollingTimer);
          self.$emit('close')
        }, 1400)
      }
    },
    watch:{
      show(isShow){
        if(isShow){
          this.touchstart()
        }
      }
    },
    mounted() {
      
    }
  }
</script>
<style lang="less">
  @import "../themes/style/coinsRolling.less";
</style>