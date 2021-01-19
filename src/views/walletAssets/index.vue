<template>
    <div class="walletHome">
        <Title :isback='false' :title="title"></Title>
        <img src="../../assets/Group.png" />
        <div class="btnbox">
            <router-link to="/wallet/step1" class="btn active">{{$t('mall41')}}</router-link>
            <router-link to="/wallet/mnemonic" class="btn">{{$t('mall114')}}</router-link>    
        </div>
    </div>
</template>
<script>
import Title from '@/components/Title'
export default {
  components: {
    Title
  },
  data(){
      return {
          title: this.$t('mall41'),
      }
  }
}
</script>
<style lang='less' scoped>
.walletHome{
    text-align:center;
    img{
        width:232px;
        height:186px;
        margin-top:145px;
        margin-bottom:47px;
    }
    .btnbox{
        padding:0 15px;
    }
    .btn{
        display:block;
        width:100%;
        height:50px;
        line-height:50px;
        text-align:center;
        border:1px solid #8997B3;
        border-radius:4px;
        font-size:16px;
        color:#8997B3;
        box-sizing: border-box;
        margin-bottom:20px;
        &.active{
            border:none;
            background:#3C3BEE;
            color:#fff;
        }
    }
}
</style>