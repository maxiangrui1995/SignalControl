<template>
  <!-- <div>
    <g-map :lat="lat" :lng="lng" :markers="true" />
    <div style="width:300px;position:absolute;top:20px;left:20px">
      
    </div> 
    
  </div>-->
  <div style="height:100%">
    <g-map markers />
    <div style="width:300px;position:absolute;top:20px;left:20px">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import GMap from "@/components/GMap";
import {
  getGreenBelt,
  createGreenBelt,
  modifyGreenBelt,
  removeGreenBelt
} from "@/api";
import { d_green_wave } from "@/untils/params.js";

export default {
  components: {
    GMap
  },
  data() {
    return {
      lat: 119.77495282888412,
      lng: 36.37174657521467,
      // table
      page: 1,
      rows: 5,
      total: 0,
      loading: false,
      tableData: [],
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
                h(
                  "Tag",
                  { props: { color: params.row.type === "0" ? "green" : "" } },
                  params.row.name
                ),
                h(
                  "div",
                  {
                    slot: "content"
                  },
                  [
                    h("div", "公共周期：" + params.row.period),
                    h(
                      "div",
                      "协调方向：" +
                        d_green_wave.coordinate_direction[
                          params.row.coordinate_direction
                        ]
                    ),
                    h("div", "绿波类型：" + d_green_wave.type[params.row.type]),
                    h(
                      "div",
                      "时间范围：" +
                        params.row.mon_day_start +
                        " - " +
                        params.row.mon_day_end
                    )
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
                // props: { trigger: "click" }
                on: {
                  "on-click": name => {
                    switch (true) {
                      case name === "details":
                        this.linkToDetails(params.row);
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
      ]
    };
  },
  methods: {
    createData() {},
    loadData() {
      this.loading = true;
      getGreenBelt({
        page: this.page,
        rows: this.rows
      }).then(res => {
        this.tableData = res.data.list;
        this.total = ~~res.data.total;
        this.loading = false;
      });
    },
    pageChange(page) {
      this.page = page;
      this.loadData();
    },
    linkToDetails(row) {
      this.$router.push({
        path: "/greenBelt/details",
        query: {
          id: row.id
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
