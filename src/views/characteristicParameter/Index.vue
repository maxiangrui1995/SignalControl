<template>
  <div class="wrapper">
    <Table :columns="columns" :data="data" :loading="loading"></Table>
  </div>
</template>

<script>
import { dataList } from "@/api/d_plan";
export default {
  name: "characteristicParameter",
  data() {
    return {
      // page
      page: 1,
      rows: 10,
      total: 0,
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
      loading: false
    };
  },
  methods: {
    // 加载数据
    loadData() {
      this.loading = true;
      dataList({
        page: this.page,
        rows: this.rows
      }).then(res => {
        this.data = res.data.list;
        this.total = ~~res.data.total;
        this.loading = false;
      });
    }
  },
  created() {
    this.loadData();
  }
};
</script>

<style scoped lang='less'>
.wrapper {
  margin: 20px;
}
</style>
