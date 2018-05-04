<template>
    <Layout class="dh-layout">
        <Header :style="{padding: 0,position: 'relative'}" class="dh-layout-header">
            <div class="dh-logo-con">
                <router-link to="/a">道路交通信号机控制平台</router-link>
            </div>
        </Header>
        <Layout>
            <Sider hide-trigger class="dh-layout-sider">
                <Menu :active-name="menuActiveName" width="auto" @on-select="menuSelect" :style="{background:'transparent'}">
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
                </Menu>
            </Sider>
            <Layout class="dh-layout-main">
                <Content>
                    <router-view/>
                </Content>
            </Layout>
        </Layout>
    </Layout>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      isFullScreen: false,
      menuActiveName: "/" + this.$route.path.split("/")[1]
    };
  },
  computed: {},
  methods: {
    menuSelect(name) {
      this.$router.push({ path: name });
    }
  }
};
</script>

