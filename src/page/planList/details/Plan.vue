<template>
  <div>
    <Button type="primary" icon="plus" :style="{'margin-bottom':'10px'}">新增</Button>
    <Table :columns="columns" :data="data" :loading="loading"></Table>
    <Page :total="total" @on-change="pageChange" :style="{'margin-top':'10px','text-align':'right'}"></Page>
  </div>
</template>

<script>
import { dataList, dataDelete, dataUpdate } from "@/api/d_pattern";
export default {
  data() {
    return {
      columns: [
        {
          title: "方案名称",
          key: "patternid",
          render: (h, params) => {
            let row = params.row;
            let step = [];
            for (let i = 1; i <= row.step; i++) {
              step.push({
                phase: row["phase" + i],
                time: row["time" + i]
              });
            }
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
                h("Tag", `方案${~~row.patternid + 1}`),
                h(
                  "div",
                  {
                    slot: "content"
                  },
                  [
                    step.map((item, index) => {
                      return h(
                        "div",
                        { style: { "margin-bottom": "10px" } },
                        `步号${index + 1} - 阶段：${~~item.phase + 1} - 时长：${
                          item.time
                        }`
                      );
                    })
                  ]
                )
              ]
            );
          }
        },
        {
          title: "总步数",
          key: "step"
        },
        {
          title: "间隔",
          key: "time_interval"
        },
        {
          title: "周期",
          key: "period"
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
                    click: event => {
                      event.stopPropagation();
                      this.modifyData(params.row);
                    }
                  }
                },
                [h("a", "编辑")]
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: event => {
                      event.stopPropagation();
                      this.removeData(params.row.id, params.index);
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
      id: this.$route.params.id,
      loading: false,
      total: 0,
      page: 1,
      rows: 10
    };
  },
  methods: {
    pageChange(page) {
      this.page = page;
      this.loadData();
    },
    loadData() {
      this.loading = true;
      dataList({ plan_id: this.id, page: this.page, rows: this.rows }).then(
        res => {
          if (res.status) {
            this.data = res.data.list;
            this.total = ~~res.data.total;
            this.loading = false;
          }
        }
      );
    },
    removeData(id, index) {
      // 删除必须从最后一条记录开始
      if ((this.page - 1) * this.rows + index + 1 !== this.total) {
        this.$Modal.warning({
          content: "<p>删除必须从最后一条记录开始!</p>"
        });
      } else {
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
      }
    },
    modifyData(row){
      
    }
  },
  created() {
    this.loadData();
  }
};
</script>

<style scoped>
</style>
