<template>
  <Layout :style="{height:'100%'}">
    <Header :style="{padding: '0'}" class="dh-layout-header">
      <div class="dh-logo">道路交通信号机控制平台</div>
    </Header>
    <Layout>
      <Sider hide-trigger class="dh-layout-sider">
        <Menu :active-name="menuActiveName" width="auto" @on-select="menuSelect" :style="{background:'transparent', height:'100%'}">
          <i-menu-item name="/regionalManagement">
            <Icon type="ios-navigate"></Icon>
            <span>区域管理</span>
          </i-menu-item>
          <i-menu-item name="/comprehensiveQuery">
            <Icon type="search"></Icon>
            <span>综合查询</span>
          </i-menu-item>
          <i-menu-item name="/characteristicParameter">
            <Icon type="settings"></Icon>
            <span>特征参数</span>
          </i-menu-item>
          <i-menu-item name="/greenBelt">
            <Icon type="flag"></Icon>
            <span>绿波带</span>
          </i-menu-item>
        </Menu>
      </Sider>
      <Content class="dh-layout-content">
        <router-view/>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
export default {
  name: "IndexPage",
  data() {
    return {
      menuActiveName: "/" + this.$route.path.split("/")[1]
    };
  },
  methods: {
    menuSelect(name) {
      this.$router.push({ path: name });
    }
  },
  created() {}
};
</script>

<style scoped lang="less">
.dh-layout-header {
  color: #fff;
  .dh-logo {
    font-size: 18px;
    font-weight: 700;
    text-align: center;
    padding: 0 10px;
    float: left;
  }
}
.dh-layout-sider {
  .ivu-menu {
    color: #fff;
    .ivu-menu-item {
      &:hover {
        background: #373737;
      }
    }
    &:after {
      background: transparent;
    }
  }
}
.dh-layout-content {
  background: #193c7e;
  position: relative;
}
</style>
