<template>
  <div>
    <div style="position:absolute;top:20px;left:20px;width:300px;">
      <Card :bordered="false" :padding="10">
        <p slot="title">特勤联动</p>
        <a href="javascript:;" slot="extra" @click.prevent="createData">
          <Icon type="plus"></Icon>
          新增
        </a>
        <div class="ivu-article">
          <blockquote>
            <p>最多同时激活3条，当前已激活
              <i class="ivu-total">2</i> 条。</p>
            <Tag closable>标签一</Tag>
            <Tag closable>标签二</Tag>
            <Tag closable>标签二</Tag>
          </blockquote>
        </div>
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
          type: "selection",
          width: 30,
          align: "center"
        },
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
                      "预案号：" + row.sch_id
                    ),
                    h(
                      "div",
                      { style: { "margin-bottom": "10px" } },
                      "预案名：" + row.sch_name
                    ),
                    h(
                      "div",
                      { style: { "margin-bottom": "10px" } },
                      "车牌号：" + row.boundPlate
                    ),
                    h("div", "是否激活：" + row.enabled)
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
                    h("DropdownItem", { props: { name: "remove" } }, "删除"),
                    h("DropdownItem", { props: { name: "active" } }, "激活")
                  ]
                )
              ]
            );
          }
        }
      ],
      data: [{ name: "特勤1" }, { name: "特勤2" }]
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
