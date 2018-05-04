<template>
    <div>
        <Button type="primary" icon="plus" :style="{'margin-bottom':'20px'}">新增</Button>
        <Table :columns="columns" :data="data"></Table>
        <Page :total="total" show-elevator @on-change="loadData"></Page>
    </div>
</template>

<script>
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
          key: "a"
        },
        {
          title: "功能",
          key: "b"
        },
        {
          title: "日期范围",
          key: "c"
        },
        {
          title: "开始时间",
          key: "d"
        },
        {
          title: "方案",
          key: "e"
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
                  class: {
                    "dh-btn": true
                  },
                  on: {
                    click: () => {}
                  }
                },
                "编辑"
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
      data: [{ a: "类型1", b: "功能", c: "范围", d: "开始", e: "方案一" }],
      page: 1,
      rows: 10,
      total: 1
    };
  },
  methods: {
    loadData() {},
    removeData() {
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
    }
  }
};
</script>

<style>

</style>
