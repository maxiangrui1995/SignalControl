<template>
  <div id="app" class="app-main">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="less">
@import "./assets/style/theme.less";
html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.app-main {
  width: 100%;
  height: 100%;
}
</style>
