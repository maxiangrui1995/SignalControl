<template>
  <div>
    <Card :padding="0">
      <p slot="title">
        <Breadcrumb>
          <BreadcrumbItem to="/greenBelt">绿波带</BreadcrumbItem>
          <BreadcrumbItem>{{name}}</BreadcrumbItem>
        </Breadcrumb>
      </p>
      <a href="javascript:;" slot="extra" @click.prevent="createData">
        <Icon type="plus"></Icon>
        新增
      </a>
      <Table :columns="columns" :data="tableData" :showHeader="false" :loading="loading" highlight-row @on-row-click="tableClick"></Table>
      <Page :current="page" :total="total" :page-size="rows" simple @on-change="pageChange" :style="{'margin':'10px','text-align':'right'}"></Page>
    </Card>

    <Modal v-model="modal" :loading="true" :title="formTitle" @on-ok="formOk">
      <Form :model="formItem" :label-width="80">
        <FormItem label="路口名称">
          <Cascader :data="regionData" v-model="formItem.crossing_id" placeholder="请输入新的路口名称..."></Cascader>
        </FormItem>
        <FormItem label="路段距离">
          <InputNumber v-model="formItem.road_distance" :max="255" :min="0" :style="{width:'100%'}"></InputNumber>
        </FormItem>
        <FormItem label="正向速度">
          <InputNumber v-model="formItem.forward_speed" :max="255" :min="0" :style="{width:'100%'}"></InputNumber>
        </FormItem>
        <FormItem label="路口相位差">
          <InputNumber v-model="formItem.phase_difference" :max="255" :min="0" :style="{width:'100%'}"></InputNumber>
        </FormItem>
        <FormItem label="协调相位">
          <Select v-model="formItem.positive_phase">
            <Option v-for="item in positive_phase" :key="item.value" :value="item.value">{{item.title}}</Option>
          </Select>
        </FormItem>
        <!-- <FormItem label="">
          <Button type="primary" @click="autoCount">自动计算</Button>
        </FormItem> -->
      </Form>
    </Modal>
  </div>
</template>

