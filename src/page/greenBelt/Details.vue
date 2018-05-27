<template>
  <div>
    <div style="position:absolute;top:20px;left:20px;width:300px;">
      <Card :padding="10">
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
        <Table :columns="columns" :data="tableData" :showHeader="false" :loading="loading" @on-row-click="tableClick"></Table>
        <Page :current="page" :total="total" :page-size="rows" simple @on-change="pageChange" :style="{'margin':'10px','text-align':'right'}"></Page>
      </Card>
    </div>

    <Modal v-model="modal" :title="modalTitle">
      <Form ref="form" :rules="formRules" :model="formItem" :label-width="80">
        <FormItem label="路口名称" prop="crossing_id">
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
        <FormItem label="协调相位" prop="positive_phase">
          <Select v-model="formItem.positive_phase">
            <Option v-for="item in positive_phase" :key="item.value" :value="item.value">{{item.title}}</Option>
          </Select>
        </FormItem>
        <!-- <FormItem label="">
          <Button type="primary" @click="autoCount">自动计算</Button>
        </FormItem> -->
      </Form>
      <div slot="footer">
        <Button type="text" @click="modal = false">取消</Button>
        <Button type="primary" :loading="modal_loading" @click="formOk">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import {
  dataList as dataList_green,
  dataAdd,
  dataUpdate,
  dataDelete,
  downLoadSetting
} from "@/api/d_green_wave_sub";
import { dataList as dataList_area } from "@/api/d_area";
import { d_green_wave_sub } from "@/untils/params";
export default {
  data() {
    return {
      id: this.$route.query.id,
      name: decodeURIComponent(this.$route.query.name),
      // table
      tableData: [],
      columns: [
        {
          title: "名称",
          key: "name",
          render: (h, params) => {
            let row = params.row;
            let positive_phase = "";
            d_green_wave_sub.positive_phase.forEach(item => {
              if (item.value === row.positive_phase) {
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
                      "距离：" + row.road_distance + "m"
                    ),
                    h(
                      "div",
                      { style: { "margin-bottom": "10px" } },
                      "速度：" + row.forward_speed + "m/s"
                    ),
                    h(
                      "div",
                      { style: { "margin-bottom": "10px" } },
                      "相位差：" + row.phase_difference
                    ),
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
                    h(
                      "DropdownItem",
                      { props: { name: "details", disabled: true } },
                      "详情"
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
      loading: false,
      // page
      page: 1,
      rows: 5,
      total: 0,
      // other
      regionData: [],
      positive_phase: d_green_wave_sub.positive_phase, //协调相位
      // modal,form
      modal: false,
      modal_loading: false,
      modalTitle: "",
      formItem: {},
      formRules: {
        crossing_id: [
          {
            required: true,
            message: "请选择路口"
          },
          {
            type: "array",
            min: 3,
            message: "请选择有效的路口",
            trigger: "change"
          }
        ],
        positive_phase: [
          {
            required: true,
            message: "请选择协调相位"
          }
        ]
      }
    };
  },
  methods: {
    createData() {
      this.modal = true;
      this.modalTitle = "绿波带子区新增";
      this.formItem = {};
      this.formItem.forward_speed = 60;
      this.formItem._type = "create";
      this.formItem.phase_difference = 0;
      this.formItem.road_distance = 0;
    },
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
      this.modalTitle = "绿波带子区编辑";
      this.formItem.crossing_id = roadArray;
      this.formItem.road_distance = ~~row.road_distance;
      this.formItem.forward_speed = ~~row.forward_speed;
      this.formItem.phase_difference = ~~row.phase_difference;
      this.formItem.positive_phase = row.positive_phase;
      this.formItem.id = row.id;
      this.formItem._type = "modify";
    },
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
            dataDelete({ id: id }).then(res => {
              if (res.status) {
                this.$Message.success("删除成功");
                this.loadData();
              } else {
                this.$Message.error("删除失败");
              }
              this.$Modal.remove();
            });
          }
        });
      }
    },
    downloadData(row) {
      this.$Modal.confirm({
        content: "<p>确定下载方案到当前信号机？</p>",
        loading: true,
        onOk: () => {
          downLoadSetting({ id: row.id }).then(res => {
            if (res.status) {
              this.$Message.success("下载成功");
            } else {
              this.$Message.error("下载失败");
            }
            this.$Modal.remove();
          });
        }
      });
    },
    loadData() {
      this.loading = true;
      dataList_green({
        pid: this.id,
        page: this.page,
        rows: this.rows
      }).then(res => {
        if (res.status === "1") {
          this.tableData = res.data.list;
          this.total = ~~res.data.total;
          this.loading = false;
        }
      });
    },
    pageChange(page) {
      this.page = page;
      this.loadData();
    },
    tableClick(row, index) {
      //   this.gmap.panTo(new google.maps.LatLng(row.lat, row.lng));
    },
    linkToDetails(row) {},
    autoCount() {},
    formOk() {
      this.modal_loading = true;
      this.$refs["form"].validate(valid => {
        if (!valid) {
          this.modal_loading = false;
          return;
        }
        let {
          crossing_id,
          forward_speed,
          id,
          phase_difference,
          positive_phase,
          road_distance
        } = this.formItem;
        if (this.formItem._type === "create") {
          dataAdd({
            crossing_id: crossing_id["2"],
            forward_speed,
            phase_difference,
            positive_phase,
            road_distance,
            pid: this.id
          }).then(res => {
            if (res.status) {
              this.$Message.success("新增成功");
              this.modal = false;
              this.loadData();
            } else {
              this.$Message.error(res.message);
            }
            this.modal_loading = false;
          });
        } else {
          dataUpdate({
            crossing_id: crossing_id["2"],
            forward_speed,
            id,
            phase_difference,
            positive_phase,
            road_distance
          }).then(res => {
            if (res.status) {
              this.$Message.success("修改成功");
              this.modal = false;
              this.loadData();
            } else {
              this.$Message.error(res.message);
            }
            this.modal_loading = false;
          });
        }
      });
    },
    // 加载区域数据
    loadDataRegion() {
      dataList_area().then(res => {
        if (res.status === "1") {
          this.regionData = res.data;
        }
      });
    }
  },
  created() {
    this.loadDataRegion();
    this.loadData();
  }
};
</script>

<style>
</style>
