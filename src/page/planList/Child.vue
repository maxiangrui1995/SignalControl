<template>
  <div>
    <div style="padding: 0 20px; background: #fff; box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 3px 2px;">
      <Breadcrumb :style="{height: '64px', lineHeight: '64px'}">
        <BreadcrumbItem to="/planList">特征参数</BreadcrumbItem>
        <BreadcrumbItem>{{name}}</BreadcrumbItem>
      </Breadcrumb>
      <Tabs class="tabs-nocontent" @on-click="tabSelect" :value="tabsActive">
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
    <div style="padding: 20px;">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      name: "",
      tabsActive: this.$route.path.split("/")[3]
    };
  },
  methods: {
    // 请求数据
    fetchPlanList() {
      this.loading = true;
      this.$http("index/d_plan/dataView", {
        id: 818
      }).then(res => {
        if (res.status) {
          this.name = res.data.name;
          this.$store.dispatch("planModule/SetBase", res.data);
        }
      });
    },
    tabSelect(name) {
      this.$router.push({
        path: name
      });
    }
  },
  created() {
    this.fetchPlanList();
  }
};
</script>

