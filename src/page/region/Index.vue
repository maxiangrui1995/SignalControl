<template>
  <div style="position:absolute;top:0;left:0;width:100%;height:100%;">
    <g-map />
    <!-- <Spin fix></Spin> -->
    <div v-show="!crossing.editing" style="position:absolute;top:20px;left:20px;width:400px;max-height:500px;overflow:auto">
      <Card :bordered="false" :padding="10">
        <div slot="title">区域管理</div>
        <div slot="extra">
          <Tooltip :content="(switchSelected?'关闭':'开启')+'快速删除模式'" transfer>
            <Switch v-model="switchSelected">
              <Icon type="android-done" slot="open"></Icon>
              <Icon type="android-close" slot="close"></Icon>
            </Switch>
          </Tooltip>
        </div>
        <vue-scrollbar style="width:100%;max-height:400px;">
          <Spin v-if="loading" fix></Spin>
          <Button type="ghost">
            <Icon type="plus"></Icon>
            新增
          </Button>
          <Tree :data="treeData" :render="renderTree" :style="{'padding-bottom':'6px'}"></Tree>
        </vue-scrollbar>
      </Card>
    </div>

    <Modal :mask-closable="false" v-model="crossing.modal" :title="crossing.title">
      <Form ref="form" :rules="crossing.formRules" :model="crossing.form" :label-width="80">
        <FormItem label="路口名称">
          <Input v-model="crossing.form.name" placeholder="请输入新的路口名称..." />
        </FormItem>
        <FormItem label="路口类型">
          <Select v-model="crossing.form.direction">
            <Option value="1357">标准十字路口</Option>
          </Select>
        </FormItem>
        <FormItem label="纬度">
          <Input v-model="crossing.form.lng" placeholder="请输入新的纬度坐标..." />
        </FormItem>
        <FormItem label="经度">
          <Input v-model="crossing.form.lat" placeholder="请输入新的经度坐标..." />
        </FormItem>
      </Form>
      <Button :style="{'margin-left':'80px'}" @click="getPointFromMap">地图取点</Button>
      <div slot="footer">
        <Button type="text" @click="crossing.modal = false">取消</Button>
        <Button type="primary" :loading="crossing.loading">确定</Button>
      </div>
    </Modal>

    <div style="position:absolute;top:20px;right:20px;">
      <Button type="info" icon="ios-trash-outline">清空</Button>
    </div>

    <div v-show="crossing.editing" style="position:absolute;top:80px;right:20px;width:300px;">
      <Card :bordered="false" dis-hover>
        <div slot="title">地图取点</div>
        <Form :label-width="40">
          <FormItem label="纬度">
            <Input :value="crossing.form.lng" placeholder="请选择新的纬度坐标..." readonly/>
          </FormItem>
          <FormItem label="经度">
            <Input :value="crossing.form.lat" placeholder="请选择新的经度坐标..." readonly/>
          </FormItem>
        </Form>
        <div style="text-align:right;">
          <Button type="text">取消</Button>
          <Button type="primary">确定</Button>
        </div>
      </Card>
    </div>

  </div>
