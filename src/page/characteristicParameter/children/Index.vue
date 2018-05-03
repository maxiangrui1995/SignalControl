<template>
  <div>
    <div class="breadWarpper">
      <Breadcrumb :style="{'font-size':'16px', padding:'20px'}">
        <BreadcrumbItem to="/characteristicParameter">特征参数</BreadcrumbItem>
        <BreadcrumbItem>{{title}}</BreadcrumbItem>
      </Breadcrumb>
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
  },
  computed: {
    title() {
      return this.$store.state.CharacteristicModule.BASE.name;
    }
  },
  created() {
    this.$store.dispatch("SET_CHARACTERISTIC", this.$route.params.id);
  },
  mounted() {}
};
</script>

<style scoped>
.breadWarpper {
  background: #fff;
}
.contentWrapper {
  margin: 20px;
  background: #fff;
  padding: 10px;
}
</style>
