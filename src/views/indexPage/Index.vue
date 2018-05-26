<template>
  <Layout :style="{height:'100%'}">
    <Header :style="{padding: '0'}">
      <div class="logo">{{logo}}</div>
    </Header>
    <Layout>
      <Sider hide-trigger class="dh-layout-sider">
        <Menu :active-name="menuActiveName" width="auto" @on-select="menuSelect" :style="{background:'transparent', height:'100%'}">
          <i-menu-item name="/comprehensiveQuery">
            <Icon type="search"></Icon>
            <span>综合查询</span>
          </i-menu-item>
          <i-menu-item name="/regionalManagement">
            <Icon type="ios-navigate"></Icon>
            <span>区域管理</span>
          </i-menu-item>
          <i-menu-item name="/characteristicParameter">
            <Icon type="settings"></Icon>
            <span>特征参数</span>
          </i-menu-item>
          <i-menu-item name="/greenBelt">
            <Icon type="flag"></Icon>
            <span>绿波带</span>
          </i-menu-item>
          <i-menu-item name="/privilege">
            <Icon type="ios-color-filter"></Icon>
            <span>特勤联动</span>
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
      menuActiveName: `/${this.$route.path.split("/")[1]}`
    };
  },
  methods: {
    /* 导航选中 */
    menuSelect(name) {
      this.$router.push({ path: name });
    },
    /* 改变content的滚动条效果 */
    changeScroller() {
      this.$nextTick(() => {
        Scrollbar.init(this.$refs.app.$el);
      });
    }
  },
  created() {
    this.changeScroller();
  }
};
</script>

<style scoped lang="less">
@import "~less/color.less";
@header: ~"@{css-prefix}layout-header";
@sider: ~"@{css-prefix}layout-sider";
@content: ~"@{css-prefix}layout-content";
@menu: ~"@{css-prefix}menu";

.@{header} {
  background: @layout-header-color;
  color: @text-color;
  .logo {
    font-size: 18px;
    font-weight: 700;
    text-align: center;
    padding: 0 10px;
    float: left;
    cursor: pointer;
  }
}
.@{sider} {
  background: @layout-sider-color;
}
.@{content} {
  background: @layout-content-color;
}
.@{menu} {
  color: @text-color;
}
.@{menu}-vertical {
  .@{menu}-item {
    &:hover {
      background: @menu-item-hover-color;
    }
  }
  &.@{menu}-light {
    &:after {
      background: transparent;
    }
  }
}
.@{menu}-light {
  &.@{menu}-vertical {
    .@{menu}-item-active {
      &:not(.@{menu}-submenu) {
        color: @menu-item-actived-color;
        border-right-color: @menu-item-actived-color;
      }
    }
  }
}
</style>