<script>
import { $d_green_wave_sub } from "@/api";
import { d_green_wave_sub } from "@/untils/params";
export default {
  data() {
    return {
      // route
      id: this.$route.query.id,
      name: decodeURIComponent(this.$route.query.name),
      // table
      tableData: [],
      columns: [
        {
          title: "名称",
          key: "name",
          render: (h, params) => {
            let positive_phase = "";
            d_green_wave_sub.positive_phase.forEach(item => {
              if (item.value === params.row.positive_phase) {
                positive_phase = item.title;
              }
            });
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
                    h("div", "距离：" + params.row.road_distance + "m"),
                    h("div", "速度：" + params.row.forward_speed + "m/s"),
                    h("div", "相位差：" + params.row.phase_difference),
                    h("div", "协调相位：" + positive_phase)
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
                      case name === "download":
                        this.downloadData(params.row);
                        break;
                      case name === "details":
                        this.linkToDetails(params.row);
                        break;
                      case name === "modify":
                        this.modifyData(params.row);
                        break;
                      case name === "remove":
                        this.removeData(params.row.id, params.index);
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
                    h("DropdownItem", { props: { name: "download" } }, "下载"),
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
      loading: false,
      // page
      page: 1,
      rows: 5,
      total: 0,
      // modal,form
      modal: false,
      formTitle: "",
      formItem: {},
      // other
      positive_phase: d_green_wave_sub.positive_phase
    };
  },
  methods: {
    /* ======== table ========= */
    /* 新增 */
    createData() {
      this.modal = true;
      this.formTitle = "绿波带子区新增";
      this.formItem = {};
      this.formItem.forward_speed = 60;
      this.formItem._type = "create";
    },
    /* 编辑 */
    modifyData(row) {
      let roadArray = [];
      this.regionData.forEach(item1 => {
        if (item1.children) {
          item1.children.forEach(item2 => {
            if (item2.children) {
              item2.children.forEach(item3 => {
                if (item3.id === row.crossing_id) {
                  roadArray.push(item1.id, item2.id, item3.id);
                }
              });
            }
          });
        }
      });
      this.modal = true;
      this.formTitle = "绿波带子区编辑";
      this.formItem.crossing_id = roadArray;
      this.formItem.road_distance = ~~row.road_distance;
      this.formItem.forward_speed = ~~row.forward_speed;
      this.formItem.phase_difference = ~~row.phase_difference;
      this.formItem.positive_phase = row.positive_phase;
      this.formItem.id = row.id;
      this.formItem._type = "modify";
    },
    /* 删除 */
    removeData(id, index) {
      if ((this.page - 1) * this.rows + index + 1 !== this.total) {
        this.$Modal.warning({
          content: "<p>删除必须从最后一条记录开始!</p>"
        });
      } else {
        this.$Modal.confirm({
          content: "<p>确定删除？删除后无法恢复！</p>",
          loading: true,
          onOk: () => {
            $d_green_wave_sub.dataDelete({ id: id }).then(res => {
              if (res.status) {
                this.$Message.success("删除成功");
              } else {
                this.$Message.error("删除失败");
              }
              this.$Modal.remove();
              this.loadData();
            });
          }
        });
      }
    },
    /* 下载 */
    downloadData(row) {
      this.$Modal.confirm({
        content: "<p>确定下载方案到当前信号机？</p>",
        loading: true,
        onOk: () => {
          $d_green_wave_sub.downLoadSetting({ id: row.id }).then(res => {
            if (res.status) {
              this.$Message.success("下载成功");
            } else {
              this.$Message.error("下载失败");
            }
            this.$Modal.remove();
            this.loadData();
          });
        }
      });
    },
    /* 加载数据 */
    loadData() {
      this.loading = true;
      $d_green_wave_sub
        .dataList({
          pid: this.id,
          page: this.page,
          rows: this.rows
        })
        .then(res => {
          this.tableData = res.data.list;
          this.total = ~~res.data.total;
          this.loading = false;
        });
    },
    /* 分页切换 */
    pageChange(page) {
      this.page = page;
      this.loadData();
    },
    /* 表格单击 */
    tableClick(row, index) {
      this.gmap.panTo(new google.maps.LatLng(row.lat, row.lng));
    },
    /* 跳转至详情 */
    linkToDetails(row) {},
    /* ======== from ========= */
    /* 自动计算 */
    autoCount() {},
    /* 新增或编辑的确定 */
    formOk() {
      let {
        crossing_id,
        forward_speed,
        id,
        phase_difference,
        positive_phase,
        road_distance
      } = this.formItem;

      if (this.formItem._type === "create") {
        $d_green_wave_sub
          .dataAdd({
            crossing_id: crossing_id["2"],
            forward_speed,
            phase_difference,
            positive_phase,
            road_distance,
            pid: this.id
          })
          .then(res => {
            if (res.status) {
              this.$Message.success("新增成功");
            } else {
              this.$Message.error(res.message);
            }
            this.modal = false;
            this.loadData();
          });
      } else {
        $d_green_wave_sub
          .dataUpdate({
            crossing_id: crossing_id["2"],
            forward_speed,
            id,
            phase_difference,
            positive_phase,
            road_distance
          })
          .then(res => {
            if (res.status) {
              this.$Message.success("修改成功");
            } else {
              this.$Message.error(res.message);
            }
            this.modal = false;
            this.loadData();
          });
      }
    }
  },
  created() {
    this.loadData();
    if (!this.$store.state.regionModule.data.length) {
      this.$store.dispatch("regionModule/SET_DATA");
    }
  },
  computed: {
    gmap() {
      return this.$store.state.gmap;
    },
    regionData() {
      return this.$store.state.regionModule.data;
    }
  },
  watch: {
    gmap() {}
  }
};
</script>

<style>
</style>
