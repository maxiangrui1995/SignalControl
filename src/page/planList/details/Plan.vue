<template>
    <div>
        <Button type="primary" icon="plus" :style="{'margin-bottom':'10px'}">新增</Button>
        <Table :columns="columns" :data="data" :loading="loading"></Table>
        <Page :total="total" @on-change="pageChange" :style="{'margin-top':'10px','text-align':'right'}"></Page>
    </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          title: "方案名称",
          key: "patternid",
          render: (h, params) => {
            return h("div", `方案${~~params.row.patternid + 1}`);
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
      data: [{ name: "0" }],
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
    }
  }
};
</script>

<style scoped>
</style>
