<template>
  <div class="globle_inputs">
    <div class="input_lable" v-show="label">{{label}}</div>
    <div class="globle_input">
      <div class="input_lt">
        <input :type="showEye ?'text':'password'" :placeholder="placeholder" @keyup="hdelClick">
      </div>
      <div class="rg_icon" v-show="icon">
        <span>
          <img v-show="!showEye" src='../assets/eye_show.svg' alt="" @click="showEye =!showEye ">
          <img v-show="showEye" src='../assets/eye_hide.svg' alt="" @click="showEye =!showEye">
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {

    },
    placeholder: {

    },
    icon: {
      default: true
    },
    showEye:{
      default: true
    }
  },
  data() {
    return {
    }
  },
  methods: {
    hdelClick(e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style lang="less" scoped>
.globle_inputs {
  .input_lable {
    font-size: 16px;
    font-weight: 400;
    color: #000000;
    margin-bottom: 10px;
  }
  .globle_input {
    display: flex;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08);
    border-radius: 6px;
    border: 1px solid #cad5de;
    padding-right: 15px;
    .input_lt {
      flex: 1;
      padding-left: 12px;
      overflow: hidden;
      display: flex;
      input {
        flex: 1;
        height: 50px;
        font-size: 14px;

        &::placeholder {
          color: #b6c6d3;
          font-size: 14px;
        }
      }
    }
    .rg_icon {
      display: flex;
      align-items: center;
    }
  }
}
</style>
