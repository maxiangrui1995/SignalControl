<template>
    <div class="card">
        <div class="card-header">
          <div class="card-title">
            <h3>特征参数</h3>
            <Tooltip content="信号机方案" :style="{height:'16px',lineHeight:'16px',marginRight:'10px',cursor:'pointer'}">
              <Icon type="information-circled"></Icon>
            </Tooltip>
            <span>共<i style="color:#ff9900">108</i>条</span>
          </div>
          <div class="card-extra">
              <Button type="primary" @click="createData">
                <Icon type="plus" :style="{marginRight:'10px'}"></Icon>新增
              </Button>
              <i-input  icon="ios-search" placeholder="请输入方案名称进行检索" style="width: 200px"></i-input>
          </div>
        </div>
        <div style="padding:20px">
           <Table border :columns="columns" :data="data" :loading="loading"></Table>
            <Page show-sizer show-elevator show-total :current="page" :total="total" :page-size="rows" @on-page-size-change="pageSizeChange" @on-change="pageChange" v-if="showPage" :style="{'margin':'10px','text-align':'right'}"></Page>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      // page
      page: 1,
      rows: 10,
      total: 0,
      showPage: false,
      // tabs
      columns: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "方案名称",
          key: "name",
          render: (h, params) => {
            let row = params.row;
            let style = { "margin-bottom": "6px" };
            return h(
              "Poptip",
              {
                props: {
                  trigger: "hover",
                  title: "详细信息",
                  placement: "right"
                }
              },
              [
                h("Tag", row.name),
                h(
                  "div",
                  {
                    slot: "content"
                  },
                  [
                    h(
                      "div",
                      {
                        style: style
                      },
                      "最小绿范围：" +
                        `${row.min_green_down} - ${row.min_green_up}`
                    ),
                    h(
                      "div",
                      {
                        style: style
                      },
                      "最大绿范围：" +
                        `${row.max_green_down} - ${row.max_green_up}`
                    ),
                    h(
                      "div",
                      "绿延伸范围：" + `${row.extends_down} - ${row.extends_up}`
                    )
                  ]
                )
              ]
            );
          }
        },
        {
          title: "类型",
          key: "type",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              `${params.row.light_count}阶段${params.row.phase_count}相位`
            );
          }
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
                      this.pathToDetails(params.row.id);
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
                      this.removeData(params.row.id);
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
    pageChange(page) {},
    pageSizeChange(rows) {},
    pathToDetails(id) {},
    loadData() {
      this.loading = true;
      this.$http.post("index/d_plan/dataList").then(res => {
        let data = res.data;
        if (data.status === "1") {
          this.data = data.data.list;
          this.total = ~~data.data.total;
        }
        this.loading = false;
      });
      /*dataList({ page: this.page, rows: this.rows }).then(res => {
        if (res.status === "1") {
          this.data = res.data.list;
          this.total = ~~res.data.total;
        }
        this.loading = false;
      }); */
    },
    removeData(id) {},
    createData() {}
  },
  created() {
    this.loadData();
  },
  watch: {
    total() {
      this.showPage = this.total > 0 ? true : false;
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