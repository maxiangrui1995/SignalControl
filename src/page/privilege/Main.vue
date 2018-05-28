<template>
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
                        <i class="ivu-total">{{data_active.length}}</i> 条。</p>
                    <Tag closable v-for="item in data_active" :key="item.sch_id">{{item.sch_name}}</Tag>
                </blockquote>
            </div>
            <Table :columns="columns" :data="data" :showHeader="false" :loading="loading"></Table>
            <Page :current="page" :total="total" :page-size="rows" simple @on-change="pageChange" :style="{'margin':'10px','text-align':'right'}"></Page>
        </Card>
    </div>
</template>

<script>
import { planList } from "@/api/d_secret_service_plan";
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
                h("Tag", row.sch_name),
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
                    h(
                      "div",
                      "是否激活：" + (row.enabled === "1" ? "已激活" : "未激活")
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
                    h("DropdownItem", { props: { name: "remove" } }, "删除"),
                    h("DropdownItem", { props: { name: "active" } }, "激活")
                  ]
                )
              ]
            );
          }
        }
      ],
      data: [],
      data_active: []
    };
  },
  methods: {
    pageChange(page) {
      this.page = page;
    },
    loadData() {
      this.loading = true;
      planList({
        page: this.page,
        rows: this.rows
      }).then(res => {
        if (res.status) {
          res.data.list.forEach(item => {
            if (item.enabled === "1") {
              item._checked = true;
              item._disabled = true;
            }
          });
          this.data = res.data.list;
          this.total = ~~res.data.total;
          this.loading = false;
        }
      });
      planList({
        status: 1
      }).then(res => {
        if (res.status) {
          this.data_active = res.data.list;
        }
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
