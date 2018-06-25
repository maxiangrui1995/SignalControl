<template>
  <Layout>
    <Header :style="{background: '#fff', padding: '0 20px', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
      <Breadcrumb :style="{display: 'inline-block'}">
        <BreadcrumbItem to="/region">区域管理</BreadcrumbItem>
        <BreadcrumbItem>{{name}}</BreadcrumbItem>
      </Breadcrumb>
      <div style="float:right;">
        <Button type="primary">
          <Icon type="plus" :style="{marginRight:'10px'}"></Icon>新增
        </Button>
        <i-input icon="ios-search" placeholder="请输入名称进行检索" style="width: 200px"></i-input>
      </div>
    </Header>
    <Content :style="{padding: '20px'}">
      <Table highlight-row :show-header="false" :columns="columns" :data="data" :loading="loading"></Table>
    </Content>
  </Layout>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      loading: false,
      columns: [
        {
          title: "name",
          key: "name"
        },
        {
          title: "操作",
          key: "action",
          align: "right",
          width: 200,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.viewMore(params.row);
                    }
                  }
                },
                [h("a", "详情")]
              ),
              h("em", { class: ["item-split"] }),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.modifyData(params.row);
                    }
                  }
                },
                [h("a", "编辑")]
              ),
              h("em", { class: ["item-split"] }),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.removeData(params.row);
                    }
                  }
                },
                [h("a", "删除")]
              )
            ]);
          }
        }
      ],
      id1: this.$route.params.id1,
      name: ""
    };
  },
  methods: {
    // 请求数据
    fetchCrossing() {
      this.loading = true;
      this.$store.dispatch("setCrossing");
    },
    // 过滤数据
    formatterCrossing(data) {
      data.forEach(item => {
        if (item.id == this.id1 && item.children) {
          this.data = item.children;
          this.name = item.name;
        }
      });
      this.loading = false;
    },
    // 详情
    viewMore(row) {
      this.resetScrollbarPosition();
      this.$router.push({
        path: "/region/" + this.id1 + "/" + row.id
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
