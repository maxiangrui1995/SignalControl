<template>
  <div style="padding:20px;">
    <Card dis-hover :bordered="false">
      <Button type="primary" @click="createData" :style="{'margin-bottom':'10px'}">
        <Icon type="plus"></Icon>
        新增</Button>
      <Table :columns="columns" :data="data" :loading="loading" class="ivu-table-noborder"></Table>
      <Page show-sizer show-elevator :current="page" :total="total" :page-size="rows" @on-page-size-change="pageSizeChange" @on-change="pageChange" :style="{'margin':'10px','text-align':'right'}"></Page>
    </Card>
  </div>
</template>

<script>
import { dataList, dataDelete, dataInit } from "@/api/d_plan";
export default {
  name: "planList",
  data() {
    return {
      // page
      page: 1,
      rows: 10,
      total: 100,
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
              `${params.row.phase_count}阶段${params.row.light_count}相位`
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
    pageChange(page) {
      this.page = page;
      this.loadData();
    },
    pageSizeChange(rows) {
      this.rows = rows;
      this.loadData();
    },
    pathToDetails(id) {
      this.$router.push({
        path: "/planList/" + id
      });
    },
    loadData() {
      this.loading = true;
      dataList({ page: this.page, rows: this.rows }).then(res => {
        if (res.status === "1") {
          this.data = res.data.list;
          this.total = ~~res.data.total;
        }
        this.loading = false;
      });
    },
    removeData(id) {
      this.$Modal.confirm({
        content: "<p>确定删除？删除后无法恢复！</p>",
        loading: true,
        onOk: () => {
          dataDelete({ id: id }).then(res => {
            if (res.status) {
              this.$Message.success("删除成功");
            } else {
              this.$Message.error("删除失败");
            }
            this.$Modal.remove();
            this.loadData();
          });
        }
      });
    },
    createData() {
      let newValue = "";
      let self = this;
      this.$Modal.confirm({
        render: h => {
          return h("Input", {
            props: {
              value: newValue,
              autofocus: true,
              placeholder: "请输入新的方案名称..."
            },
            on: {
              input: val => {
                newValue = val;
              }
            }
          });
        },
        loading: true,
        onOk() {
          dataInit({
            name: newValue
          }).then(res => {
            if (res.status) {
              this.$Message.success("添加成功");
            } else {
              this.$Message.error("添加失败");
            }
            self.$Modal.remove();
            self.loadData();
          });
        }
      });
    }
  },
  created() {
    this.loadData();
  }
};
</script>

<style>
</style>
