<template>
  <Layout :style="{height:'100%'}">
    <Header :style="{padding: '0 10px'}">
      <div class="logo">{{logo}}</div>
      <div class="tools">
        <y-message></y-message>
        <y-users></y-users>
      </div>
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
        <vue-scrollbar style="width:100%;height:100%;">
            <router-view/>
        </vue-scrollbar>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
import YMessage from "./components/Message";
import YUsers from "./components/Users";
import VueScrollbar from "vue2-scrollbar";
export default {
  name: "IndexPage",
  components: { YMessage, YUsers,VueScrollbar },
  data() {
    return {
      logo: "道路交通信号机控制平台",
      menu: [
        /* {
          name: "workplace",
          title: "工作台",
          icon: "speedometer"
        }, */
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
  },
  mounted() {
  }
};
</script>

<style lang="less" scoped>
.logo {
  font-size: 18px;
  font-weight: 600;
  float: left;
  cursor: pointer;
}
.tools {
  float: right;
}
</style>
