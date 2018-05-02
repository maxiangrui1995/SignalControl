<template>
  <Layout :style="{overflow:'hidden'}">
    <Header :style="{padding:'0 10px', position:'fixed', width:'100%','box-shadow':'0 1px 4px rgba(0, 21, 41, 0.08)', 'z-index':1}">
      <span class="logo">道路交通信号机控制平台</span>
    </Header>
    <Layout :style="{position:'fixed', width:'100%', top:'64px', bottom:'0', overflow:'auto'}">
      <Sider collapsible :collapsed-width="78" v-model="isCollapsed">
        <Menu theme="dark" width="auto" :style="{height:'100%'}" :class="menuitemClasses" :active-name="menuitemActive" @on-select="menuitemSelect">
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
        </Menu>
      </Sider>
      <Layout :style="{padding: '0'}">
        <Content>
          <router-view/>
        </Content>
      </Layout>
    </Layout>
  </Layout>
</template>
<script>
export default {
  data() {
    return {
      menuitemActive: this.$route.path,
      isCollapsed: false
    };
  },
  computed: {
    menuitemClasses: function() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  },
  methods: {
    menuitemSelect(name) {
      this.$router.push({ path: name });
    }
  }
};
</script>
<style scoped>
.logo {
  color: #fff;
  font-size: 20px;
  font-weight: 600;
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