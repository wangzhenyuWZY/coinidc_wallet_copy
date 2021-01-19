<template>
  <div id="app">
    <!-- 开启顶部安全区适配 -->
    <!-- <van-nav-bar safe-area-inset-top /> -->
    <!-- <router-view /> -->
    <router-view v-wechat-title='$route.meta.title' />
    <!-- 开启底部安全区适配 -->
    <!-- <van-nav-bar safe-area-inset-bottom /> -->
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
