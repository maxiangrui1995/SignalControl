<template>
    <div>
        <div class="dh-toolbar">
            <Button type="primary" icon="plus">新增</Button>
        </div>
        <Table :columns="columns" :data="data"></Table>
        <Page :total="total" show-elevator @on-change="loadData"></Page>
    </div>
</template>

<script>
import { getPlanList } from "@/api";
export default {
  data() {
    return {
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
            return h(
              "router-link",
              {
                props: {
                  to: "/characteristicParameter/" + params.row.id
                }
              },
              params.row.name
            );
          }
        },
        {
          title: "类型",
          key: "type",
          render: (h, params) => {
            let d = params.row;
            return h("Tag", `${d.phase_count}阶段${d.light_count}相位`);
          }
        },
        {
          title: "Action",
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
                  class: {
                    "dh-btn": true
                  },
                  on: {
                    click: () => {
                      this.pathToDetails(params.row.id);
                    }
                  }
                },
                "详情"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  class: {
                    "dh-btn": true
                  },
                  on: {
                    click: () => {
                      this.removeData(params.row.id);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data: [],
      page: 1,
      rows: 10,
      total: 0
    };
  },
  methods: {
    /* 详情 */
    pathToDetails(id) {
      this.$router.push({
        path: "/characteristicParameter/" + id
      });
    },
    /* 删除 */
    removeData(id) {
      this.$Modal.confirm({
        content: "<p>The dialog box will be closed after 2 seconds</p>",
        loading: true,
        onOk: () => {
          setTimeout(() => {
            this.$Modal.remove();
            this.$Message.info("Asynchronously close the dialog box");
          }, 2000);
        }
      });
    },
    /* 加载数据 */
    loadData(page) {
      page ? (this.page = page) : "";
      getPlanList({ page: this.page, rows: this.rows }).then(res => {
        this.data = res.data.list;
        this.total = ~~res.data.total;
      });
    }
  },
  created() {
    this.$nextTick(() => {
      this.loadData();
    });
  }
};
</script>

<style>

</style>
