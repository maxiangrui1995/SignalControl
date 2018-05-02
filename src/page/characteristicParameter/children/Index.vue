<template>
  <div>
    <div class="breadWarpper">
      <p style="font-size:16px; padding:20px 20px 30px; font-weight:500">特征参数 / 方案一</p>
      <Tabs v-model="TabSelected" @on-click="tabsChange">
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
    </div>
    <div class="contentWrapper">
      <router-view @listenStepChange="tabsChange" />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    tabsChange(name) {
      this.$router.push({ path: name });
      this.TabSelected = name;
    }
  },
  data() {
    return {
      TabSelected: this.$route.path.split("/")[3]
    };
  }
};
</script>

<style scoped>
.breadWarpper {
  background: #fff;
}
.contentWrapper {
  margin: 20px;
  min-height: 400px;
  background: #fff;
  padding: 10px;
}
</style>
