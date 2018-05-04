<template>
    <Table :columns="columns" :data="data"></Table>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          title: "阶段号",
          key: "a"
        },
        {
          title: "车道1",
          key: "b"
        },
        {
          title: "车道2",
          key: "c"
        },
        {
          title: "车道3",
          key: "d"
        },
        {
          title: "车道4",
          key: "e"
        },
        {
          title: "车道5",
          key: "e"
        },
        {
          title: "车道6",
          key: "e"
        },
        {
          title: "车道7",
          key: "e"
        },
        {
          title: "车道8",
          key: "e"
        },
        {
          title: "最小绿",
          key: "e"
        },
        {
          title: "最大绿",
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
              )
            ]);
          }
        }
      ],
      data: [{ a: "阶段1", b: "1", c: "1", d: "1", e: "1" }],
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
