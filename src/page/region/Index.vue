<template>
  <div style="position:absolute;top:0;left:0;width:100%;height:100%;">
    <g-map />
    <!-- <Spin fix></Spin> -->
    <div v-show="!crossing.editing" style="position:absolute;top:20px;left:20px;width:400px;max-height:500px;overflow:auto">
      <Card :padding="10">
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
          <Button type="ghost" @click="createdData">
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
        <Button type="text" @click="crossingModalCancel">取消</Button>
        <Button type="primary" :loading="crossing.loading" @click="crossingModalOK">确定</Button>
      </div>
    </Modal>

    <div v-show="crossing.editing" style="position:absolute;top:80px;right:20px;width:340px;">
      <Card dis-hover>
        <div slot="title">地图取点</div>
        <Alert closable>点击地图或拖动标记完成路口取点</Alert>
        <Form :label-width="40">
          <FormItem label="纬度">
            <Input :value="crossing.form_copy.lng" placeholder="请选择新的纬度坐标..." readonly/>
          </FormItem>
          <FormItem label="经度">
            <Input :value="crossing.form_copy.lat" placeholder="请选择新的经度坐标..." readonly/>
          </FormItem>
        </Form>
        <div style="text-align:right;">
          <Button type="text" @click="getPointFromMapCancel">取消</Button>
          <Button type="primary" @click="getPointFromMapOK">确定</Button>
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
        form_copy: {},
        loading: false,
        editing: false
      },
      // mapEvents
      mapClickEvent: null
    };
  },
  methods: {
    // 加载区域数据
    loadTree() {
      this.loading = true;
      dataList().then(res => {
        this.treeData = res.data;
        this.loading = false;
        this.loadMapCrossingMarkers();
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
      for (let i in this.mapShape.crossing) {
        this.mapShape.crossing[i].setMap(null);
      }
      this.mapShape.crossing = {};
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
    // 删除
    removeData(row) {
      this.$Modal.confirm({
        content: `确定删除<b>${row.name}</b>？删除后无法恢复！`,
        loading: true,
        onOk: () => {
          dataDelete_crossing({ id: row.id }).then(res => {
            if (res.status) {
              this.$Message.success("删除成功");
            } else {
              this.$Message.error(res.message);
            }
            this.$Modal.remove();
            this.loadTree();
          });
        }
      });
    },
    // 新增
    createdData(row) {
      let self = this;
      let type = row.type;
      let newValue = "";
      if (type === "lane") {
        alert("新增信号机");
      } else {
        this.$Modal.confirm({
          render: h => {
            return h("Input", {
              props: {
                value: newValue,
                autofocus: true,
                placeholder:
                  type === "area"
                    ? "请输入新的道路名称..."
                    : "请输入新的区域名称"
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
            dataAdd({
              id: row.id,
              name: newValue
            }).then(res => {
              if (res.status) {
                this.$Message.success("添加成功");
              } else {
                this.$Message.error(res.message);
              }
              this.$Modal.remove();
              self.loadTree();
            });
          }
        });
      }
    },
    // 编辑
    modifyData(row) {
      let self = this;
      let type = row.type;
      let newValue = row.name;
      if (type === "crossing") {
        this.crossing.modal = true;
        this.crossing.title = "路口编辑";
        this.crossing.form = {
          name: row.name,
          direction: "1357", //Todo
          road_data: d_crossing.road_data, //Todo
          lat: row.lat,
          lng: row.lng,
          id: row.id,
          pid: row.pid,
          type: "modify"
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
            dataUpdate({
              id: row.id,
              name: newValue
            }).then(res => {
              if (res.status) {
                this.$Message.success("添加成功");
              } else {
                this.$Message.error(res.message);
              }
              this.$Modal.remove();
              self.loadTree();
            });
          }
        });
      }
    },
    // 设备
    devs(row) {},
    // 地图取点
    getPointFromMap() {
      let gmap = this.gmap;
      let self = this;
      let markers = this.mapShape.crossing;
      let info = this.mapShape.infoWindow;
      let form = this.crossing.form;
      let form_copy = this.crossing.form_copy;
      form_copy.lng = form.lng;
      form_copy.lat = form.lat;

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

      for (let i in markers) {
        if (markers[i].id == form.id) {
          markers[i].setDraggable(true);
          // 标记的拖动事件
          google.maps.event.addListener(markers[i], "drag", function(event) {
            self.crossing.form_copy = {
              lat: event.latLng.e,
              lng: event.latLng.d
            };
          });
        } else {
          markers[i].setMap(null);
        }
      }
      // 地图点击事件
      this.mapClickEvent = google.maps.event.addListener(
        gmap,
        "click",
        function(event) {
          self.crossing.form_copy = {
            lat: event.latLng.e,
            lng: event.latLng.d
          };
          self.mapShape.crossing[form.id].setPosition(
            new google.maps.LatLng(event.latLng.d, event.latLng.e)
          );
        }
      );
    },
    // 重置地图
    resetMap() {
      let gmap = this.gmap;
      // 恢复弹窗
      this.crossing.modal = true;
      this.crossing.editing = false;
      // 地图标记恢复
      let markers = this.mapShape.crossing;
      let form = this.crossing.form;
      for (let i in markers) {
        if (markers[i].id == form.id) {
          markers[i].setPosition(new google.maps.LatLng(form.lng, form.lat));
        }
        markers[i].setMap(gmap);
        markers[i].setDraggable(false);
      }
      // 恢复地图鼠标样式
      delete gmap.draggableCursor;
      // 删除地图事件
      google.maps.event.removeListener(this.mapClickEvent);
    },
    // 地图取点确定
    getPointFromMapOK() {
      this.crossing.form = Object.assign(
        this.crossing.form,
        this.crossing.form_copy
      );
      this.resetMap();
    },
    getPointFromMapCancel() {
      this.resetMap();
    },
    // 路口取点弹窗取消
    crossingModalCancel() {
      this.crossing.modal = false;
      this.crossing.loading = false;
      this.loadMapCrossingMarkers();
    },
    crossingModalOK() {
      this.crossing.loading = true;
      if (this.crossing.form.type === "modify") {
        delete this.crossing.form.type;
        dataUpdate_crossing({
          ...this.crossing.form.type
        }).then(res => {
          if (res.status) {
            this.$Message.success("修改成功");
            this.crossing.modal = false;
            this.loadTree();
          } else {
            this.$Message.error(res.message);
          }
          this.crossing.loading = false;
        });
      }
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
    treeData() {}
  }
};
</script>


<style lang="less" scoped>
</style>

