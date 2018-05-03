<template>
    <Layout class="dh-layout">
        <Sider ref="side" collapsible hide-trigger :collapsed-width="78" v-model="isCollapsed" :class="siderClasses">
            <div class="logo-con">
                <a href="/">信号机控制平台</a>
            </div>
            <Menu active-name="1-2" theme="dark" width="auto">
                <i-menu-item name="1-1">
                    <Icon type="ios-navigate"></Icon>
                    <span>区域管理</span>
                </i-menu-item>
                <i-menu-item name="1-2">
                    <Icon type="search"></Icon>
                    <span>综合查询</span>
                </i-menu-item>
                <i-menu-item name="1-3">
                    <Icon type="settings"></Icon>
                    <span>特征参数</span>
                </i-menu-item>
            </Menu>
        </Sider>
        <Layout>
            <Header :style="{padding: 0,position: 'relative'}" class="dh-layout-header-bar">
                <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '20px 20px 0', cursor: 'pointer'}" type="navicon-round" size="24"></Icon>
                <div class="dh-layout-header-avator">
                    <y-fullScreen v-model="isFullScreen" />
                    <y-messageTip/>
                    <y-users/>
                </div>
            </Header>
            <Content class="dh-layout-content-bar">
                Content
            </Content>
        </Layout>
    </Layout>
</template>

<script>
import YFullScreen from "./compontents/Fullscreen";
import YMessageTip from "./compontents/MessageTip";
import YUsers from "./compontents/Users";

export default {
  components: {
    YFullScreen,
    YMessageTip,
    YUsers
  },
  data() {
    return { isFullScreen: false };
  },
  computed: {
    isCollapsed: {
      get: function() {
        return this.$store.state.isCollapsed;
      },
      set: function() {
        this.$store.commit("SET_COLLAPSED");
      }
    },
    rotateIcon() {
      return ["default-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
    siderClasses() {
      return ["expanded-menu", this.isCollapsed ? "collapsed-menu" : ""];
    }
  },
  methods: {
    collapsedSider() {
      this.$refs.side.toggleCollapse();
    }
  }
};
</script>

<style lang="less">
@import "./main.less";
</style>
