<template>
  <div class="card">
    <div class="card-header">
      <div class="card-title">
        <h3>特征参数</h3>
        <Tooltip content="信号机预方案" :style="{height:'16px',lineHeight:'16px',marginRight:'10px',cursor:'pointer'}">
          <Icon type="information-circled"></Icon>
        </Tooltip>
        <span v-if="show">共
          <i class="warning">{{total}}</i> 条</span>
      </div>
      <div class="card-extra">
        <Button type="primary" @click="createData">
          <Icon type="plus" :style="{marginRight:'10px'}"></Icon>新增
        </Button>
        <i-input icon="ios-search" placeholder="请输入方案名称进行检索" style="width: 200px"></i-input>
      </div>
    </div>
    <div style="padding:20px">
      <Table border highlight-row :columns="columns" :data="data" :loading="loading"></Table>
      <Page show-sizer show-elevator :current="page" :total="total" :page-size="rows" @on-page-size-change="pageSizeChange" @on-change="pageChange" v-if="show" :style="{'margin':'10px','text-align':'right'}"></Page>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // page
      page: 1,
      rows: 20,
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
      this.scrollbarPosition();
    },
    // 切换页码
    pageSizeChange(rows) {
      this.rows = rows;
      this.fetchPlanList();
      this.scrollbarPosition();
    },
    // 滚动条位置复原
    scrollbarPosition() {
      document.getElementById(
        "home-scrollbar"
      ).childNodes[0].style.marginTop = 0;
    },
    // 请求方案数据
    fetchPlanList() {
      this.loading = true;
      this.$http
        .post("index/d_plan/dataList", {
          page: this.page,
          rows: this.rows
        })
        .then(res => {
          let data = res.data;
          if (data.status === "1") {
            this.data = data.data.list;
            this.total = ~~data.data.total;
          }
          this.loading = false;
        });
    },
    viewMore(row) {},
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

<style scoped lang="less">
.card {
  &-header {
    padding: 0 20px;
    background: #fff;
    border-bottom: 1px solid #e8e8e8;
    height: 64px;
    line-height: 64px;
  }
  &-title {
    float: left;
    h3 {
      display: inline-block;
      margin-right: 10px;
    }
  }
  &-extra {
    float: right;
  }
}
</style>