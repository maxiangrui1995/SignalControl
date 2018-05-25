<template>
  <div class="dh-table-wrapper">
    <div class="dh-table-wrapper-header">
      <Breadcrumb>
        <BreadcrumbItem>特征参数</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="dh-table-wrapper-toolbar">
      <Button type="primary" icon="plus" @click="createData">新增</Button>
    </div>
    <Table :columns="columns" :data="data" :loading="loading"></Table>
    <div class="dh-table-wrapper-page">
      <Page :total="total" show-elevator show-sizer show-total @on-change="pageChange" @on-page-size-change="sizeChange"></Page>
    </div>
  </div>
</template>

<script>
import { getPlanList, createPlanList, removePlanList } from "@/api";
export default {
  name: "characteristicParameter",
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
          key: "name"
        },
        {
          title: "类型",
          key: "type",
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
          title: "最小绿范围",
          key: "min_green_range",
          render: (h, params) => {
            return h(
              "div",
              `${params.row.min_green_down}-${params.row.min_green_up}`
            );
          }
        },
        {
          title: "最大绿范围",
          key: "max_green_range",
          render: (h, params) => {
            return h(
              "div",
              `${params.row.max_green_down}-${params.row.max_green_up}`
            );
          }
        },
        {
          title: "绿延伸范围",
          key: "extends",
          render: (h, params) => {
            return h(
              "div",
              `${params.row.extends_down}-${params.row.extends_up}`
            );
          }
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
      page: 1,
      rows: 10,
      total: 0,
      loading: false
    };
  },
  methods: {
    createData() {
      let newValue = "";
      this.$Modal.confirm({
        render: h => {
          return h("Input", {
            props: {
              value: newValue,
              autofocus: true,
              placeholder: "请输入新的特征参数名称..."
            },
            on: {
              input: val => {
                newValue = val;
              }
            }
          });
        },
        loading: true,
        onOk: () => {
          createPlanList({ name: newValue }).then(res => {
            if (res.status) {
              this.$Message.success("添加成功");
            } else {
              this.$Message.error("添加失败");
            }
            this.$Modal.remove();
            this.loadData();
          });
        }
      });
    },
    pathToDetails(id) {
      this.$router.push({
        path: "/characteristicParameter/" + id
      });
    },
    removeData(id) {
      this.$Modal.confirm({
        content: "<p>确定删除？删除后无法恢复！</p>",
        loading: true,
        onOk: () => {
          removePlanList({ id: id }).then(res => {
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
    loadData() {
      this.loading = true;
      getPlanList({ page: this.page, rows: this.rows }).then(res => {
        this.data = res.data.list;
        this.total = ~~res.data.total;
        this.loading = false;
      });
    },
    pageChange(page) {
      this.page = page;
      this.loadData();
    },
    sizeChange(size) {
      this.rows = size;
      this.loadData();
    }
  },
  created() {
    this.loadData();
  }
};
</script>

<style>
</style>
