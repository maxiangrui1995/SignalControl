<template>
    <div>
        <Card :style="{'width':'300px','position':'absolute','top':'20px','left':'20px'}" :padding="0">
            <p slot="title">绿波带</p>
            <Table :columns="columns" :data="data" :showHeader="false"></Table>
            <Page :current="page" :total="total" :page-size="rows" simple :style="{'margin':'10px','text-align':'right'}"></Page>
        </Card>
    </div>
</template>

<script>
import { getGreenBelt } from "@/api";
export default {
  data() {
    return {
      columns: [
        {
          title: "名称",
          key: "name",
          render: (h, params) => {
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
                h("Tag", params.row.name),
                h(
                  "div",
                  {
                    slot: "content"
                  },
                  [
                    h("div", "公共周期：" + params.row.period),
                    h("div", "协调方向：" + params.row.coordinate_direction),
                    h("div", "绿波类型：" + params.row.type),
                    h("div", "时间范围：" + params.row.mon_day_end)
                  ]
                )
              ]
            );
          }
        },
        {
          title: "操作",
          key: "active",
          width: 80,
          align: "center",
          render: (h, params) => {
            return h(
              "Dropdown",
              {
                props: {}
              },
              [
                h("Icon", { props: { type: "ios-more" } }),
                h(
                  "DropdownMenu",
                  {
                    slot: "list"
                  },
                  [
                    h("DropdownItem", "详情"),
                    h("DropdownItem", "编辑"),
                    h("DropdownItem", "删除")
                  ]
                )
              ]
            );
          }
        }
      ],
      data: [],
      page: 1,
      rows: 5,
      total: 0
    };
  },
  methods: {
    loadData() {
      getGreenBelt({
        page: this.page,
        rows: this.rows
      }).then(res => {
        this.data = res.data.list;
        this.total = ~~res.data.total;
      });
    }
  },
  created() {
    this.loadData();
  }
};
</script>

<style>

</style>
