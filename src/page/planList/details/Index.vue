<template>
  <div class="wrapper">
    <Breadcrumb :style="{'margin':'10px'}">
      <BreadcrumbItem to="/planList">特征参数</BreadcrumbItem>
      <BreadcrumbItem>adasd</BreadcrumbItem>
    </Breadcrumb>
    <Tabs @on-click="tabSelect" :value="tabsActive">
      <TabPane label="基本" name="base"></TabPane>
      <TabPane label="通行权" name="wayleave"></TabPane>
      <TabPane label="灯组" name="lightgroup"></TabPane>
      <TabPane label="相位" name="phase"></TabPane>
      <TabPane label="方案" name="plan"></TabPane>
      <TabPane label="日期类型" name="datetype"></TabPane>
      <TabPane label="时间调度" name="scheduling"></TabPane>
      <TabPane label="车检器" name="vehicleInspection"></TabPane>
      <TabPane label="自适应方案" name="adaptive"></TabPane>
    </Tabs>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "planLists",
  data() {
    return {
      tabsActive: this.$route.path.split("/")[3]
    };
  },
  methods: {
    tabSelect(name) {
      this.$router.push({
        path: name
      });
    }
  }
};
</script>

<style>
</style>
