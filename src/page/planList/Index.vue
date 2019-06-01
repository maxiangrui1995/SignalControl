<template>
  <Layout>
    <Header :style="{background: '#fff', padding: '0 20px', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
      <Breadcrumb :style="{display: 'inline-block'}">
        <BreadcrumbItem>特征参数</BreadcrumbItem>
      </Breadcrumb>
      <div style="float:right;">
        <Button type="primary" @click="createData">
          <Icon type="plus" :style="{marginRight:'10px'}"></Icon>新增
        </Button>
        <i-input icon="ios-search" placeholder="请输入名称进行检索" style="width: 200px"></i-input>
      </div>
    </Header>
    <Content :style="{padding: '20px'}">
      <Table highlight-row :columns="columns" :data="data" :loading="loading"></Table>
      <Page show-sizer show-elevator show-total :current="page" :total="total" :page-size="rows" @on-page-size-change="pageSizeChange" @on-change="pageChange" v-if="show" :style="{'margin':'10px','text-align':'right'}"></Page>
    </Content>
  </Layout>
</template>

<script>
export default {
  data() {
    return {
      // page
      page: 1,
      rows: 10,
      total: 0,
      show: false,
      // tabs
      columns: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "方案名称",
          key: "name"
        },
        {
          title: "阶段数",
          key: "light_count"
        },
        {
          title: "相位数",
          key: "phase_count"
        },
        {
          title: "相位差",
          key: "phase_difference"
        },
        {
          title: "脉冲倒计时",
          key: "mc_countdown"
        },
        {
          title: "脉宽",
          key: "mc_width"
        },
        {
          title: "时间间隔",
          key: "time_interval"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 120,
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
      data: [],
      loading: false
    };
  },
  methods: {
    // 切换分页
    pageChange(page) {
      this.page = page;
      this.fetchPlanList();
      this.resetScrollbarPosition();
    },
    // 切换页码
    pageSizeChange(rows) {
      if (this.rows !== rows) {
        this.rows = rows;
        this.fetchPlanList();
        this.resetScrollbarPosition();
      }
    },
    // 请求方案数据
    fetchPlanList() {
      this.loading = true;
      this.$http("index/d_plan/dataList", {
        page: this.page,
        rows: this.rows
      }).then(res => {
        let data = res.data;
        if (res.status === "1") {
          this.data = data.list;
          this.total = ~~data.total;
        }
        this.loading = false;
      });
    },
    viewMore(row) {
      this.resetScrollbarPosition();
      this.$router.push({
        path: "/planList/" + row.id
      });
    },
    removeData(row) {
      this.$Modal.confirm({
        content: "<h3>确定删除？删除后无法恢复！</h3>",
        loading: true,
        onOk: () => {
          /* dataDelete({ id: id }).then(res => {
            if (res.status) {
              this.$Message.success("删除成功");
            } else {
              this.$Message.error("删除失败");
            }
            this.$Modal.remove();
            this.loadData();
          }); */
        }
      });
    },
    createData() {}
  },
  created() {
    this.fetchPlanList();
  },
  watch: {
    total() {
      this.show = this.total > 0 ? true : false;
    }
  }
};
</script>
