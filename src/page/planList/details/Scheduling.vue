<template>
    <div>
        <Button type="primary" icon="plus" @click="createData" :style="{'margin-bottom':'10px'}">新增</Button>
        <Table :columns="columns" :data="data" :loading="loading"></Table>
        <Page :total="total" @on-change="pageChange" :style="{'margin-top':'10px','text-align':'right'}"></Page>
    </div>
</template>

<script>
const week = {
  sunday: "周日",
  monday: "周一",
  tuesday: "周二",
  wednesday: "周三",
  thursday: "周四",
  friday: "周五",
  saturday: "周六"
};

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
          title: "日期类型",
          key: "datetype",
          width: 180
        },
        {
          title: "功能",
          key: "func_num",
          width: 180
        },
        {
          title: "日期范围",
          key: "custom_date"
        },
        {
          title: "开始时间",
          key: "custom_time",
          width: 180
        },
        {
          title: "方案",
          key: "patternid",
          width: 180
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
      total: 1,
      id: this.$route.params.id,
      loading: false
    };
  },
  methods: {
    createData() {},
    pageChange(page) {
      this.page = page;
    }
  }
};
</script>

<style>
</style>
