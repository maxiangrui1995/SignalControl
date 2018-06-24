<template>
    <Layout>
        <Header :style="{background: '#fff', padding: '0 20px', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
            <Breadcrumb :style="{display: 'inline-block'}">
                <BreadcrumbItem to="/region">区域管理</BreadcrumbItem>
                <BreadcrumbItem :to="'/region/'+id1">{{name1}}</BreadcrumbItem>
                <BreadcrumbItem>{{name2}}</BreadcrumbItem>
            </Breadcrumb>
            <div style="float:right;">
                <Button type="primary">
                    <Icon type="plus" :style="{marginRight:'10px'}"></Icon>新增
                </Button>
                <i-input icon="ios-search" placeholder="请输入名称进行检索" style="width: 200px"></i-input>
            </div>
        </Header>
        <Content :style="{padding: '20px'}">
            <Row :gutter="16">
                <i-col :xs="24" :sm="12" :md="6" :lg="4" v-for="item in data" :key="item.id" :style="{'margin-bottom':'10px'}">
                    <Card>
                        <div slot="title">
                            {{item.name}}
                        </div>
                        <div slot="extra">
                            <Tooltip content="在地图上查看" :style="{ position: 'relative', top: '-2px', cursor: 'pointer'}">
                                <a href="javascript:;" @click="viewCrossingInMap(item)">
                                    <Icon type="map"></Icon>
                                </a>
                            </Tooltip>
                        </div>
                        <div>
                            <img src="https://i.loli.net/2017/08/21/599a521472424.jpg" alt="" style="width:100%;display:block">
                        </div>
                    </Card>
                </i-col>
            </Row>
        </Content>
    </Layout>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      loading: false,
      id1: this.$route.params.id1,
      id2: this.$route.params.id2,
      name1: "",
      name2: ""
    };
  },
  methods: {
    // 请求方案数据
    fetchCrossing() {
      this.loading = true;
      this.$store.dispatch("setCrossing");
    },
    // 过滤数据
    formatterCrossing(data) {
      data.forEach(item => {
        if (item.id == this.id1 && item.children) {
          this.name1 = item.name;
          item.children.forEach(item => {
            if (item.id == this.id2 && item.children) {
              this.data = item.children;
              this.name2 = item.name;
            }
          });
        }
      });
      this.loading = false;
    },
    // 详情
    viewMore(row) {
      this.$router.push({
        path: "/region/" + row.id + "/" + row.id
      });
    },
    // 在地图上查看路口
    viewCrossingInMap(row) {
      this.$router.push({
        path: "/region/" + this.id1 + "/" + this.id2 + "/" + row.id + "/map"
      });
    }
  },
  created() {
    if (!this.crossing.length) {
      this.fetchCrossing();
    } else {
      this.formatterCrossing(this.crossing);
    }
  },
  computed: {
    crossing() {
      let data = this.$store.state.crossing;
      return data;
    }
  },
  watch: {
    crossing(data) {
      this.formatterCrossing(data);
    }
  }
};
</script>

<style>
</style>
