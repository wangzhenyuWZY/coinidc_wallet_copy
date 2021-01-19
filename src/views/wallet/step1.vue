<!-- home -->
<template>
  <div class="container">
    <Title :title="title"></Title>
    <div class="createContainer">
      <p class="createTitle">{{$t('mall34')}}<span>(Step1/<span class="title_colr">2</span>)</span></p>
      <div class="set_input">
        <Input :label="$t('mall72')" :icon='false' :placeholder="$t('mall102')" v-model="name" />
      </div>
      <div class="set_input">
        <Input :showEye="false" :label="$t('mall43')" :placeholder="$t('mall44')" v-model="password" />
      </div>
      <div class="set_input">
        <Input :showEye="false" :label="$t('mall45')" :placeholder="$t('mall46')" v-model="passwordAgain" />
      </div>
      <div class="set_input" v-show="hasUserid">
        <Input :label="$t('mall47')" :icon='false' :placeholder="$t('mall48')" v-model="inviteCode" />
      </div>
      <div class="btn">
        <!-- <van-button class="globel_button" :loading="false" :disabled='disableds' type="info" loading-text="下载Keystore文件">下载Keystore文件</van-button> -->
        <van-button class="globel_button" :loading="false" :disabled='disableds' type="info" loading-text="下载Keystore文件" @click="handelClick">确认
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import Title from '@/components/Title'
import Input from '@/components/Input'
import { Notify } from 'vant'
import { objIsNull, removeStore, getStore,setStore, createWallet } from "@/config/utils";
export default {
  data() {
    return {
      title: this.$t('mall41'),
      showEye: false,
      password:'',
      passwordAgain:'',
      name:'',
      inviteCode:'',
      hasUserid:false
    }
  },
  components: {
    Title,
    Input
  },
  computed: {
    disableds() {
      return false
      //   if (this.from.pwd1 == '' || this.from.pwd2 == '') {
      //     return true
      //   }
      //   return false
    }
  },
  mounted() {
    removeStore("mnemonic");
    removeStore("walletItem");
    let userId = getStore('idctUserId')
    if(userId){
      this.hasUserid = false
    }else{
      this.hasUserid = true
    }
  },
  methods: {
    handelClick() {
      if (objIsNull(this.name) || objIsNull(this.name)) {
        this.text = this.$t('mall49');
        this.toast = true;
        return;
      }
      if (objIsNull(this.password) || objIsNull(this.passwordAgain)) {
        this.text = this.$t('mall50');
        this.toast = true;
        return;
      }
      if (this.password.length > 15 || this.passwordAgain.length > 15) {
        this.text = this.$t('mall51');
        this.toast = true;
        return;
      }
      if (this.password !== this.passwordAgain) {
        this.text = this.$t('mall52');
        this.toast = true;
        return;
      }
      let wallet = JSON.parse(getStore("walletItem"));
        if (objIsNull(wallet)) {
            createWallet(this.password).then((res)=>{
              let data = {
                      walletName:this.name,
                      walletPassword: this.password
                  }
              setStore('namepsd', data)
              setStore('inviteCode',this.inviteCode)
              this.$router.push({
                  path: "/wallet/step2",
                  query: {
                      walletName:this.name,
                      walletPassword: this.password
                  }
              });
            })
        }
    }
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
