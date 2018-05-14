<template>
    <div>
        <Button type="primary" icon="plus" :style="{'margin-bottom':'20px'}">新增</Button>
        <Table :columns="columns" :data="data" :loading="loading"></Table>
        <Page :total="total" @on-change="pageChange" :style="{'margin-top':'20px','text-align':'right'}"></Page>
    </div>
</template>

<script>
import { getPattern } from "@/api";
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
                      this.modifyData(params.row.id, params.row.name);
                    }
                  }
                },
                "修改"
              ),
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
      id: this.$route.params.id,
      loading: false,
      total: 0,
      page: 1,
      rows: 10
    };
  },
  methods: {
    loadData(page) {
      this.loading = true;
      getPattern({
        plan_id: this.id,
        page: this.page,
        rows: this.rows
      }).then(res => {
        console.log(res);
        this.data = res.data.list;
        this.total = ~~res.data.total;
        this.loading = false;
      });
    },
    pageChange(page) {
      this.page = page;
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
