<template>
  <Layout :style="{height:'100%'}">
    <Header :style="{padding: '0 10px'}">
      <div class="logo">{{logo}}</div>
    </Header>
    <Layout>
      <Sider hide-trigger>
        <Menu width="auto" :active-name="menuActiveName" @on-select="menuSelect" :style="{background:'transparent', height:'100%'}">
          <i-menu-item v-for="(item,index) in menu" :key="index" :name="'/'+item.name">
            <Icon :type="item.icon" />
            <span>{{item.title}}</span>
          </i-menu-item>
        </Menu>
      </Sider>
      <Content :style="{position:'relative'}" ref="app">
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
      logo: "道路交通信号机控制平台",
      menu: [
        {
          name: "comprehensiveQuery",
          title: "综合查询",
          icon: "search"
        },
        {
          name: "region",
          title: "区域管理",
          icon: "ios-navigate"
        },
        {
          name: "planList",
          title: "特征参数",
          icon: "settings"
        },
        {
          name: "greenBelt",
          title: "绿波带",
          icon: "flag"
        },
        {
          name: "privilege",
          title: "特勤联动",
          icon: "ios-color-filter"
        }
      ],
      menuActiveName: `/${this.$route.path.split("/")[1]}`
    };
  },
  methods: {
    menuSelect(name) {
      this.$router.push({ path: name });
    }
  }
};
</script>

<style lang="less" scoped>
.logo {
  font-size: 18px;
  font-weight: 600;
}
</style>