</template>
<script>
import GMap from "@/components/gmap";
import { dataList, dataAdd, dataDelete, dataUpdate } from "@/api/d_area";
import {
  dataAdd as dataAdd_crossing,
  dataDelete as dataDelete_crossing,
  dataUpdate as dataUpdate_crossing
} from "@/api/d_crossing";
import { d_crossing } from "@/untils/params";
import VueScrollbar from "vue2-scrollbar";
export default {
  name: "region",
  components: { GMap, VueScrollbar },
  data() {
    return {
      // tree
      treeData: [],
      loading: false,
      // switch
      switchSelected: false,
      // map
      mapShape: {
        area: {},
        lane: {},
        crossing: {},
        infoWindow: {}
      },
      // crossing
      crossing: {
        modal: false,
        title: "",
        formRules: {},
        form: {},
        loading: false,
        editing: false
      }
    };
  },
  methods: {
    // 加载区域数据
    loadTree() {
      this.loading = true;
      dataList().then(res => {
        this.treeData = res.data;
        this.loading = false;
      });
    },
    // Tree节点点击
    treeNodeSelect(root, node, data) {
      this.treeData.forEach(item => {
        this.$set(item, "selected", false);
        if (item.children) {
          item.children.forEach(item => {
            this.$set(item, "selected", false);
            if (item.children) {
              item.children.forEach(item => {
                this.$set(item, "selected", false);
              });
            }
          });
        }
      });

      this.$set(data, "selected", !data.selected);

      switch (true) {
        case data.type === "area":
          this.showMapArea(data);
          break;
        case data.type === "lane":
          this.showMapLane(data);
          break;
        case data.type === "crossing":
          this.showMapCrossing(data);
          break;
        default:
          break;
      }
    },
    // 渲染Tree
    renderTree(h, { root, node, data }) {
      return h(
        "span",
        {
          class: {
            "ivu-tree-title-hover": true,
            "ivu-tree-title-selected": data.selected
          },
          on: {
            click: () => {
              this.treeNodeSelect(root, node, data);
            },
            contextmenu: e => {
              e.preventDefault();
            }
          }
        },
        [
          h("span", data.name),
          this.switchSelected
            ? h("Icon", {
                props: { type: "trash-a", size: 20 },
                style: {
                  display: "inline-block",
                  float: "right",
                  marginRight: "32px"
                },
                on: {
                  click: event => {
                    event.cancelBubble = true;
                    this.removeData(data);
                  }
                }
              })
            : h(
                "Dropdown",
                {
                  on: {
                    "on-click": name => {
                      switch (true) {
                        case name === "created":
                          this.createdData(data);
                          break;
                        case name === "modify":
                          this.modifyData(data);
                          break;
                        case name === "remove":
                          this.removeData(data);
                          break;
                        case name === "devs":
                          this.devs(data);
                          break;
                        default:
                          break;
                      }
                    }
                  },
                  props: {
                    transfer: true,
                    trigger: "click"
                  },
                  style: {
                    display: "inline-block",
                    float: "right",
                    marginRight: "32px"
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
                      data.type === "crossing"
                        ? h("DropdownItem", { props: { name: "devs" } }, "设备")
                        : h(
                            "DropdownItem",
                            { props: { name: "created" } },
                            "新增"
                          ),
                      h("DropdownItem", { props: { name: "modify" } }, "编辑"),
                      h("DropdownItem", { props: { name: "remove" } }, "删除")
                    ]
                  )
                ]
              )
        ]
      );
    },
    // 数据加载完成显示所有路口地图标记
    loadMapCrossingMarkers() {
      let data = this.treeData;
      data.forEach(item => {
        if (item.children) {
          item.children.forEach(item => {
            if (item.children) {
              item.children.forEach(item => {
                let p = new google.maps.LatLng(item.lng, item.lat);
                this.mapShape.crossing[item.id] = new google.maps.Marker({
                  position: p,
                  icon: "/static/images/gcrossing.png",
                  title: item.name,
                  id: item.id,
                  map: this.gmap
                });
              });
            }
          });
        }
      });
    },
    // Tree节点点击显示地图区域
    showMapArea(data) {
      let gmap = this.gmap;
      let bounds = new google.maps.LatLngBounds();
      if (data.children) {
        data.children.forEach(item => {
          if (item.children) {
            item.children.forEach(item => {
              let p = new google.maps.LatLng(item.lng, item.lat);
              bounds.extend(p);
            });
          }
        });
      }
      // fitBounds 地图自动调整
      gmap.fitBounds(bounds);
    },
    // Tree节点点击显示地图道路
    showMapLane(data) {
      let gmap = this.gmap;
      let bounds = new google.maps.LatLngBounds();
      if (data.children) {
        data.children.forEach(item => {
          let p = new google.maps.LatLng(item.lng, item.lat);
          bounds.extend(p);
        });
      }
      // fitBounds 地图自动调整
      gmap.fitBounds(bounds);
    },
    // Tree节点点击显示地图路口
    showMapCrossing(data) {
      let gmap = this.gmap;
      if (data.lat && data.lng) {
        let p = new google.maps.LatLng(data.lng, data.lat);
        let bounds = new google.maps.LatLngBounds();
        bounds.extend(p);
        let marker = this.mapShape.crossing[data.id];
        // 设置弹窗内容
        let content =
          `<div class="gm-wrapper">` +
          `<div class="gm-wrapper-header">${data.name}</div>` +
          `<div class="gm-wrapper-body">` +
          `<div class="gm-wrapper-body-img"><img src="${data.img}" alt="${
            data.name
          }"></src></div>` +
          `<div class="gm-wrapper-body-info">` +
          `<div class="item">` +
          `<span class="title">信号机：</span>` +
          `<span class="msg">192.168.0.8</span>` +
          `</div>` +
          `<div class="item">` +
          `<span class="title">备用电源：</span>` +
          `<span class="msg">192.168.0.8</span>` +
          `</div>` +
          `<div class="item">` +
          `<span class="title">车检服务器：</span>` +
          `<span class="msg">192.168.0.8</span>` +
          `</div>` +
          `<div class="item">` +
          `<span class="title">相机：</span>` +
          `<span class="msg">192.168.0.8</span>` +
          `</div>` +
          `</div>` +
          `</div>` +
          `</div>`;
        if (!this.mapShape.infoWindow[data.id]) {
          this.mapShape.infoWindow[data.id] = new google.maps.InfoWindow({
            content: content
          });
        }
        this.mapShape.infoWindow[data.id].open(gmap, marker);
        // fitBounds 地图自动调整
        gmap.fitBounds(bounds);
        // marker点击事件
        let self = this;
        google.maps.event.addListener(marker, "click", function(event) {
          self.mapShape.infoWindow[this.id].open(gmap, marker);
        });
      }
    },
    loadData() {
      dataList().then(res => {
        this.data = res.data;
      });
    },
    // 删除
    removeData(row) {
      this.$Modal.confirm({
        content: `确定删除 <b>${row.name}</b> ？删除后无法恢复！`,
        loading: true,
        onOk: () => {
          this.$Message.info("Clicked ok");
        }
      });
    },
    // 新增
    createdData(row) {},
    // 编辑
    modifyData(row) {
      let self = this;
      let type = row.type;
      let newValue = "";
      if (type === "crossing") {
        this.crossing.modal = true;
        this.crossing.title = "路口编辑";
        this.crossing.form = {
          name: row.name,
          direction: "1357", //Todo
          lat: row.lat,
          lng: row.lng,
          id: row.id
        };
      } else {
        this.$Modal.confirm({
          render: h => {
            return h("Input", {
              props: {
                value: newValue,
                autofocus: true,
                placeholder:
                  type === "area"
                    ? "请输入新的区域名称..."
                    : "请输入新的道路名称"
              },
              on: {
                input: val => {
                  newValue = val;
                }
              }
            });
          },
          loading: true,
          onOk() {
            console.log(1);
          }
        });
      }
    },
    // 设备
    devs(row) {},
    // 地图取点
    getPointFromMap() {
      this.mapShape.crossing["1001"].setMap(null);
      this.mapShape.crossing["1001"].visible = false;
      this.mapShape.crossing["1001"].setVisible(false);
      let gmap = this.gmap;
      let self = this;
      let markers = this.mapShape.crossing;
      let info = this.mapShape.infoWindow;
      this.crossing.modal = false;
      this.crossing.editing = true;
      this.$Message.info("进入地图取点模式");
      gmap.setOptions({
        draggableCursor: "crosshair"
      });
      // 隐藏所有标记
      for (let i in info) {
        info[i].close();
      }
      for (let i in this.mapShape.crossing) {
        this.mapShape.crossing[i].setMap(null);
      }
      // 地图点击事件
      google.maps.event.addListener(gmap, "click", function(event) {
        let form = self.crossing.form;
        form.lat = event.latLng.e;
        form.lng = event.latLng.d;
        console.log(self.mapShape.crossing[form.id]);
        self.mapShape.crossing[form.id].setPosition(
          new google.maps.LatLng(form.lng, form.lat)
        );
      });
    }
  },
  created() {
    this.loadTree();
  },
  computed: {
    gmap() {
      return this.$store.state.gmap;
    }
  },
  watch: {
    treeData() {
      this.loadMapCrossingMarkers();
    }
  }
};
</script>


<style lang="less" scoped>
</style>

