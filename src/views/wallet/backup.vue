<template>
  <van-popup :value="show" :style="{ width: '94.67%' ,borderRadius: '6px'}">
    <div class="popup_models">
      <div class="backup_img">
        <img src="../../assets/Group.svg" alt="">
      </div>
      <div class="backup_size">{{$t('mall57')}}</div>
      <div class="popup_buttons">
        <div @click="close">{{$t('mall58')}}</div>
        <div @click="chage">{{$t('mall20')}}</div>
      </div>
    </div>
  </van-popup>
</template>

<script>
export default {
  props: ['show', 'codeUrl'],
  components: {
  },
  methods: {
    close() {
      this.$emit('close')
    },
    chage() {
      this.$emit('chage')
    }
  }
}
</script>

<style lang="less" scoped>
.popup_models {
  padding: 20px;
  padding-top: 50px;
  .backup_img {
    text-align: center;
    margin-bottom: 20px;
  }
  .backup_size {
    font-size: 14px;
    font-weight: 400;
    color: #000000;
    text-align: center;
    margin-bottom: 56px;
  }
  .popup_buttons {
    display: flex;
    justify-content: space-between;
    > div {
      width: 48%;
      height: 50px;
      border-radius: 4px;
      line-height: 50px;
      font-size: 16px;
      font-weight: 500;
      text-align: center;
      &:nth-child(1) {
        border: 1px solid #8997b3;
        color: #8997b3;
      }
      &:nth-child(2) {
        background: #3c3bee;
        color: #fff;
      }
    }
  }
}
</style>
