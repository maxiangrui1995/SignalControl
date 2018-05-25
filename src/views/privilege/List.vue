<template>
  <div>
    <div style="position:absolute;top:20px;left:20px;width:300px;">
      <Card :padding="0">
        <p slot="title">特勤联动</p>
        <!-- <a href="javascript:;" slot="extra" :style="{'margin-right':'10px'}">
          <Icon type="bookmark"></Icon>
          激活
        </a>
        <a href="javascript:;" slot="extra" @click="createData">
          <Icon type="plus"></Icon>
          新增
        </a> -->
        <Alert show-icon :style="{margin:'4px'}">
          <span>已开启
            <i class="msg">{{hasActiveTotal}}</i>&nbsp;条特勤,最多
            <b>3</b> 条!</span>
        </Alert>

        <ButtonGroup>
          <Button type="primary" icon="plus">新增</Button>
          <Button type="primary" icon="bookmark">激活</Button>
        </ButtonGroup>

        <Table :columns="columns" :data="tableData" :showHeader="false" :loading="loading" highlight-row @on-row-click="tableClick" @on-selection-change="tableSelect"></Table>
        <Page :current="page" :total="total" :page-size="rows" simple @on-change="pageChange" :style="{'margin':'10px','text-align':'right'}"></Page>
      </Card>
    </div>

    <div style="position:absolute;top:20px;right:20px;">
      <Button type="primary">Error</Button>
    </div>

    <Modal v-model="modal" :title="modalTitle" :width="900">
      <Form :label-width="60">
        <Row :gutter="16">
          <i-col span="8">
            <FormItem label="预案号">
              <i-input placeholder="预案号"></i-input>
            </FormItem>
          </i-col>
          <i-col span="8">
            <FormItem label="预案名">
              <i-input placeholder="预案名"></i-input>
            </FormItem>
          </i-col>
          <i-col span="8">
            <FormItem label="车牌号">
              <i-input placeholder="车牌号"></i-input>
            </FormItem>
          </i-col>
        </Row>
        <Row :gutter="16" v-for="(item,$index) in formItem" :key="$index">
          <i-col :span="5">
            <FormItem label="信号机">
              <i-input placeholder="信号机"></i-input>
            </FormItem>
          </i-col>
          <i-col :span="4">
            <FormItem label="等待位置">
              <i-input placeholder="等待位置"></i-input>
            </FormItem>
          </i-col>
          <i-col :span="4">
            <FormItem label="目标位置">
              <i-input placeholder="目标位置"></i-input>
            </FormItem>
          </i-col>
          <i-col :span="4">
            <FormItem label="距离">
              <i-input placeholder="距离"></i-input>
            </FormItem>
          </i-col>
          <i-col :span="4">
            <FormItem label="延时">
              <i-input placeholder="延时"></i-input>
            </FormItem>
          </i-col>
          <i-col :span="3">
            <Button type="ghost">Delete</Button>
          </i-col>
        </Row>
        <Row>
          <i-col span="4">
            <Button type="dashed" long icon="plus-round" @click="createNewForm">新增</Button>
          </i-col>
        </Row>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { $d_secret_service_plan } from "@/api";
export default {
  data() {
    return {
      /* table */
      columns: [
        {
          type: "selection",
          width: 30,
          align: "center"
        },
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
                h(
                  "Tag",
                  {
                    props: {
                      color: params.row.enabled === "1" ? "green" : ""
                    }
                  },
                  params.row.sch_name
                ),
                h(
                  "div",
                  {
                    slot: "content"
                  },
                  [
                    h("div", "预案号：" + params.row.sch_id),
                    h("div", "预案名：" + params.row.sch_name),
                    h("div", "绑定警车：" + params.row.boundPlate),
                    h(
                      "div",
                      "是否激活：" + ["未激活", "已激活"][params.row.enabled]
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
                on: {
                  "on-click": name => {
                    switch (true) {
                      case name === "active":
                        this.activeData(params.row);
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
                h("a", [h("Icon", { props: { type: "ios-more", size: 20 } })]),
                h(
                  "DropdownMenu",
                  {
                    slot: "list"
                  },
                  [
                    h(
                      "DropdownItem",
                      { props: { name: "active" } },
                      params.row.enabled === "1" ? "注销" : "激活"
                    ),
                    h("DropdownItem", { props: { name: "modify" } }, "编辑"),
                    h("DropdownItem", { props: { name: "remove" } }, "删除")
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
      polyLineArray: {},
      /* 已激活 */
      hasActiveTotal: 0,
      /* 已勾选（手动） */
      hasChecked: [],
      /* modal */
      modal: false,
      modalTitle: "",
      formItem: [{}, {}]
    };
  },
  methods: {
    /* 加载数据 */
    loadData() {
      this.loading = true;
      Promise.all([
        $d_secret_service_plan.planList({
          page: this.page,
          rows: this.rows
        }),
        $d_secret_service_plan.planList({
          status: 1
        })
      ]).then(res => {
        let allData = res[0].data;
        let activeData = res[1].data;
        allData.list.forEach(item => {
          if (item.enabled === "1") {
            item._checked = true;
            item._disabled = true;
          }
          if (this.hasChecked.indexOf(item.sch_id) > -1) {
            item._checked = true;
          }
        });

        this.tableData = allData.list;
        this.total = ~~allData.total;
        this.loading = false;
        this.hasActiveTotal = ~~activeData.total;
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
    // 表格选中
    tableSelect(selection) {
      let sel = (this.hasChecked = []);
      selection.forEach(item => {
        sel.push(item.sch_id);
      });
    },
    /* 绘制地图线段路径 */
    drawPolyLine(row) {
      let line = (this.polyLineArray[row.sch_id] = new google.maps.Polyline({
        clickable: false,
        strokeColor: "#B32323",
        strokeOpacity: 1,
        strokeWeight: 4
      }));

      $d_secret_service_plan
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
    },
    /* 新增 */
    createData() {
      this.modal = true;
      this.modalTitle = "特勤联动方案新增";
    },
    /* modal */
    /* 新增信号机 */
    createNewForm() {
      // this.index++;
      this.formItem.push({});
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
    gmap() {}
  }
};
</script>

<style scoped lang="less">
</style>
