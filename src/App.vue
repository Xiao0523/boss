<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
        <!-- 这里是会被缓存的视图组件！ -->
      </router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive">
      <!-- 这里是不被缓存的视图组件！ -->
    </router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {},
  destroyed() {
    this.$store.dispatch('LogOut')
    //    console.log('app销毁');
    //    LogOut
    //    this.$store.commit('remove_userInfo')
  }
}
</script>
