<template>
  <Layout :style="{height:'100%'}">
    <Header class="header">
      <div class="header-logo">{{logo}}</div>
      <div class="header-tools">
        <message-tip></message-tip>
        <lock-screen></lock-screen>
        <theme-switch></theme-switch>
        <y-setting></y-setting>
        <log-out></log-out>
      </div>
    </Header>
    <Layout>
      <Sider hide-trigger>
        <div class="avatar-wrapper">
          <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" size="large" />
          <div class="avatar-wrapper-content">欢迎您:
            <span class="title">{{user}}</span>
          </div>
        </div>
        <Menu width="auto" theme="dark" :active-name="menuActiveName" @on-select="menuSelect" :style="{background:'transparent', height:'100%'}">
          <i-menu-item v-for="(item,index) in menu" :key="index" :name="'/'+item.name">
            <Icon :type="item.icon" />
            <span>{{item.title}}</span>
          </i-menu-item>
        </Menu>
      </Sider>
      <Content :style="{position:'relative'}">
        <vue-scrollbar style="width:100%;height:100%;" id="home-scrollbar">
          <router-view/>
        </vue-scrollbar>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
import themeSwitch from "./components/theme-switch/theme-switch";
import lockScreen from "./components/lock-screen/lock-screen";
import logOut from "./components/logout";
import messageTip from "./components/message-tip";
import ySetting from "./components/setting";
import VueScrollbar from "vue2-scrollbar";
export default {
  components: {
    VueScrollbar,
    themeSwitch,
    logOut,
    lockScreen,
    messageTip,
    ySetting
  },
  data() {
    return {
      logo: "道路交通信号机控制平台",
      menu: [
        {
          name: "workplace",
          title: "工作台",
          icon: "speedometer"
        },
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
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  created() {}
};
</script>

<style lang="less">
@import "./main.less";
</style>