<template>
  <div class="layout">
    <Layout :style="{height:'100%'}">
      <Sider ref="side" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
        <Menu :active-name="menuitemActive" theme="dark" width="auto" :class="menuitemClasses" @on-select="menuitemSelect">
          <MenuItem name="/comprehensiveQuery">
          <Icon type="ios-navigate"></Icon>
          <span>综合查询</span>
          </MenuItem>
          <MenuItem name="/regionalManagement">
          <Icon type="search"></Icon>
          <span>区域管理</span>
          </MenuItem>
          <MenuItem name="/characteristicParameter">
          <Icon type="settings"></Icon>
          <span>特征参数</span>
          </MenuItem>
        </Menu>
      </Sider>
      <Layout>
        <Header :style="{padding: 0, 'z-index':'1'}" class="layout-header-bar">
          <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '20px 20px 0',cursor:'pointer'}" type="navicon-round" size="24"></Icon>
        </Header>
        <router-view/>
      </Layout>
    </Layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapsed: false,
      menuitemActive: this.$route.path
    };
  },
  computed: {
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  },
  methods: {
    collapsedSider() {
      this.$refs.side.toggleCollapse();
    },
    menuitemSelect(name) {
      this.$router.push({ path: name });
    }
  },
  mounted() {}
};
</script>

<style scoped>
.layout {
  background: #f5f7f9;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
.menu-icon {
  transition: all 0.3s;
}
.rotate-icon {
  transform: rotate(-90deg);
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>
