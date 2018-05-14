<template>
  <div class="dh-table-wrapper">
    <div class="dh-table-wrapper-header">
      <Breadcrumb>
        <BreadcrumbItem to="/characteristicParameter">特征参数</BreadcrumbItem>
        <BreadcrumbItem>{{data.name}}</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <Tabs @on-click="tabSelect" :value="tabsActive" :style="{'margin-top':'20px'}">
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
  data() {
    return {
      tabsActive: this.$route.path.split("/")[3],
      id: this.$route.params.id
    };
  },
  methods: {
    tabSelect(name) {
      this.$router.push({
        path: name
      });
    }
  },
  computed: {
    data() {
      return this.$store.state.characterModule.baseData;
    }
  },
  created() {
    let id = this.$route.params.id;
    this.$store.dispatch("characterModule/SET_DATA", id);
  }
};
</script>

<style>

</style>
