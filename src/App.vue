<template>
  <div id="app">
    <main-tab-bar />
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabbar/MainTabBar";
export default {
  name: "App",
  components: {
    MainTabBar, //注册子组件
  },
};
</script>

<style scoped>
@import "assets/css/base.css";
</style>
