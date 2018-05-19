<template>
    <div>
        <Card :padding="0">
            <p slot="title">特勤联动</p>
            <a href="javascript:;" slot="extra">
                <Icon type="plus"></Icon>
                新增
            </a>
            <Table :columns="columns" :data="tableData" :showHeader="false" :loading="loading" highlight-row @on-row-click="tableClick"></Table>
            <Page :current="page" :total="total" :page-size="rows" simple @on-change="pageChange" :style="{'margin':'10px','text-align':'right'}"></Page>
        </Card>
    </div>
</template>

<script>
import { d_secret_service_plan } from "@/api";
export default {
  data() {
    return {
      /* table */
      columns: [
        {
          title: "名称",
          key: "sch_name",
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
                h("Tag", params.row.sch_name),
                h(
                  "div",
                  {
                    slot: "content"
                  },
                  [
                    h("div", "预案号：" + params.row.sch_id),
                    h("div", "预案名：" + params.row.sch_name),
                    h("div", "绑定警车：" + params.row.boundPlate)
                  ]
                )
              ]
            );
          }
        }
      ],
      tableData: [],
      loading: false,
      /* page */
      page: 1,
      rows: 5,
      total: 0,
      /* 地图折线 */
      polyLineArray: {}
    };
  },
  methods: {
    /* 加载数据 */
    loadData() {
      this.loading = true;
      d_secret_service_plan
        .planList({
          page: this.page,
          rows: this.rows
        })
        .then(res => {
          this.tableData = res.data.list;
          this.total = ~~res.data.total;
          this.loading = false;
        });
    },
    /* 分页 */
    pageChange(page) {
      this.page = page;
      this.loadData();
    },
    /* 表格单击 */
    tableClick(row, index) {
      this.drawPolyLine(row);
    },
    /* 绘制地图线段路径 */
    drawPolyLine(row) {
      let line = (this.polyLineArray[row.sch_id] = new google.maps.Polyline({
        clickable: false,
        strokeColor: "#B32323",
        strokeOpacity: 1,
        strokeWeight: 4
      }));

      d_secret_service_plan
        .getLine({
          sch_id: row.sch_id
        })
        .then(res => {
          let data = res.data;
          if (data.length) {
            let point = [];
            data[0].forEach(item => {
              let p = new google.maps.LatLng(item[0], item[1]);
              point.push(p);
            });
            line.getPath().b = point;
            line.setMap(this.gmap);
            this.gmap.panTo(point[0]);
          }
        });
    }
  },
  created() {
    this.loadData();
  },
  computed: {
    gmap() {
      return this.$store.state.gmap;
    }
  },
  watch: {
    gmap() {
      console.log(this.gmap);
    }
  }
};
</script>

<style>
</style>
