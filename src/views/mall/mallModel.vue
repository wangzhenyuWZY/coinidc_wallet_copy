<template>
  <van-overlay :show="show" :lock-scroll="false" class="over_lay">
    <div class="wrappers" @click.stop.prevent>
      <div class="wraper_bg" :class="hide?'padds':''">
        <div class="content">
          <div class="header">
            <div class="title">{{label}}</div>
            <div class="closeBtn" @click="close"><img src="../../assets/Groupcolse.svg" alt=""></div>
          </div>
          <div class="ct_by">
            <div class="img_bg" v-show="!mall">
              <img class="bg_img1" src="../../assets/Groupcell.svg" alt="">
              <img class="bg_img1 bg_img2" src="../../assets/Groupcell.svg" alt="">
            </div>
            <slot>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </van-overlay>
</template>

<script>
export default {
  props: {
    label: {

    },
    show: {

    },
    mall: {
      default: false
    },
    position: {
      default: 'center'
    },
    hide: {
      default: false
    }
  },
  data() {
    return {
    }
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>
.over_lay {
  z-index: 999;
}

.wrappers {
  display: flex;
  align-items: flex-end;
  height: 100%;

  .wraper_bg {
    flex: 1;
    padding: 0 20px;
    &.padds {
      padding: 0;
    }
    .content {
      background: #e7ebf1;
      border-radius: 6px 6px 0px 0px;
      border: 1px solid #232c6e;
      min-height: 290px;
      position: relative;
      .header {
        position: absolute;
        top: -12px;
        left: 0;
        height: 40px;
        width: 100%;
        .title {
          width: 175px;
          height: 40px;
          line-height: 40px;
          background: url(../../assets/Grouptitle.svg) no-repeat;
          background-size: 100% 100%;
          font-size: 16px;
          font-weight: 600;
          color: #6c330d;
          text-align: center;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
        }
        .closeBtn {
          position: absolute;
          right: 15px;
          top: 0px;
          img {
            width: 37px;
          }
        }
      }
      .ct_by {
        margin-top: 40px;
        position: relative;
        .ct_cneter {
          background: #fff;
          box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
          padding: 35px 10px 20px;

          border-radius: 6px;
          font-size: 14px;
          font-weight: 400;
          color: #303030;
        }
        .bg_img1 {
          width: 26px;
          height: 28px;
          position: absolute;
          top: -14px;
          left: 40px;
          &.bg_img2 {
            right: 40px;
            left: auto;
          }
        }
      }
    }
  }
}

.block {
  width: 100%;
  position: relative;
  margin: 0 20px;
  background-color: #fff;
}
</style>
