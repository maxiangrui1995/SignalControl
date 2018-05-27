<template>
    <div>
        <div style="position:absolute;top:20px;left:20px;width:300px;">
            <Card :bordered="false" :padding="10">
                <p slot="title">绿波带</p>
                <a href="javascript:;" slot="extra" @click.prevent="createData">
                    <Icon type="plus"></Icon>
                    新增
                </a>
                <Table :columns="columns" :data="data" :showHeader="false" :loading="loading"></Table>
                <Page :current="page" :total="total" :page-size="rows" simple @on-change="pageChange" :style="{'margin':'10px','text-align':'right'}"></Page>
            </Card>
        </div>
    </div>
</template>

<script>
export default {
  name: "greenBelt",
  data() {
    return {
      // page
      rows: 5,
      page: 1,
      total: 0,
      // table
      loading: false,
      columns: [
        {
          key: "name",
          title: "name",
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
                      { style: { "margin-bottom": "10px" } },
                      "公共周期：" + row.period
                    ),
                    h(
                      "div",
                      { style: { "margin-bottom": "10px" } },
                      "协调方向：" + row.coordinate_direction
                    ),
                    h(
                      "div",
                      { style: { "margin-bottom": "10px" } },
                      "绿波类型：" + row.type
                    ),
                    h(
                      "div",
                      "时间范围：" + row.mon_day_start + " - " + row.mon_day_end
                    )
                  ]
                )
              ]
            );
          }
        },
        {
          title: "active",
          key: "active",
          width: 80,
          align: "center",
          render: (h, params) => {
            return h(
              "Dropdown",
              {
                on: {
                  "on-click": name => {
                    switch (true) {
                      case name === "details":
                        this.linkToDetails(params.row);
                        break;
                      case name === "modify":
                        this.modifyData(params.row);
                        break;
                      case name === "remove":
                        this.removeData(params.row.id);
                        break;
                      default:
                        break;
                    }
                  }
                }
              },
              [
                h("Icon", { props: { type: "ios-more", size: 20 } }),
                h(
                  "DropdownMenu",
                  {
                    slot: "list"
                  },
                  [
                    h("DropdownItem", { props: { name: "details" } }, "详情"),
                    h("DropdownItem", { props: { name: "modify" } }, "编辑"),
                    h("DropdownItem", { props: { name: "remove" } }, "删除")
                  ]
                )
              ]
            );
          }
        }
      ],
      data: [{ name: "绿波带1" }, { name: "绿波带2" }]
    };
  },
  methods: {
    pageChange(page) {
      this.page = page;
    }
  }
};
</script>

<style>
</style>
