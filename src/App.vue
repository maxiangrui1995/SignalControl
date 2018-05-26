<template>
  <router-view/>
</template>

<script>
// import { $d_secret_service_plan } from "./api";
export default {
  name: "App",
  data() {
    return {};
  },
  methods: {
    /* 加载已激活的特勤 */
    /*   loadPrivilege() {
      $d_secret_service_plan.planList({ status: 1 }).then(res => {
        if (res.data.total > 0) {
          this.showNotice();
        }
      });
    }, */
    /* 显示notice */
    /* showNotice() {
      setTimeout(() => {
        this.$Notice.info({
          title: "特勤联动",
          desc: "特勤方案正在执行！",
          duration: 10
        });
      }, 500);
    } */
  },
  created() {
    // this.loadPrivilege();
  }
};
</script>

<style>
body,
html {
  width: 100%;
  height: 100%;
}
</style>
