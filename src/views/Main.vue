<template>
    <div class="main">
        <Layout>
            <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
                    <i-menu-item name="1-1">
                        <Icon type="ios-navigate"></Icon>
                        <span>Option 1</span>
                    </i-menu-item>
                    <i-menu-item name="1-2">
                        <Icon type="search"></Icon>
                        <span>Option 2</span>
                    </i-menu-item>
                    <i-menu-item name="1-3">
                        <Icon type="settings"></Icon>
                        <span>Option 3</span>
                    </i-menu-item>
                </Menu>
            </Sider>
            <Layout>
                <Header :style="{padding: 0}" class="layout-header-bar">
                    <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '20px 20px 0'}" type="navicon-round" size="24"></Icon>
                </Header>
                <Content :style="{margin: '20px', background: '#fff', minHeight: '260px'}">
                    Content
                </Content>
            </Layout>
        </Layout>
    </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapsed: false
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
      this.$refs.side1.toggleCollapse();
    }
  }
};
</script>

<style lang="less">
@import "./main.less";
</style>
