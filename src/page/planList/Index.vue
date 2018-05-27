<template>
  <div class="wrapper">
    <Button type="primary" :style="{'margin-bottom':'10px'}">
      <Icon type="plus"></Icon>
      新增</Button>
    <Table :columns="columns" :data="data" :loading="loading"></Table>
    <Page :current="page" :total="total" :page-size="rows" @on-change="pageChange" :style="{'margin':'10px','text-align':'right'}"></Page>
  </div>
</template>

<script>
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
                        style: {
                          "margin-bottom": "6px"
                        }
                      },
                      "最小绿范围：" +
                        `${row.min_green_down}-${row.min_green_up}`
                    ),
                    h(
                      "div",
                      {
                        style: {
                          "margin-bottom": "6px"
                        }
                      },
                      "最大绿范围：" +
                        `${row.max_green_down}-${row.max_green_up}`
                    ),
                    h(
                      "div",
                      "绿延伸范围：" + `${row.extends_down}-${row.extends_up}`
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
      data: [{ name: 1, id: 1 }, { name: 2, id: 2 }],
      loading: false
    };
  },
  methods: {
    pageChange(page) {
      this.page = page;
    },
    pathToDetails(id) {
      this.$router.push({
        path: "/planList/" + id
      });
    }
  }
};
</script>

<style>
</style>
