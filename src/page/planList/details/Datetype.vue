<template>
  <div>
    <Table :columns="columns" :data="data" :border="true" :loading="loading" class="ivu-table-dishover"></Table>
    <Button type="primary" :loading="loading" @click="handleSubmit" :style="{'margin-top':'10px'}">确定</Button>
  </div>
</template>

<script>
import { dataList, dataUpdateList } from "@/api/d_week";
export default {
  data() {
    return {
      columns: [
        {
          title: "日期类型",
          key: "num",
          align: "center",
          render: (h, params) => {
            return h("div", `类型${params.row.num}`);
          }
        },
        {
          title: "周日",
          key: "sunday",
          align: "center",
          render: (h, params) => {
            return this.tdRender(h, params, "sunday");
          }
        },
        {
          title: "周一",
          key: "monday",
          align: "center",
          render: (h, params) => {
            return this.tdRender(h, params, "monday");
          }
        },
        {
          title: "周二",
          key: "tuesday",
          align: "center",
          render: (h, params) => {
            return this.tdRender(h, params, "tuesday");
          }
        },
        {
          title: "周三",
          key: "wednesday",
          align: "center",
          render: (h, params) => {
            return this.tdRender(h, params, "wednesday");
          }
        },
        {
          title: "周四",
          key: "thursday",
          align: "center",
          render: (h, params) => {
            return this.tdRender(h, params, "thursday");
          }
        },
        {
          title: "周五",
          key: "friday",
          align: "center",
          render: (h, params) => {
            return this.tdRender(h, params, "friday");
          }
        },
        {
          title: "周六",
          key: "saturday",
          align: "center",
          render: (h, params) => {
            return this.tdRender(h, params, "saturday");
          }
        }
      ],
      id: this.$route.params.id,
      data: [],
      loading: false
    };
  },
  methods: {
    tdRender(h, params, type) {
      return h(
        "div",
        {
          style: {
            width: "100%",
            height: "48px",
            "line-height": "48px"
          },
          on: {
            click: () => {
              params.row[type] = params.row[type] === "1" ? "0" : "1";
              this.data[params.index][type] =
                this.data[params.index][type] === "1" ? "0" : "1";
            }
          }
        },
        [
          h("Icon", {
            props: {
              type: "checkmark",
              color: params.row[type] === "1" ? "" : "#ccc"
            }
          })
        ]
      );
    },
    loadData() {
      this.loading = true;
      dataList({ plan_id: this.id, page: 1, rows: 10 }).then(res => {
        if (res.status) {
          this.data = res.data.list;
          this.loading = false;
        }
      });
    },
    handleSubmit() {
      dataUpdateList({
        data: this.data
      }).then(res => {
        if (res.status) {
          this.$Message.success("操作成功");
        } else {
          this.$Message.error("操作失败");
        }
        this.loadData();
      });
    }
  },
  created() {
    this.loadData();
  }
};
</script>

<style scoped>
</style>
