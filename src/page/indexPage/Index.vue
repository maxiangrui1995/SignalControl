<template>
  <Layout :style="{height:'100%'}">
    <Header :style="{padding: '0 10px','box-shadow':'0 1px 4px rgba(0,21,41,.08)','z-index':'1'}">
      <div class="logo">{{logo}}</div>
      <div class="tools">
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
      <Content :style="{position:'relative'}" ref="app">
         <vue-scrollbar style="width:100%;height:100%;">
          <router-view/>
        </vue-scrollbar>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
/* 滚动条 */
import VueScrollbar from "vue2-scrollbar";
export default {
  components: { VueScrollbar },
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
  }
};
</script>

<style lang="less" scoped>
.logo {
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  float: left;
  cursor: pointer;
}
.tools {
  float: right;
}
.avatar-wrapper {
  text-align: center;
  color: #fff;
  padding: 20px 0 6px;
  &-content {
    height: 40px;
    line-height: 40px;
    &:after {
      display: block;
      content: "";
      width: 100%;
      height: 1px;
      background: linear-gradient(
        to right,
        rgba(0, 0, 0, 0.1) 16%,
        fade(#49bdbd, 60%) 56%,
        rgba(0, 0, 0, 0.1) 90%
      );
    }
    .title {
      color: #49bdbd;
    }
  }
}
</style>