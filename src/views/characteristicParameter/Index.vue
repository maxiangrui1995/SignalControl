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
import { getPlanList } from "@/api";
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
              `${params.row.min_green_down}阶段${params.row.min_green_up}相位`
            );
          }
        },
        {
          title: "最大绿范围",
          key: "max_green_range",
          render: (h, params) => {
            return h(
              "div",
              `${params.row.max_green_down}阶段${params.row.max_green_up}相位`
            );
          }
        },
        {
          title: "绿延伸范围",
          key: "extends",
          render: (h, params) => {
            return h(
              "div",
              `${params.row.extends_down}阶段${params.row.extends_up}相位`
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
      total: 0,
      loading: false
    };
  },
  methods: {
    createData() {
      this.$Modal.confirm({
        render: h => {
          return h("Input", {
            props: {
              value: this.value,
              autofocus: true,
              placeholder: "请输入新增特征参数名称..."
            },
            on: {
              input: val => {
                this.value = val;
              }
            }
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
          setTimeout(() => {
            this.$Modal.remove();
            this.$Message.info("Asynchronously close the dialog box");
          }, 2000);
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
