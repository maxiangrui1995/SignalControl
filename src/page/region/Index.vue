<template>
	<div style="position:absolute;top:0;left:0;width:100%;height:100%;">
		<g-map />
		<!-- <Spin fix></Spin> -->
		<div style="position:absolute;top:20px;left:20px;width:400px;max-height:500px;overflow:auto">
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
					<Tree :data="data" :render="renderTree" :style="{'padding-bottom':'6px'}"></Tree>
				</vue-scrollbar>
			</Card>
		</div>

		<div style="position:absolute;top:20px;right:20px;">
			<Button type="info" icon="ios-trash-outline">清空</Button>
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
      data: [],
      loading: false,
      // switch
      switchSelected: false,
      // map
      mapShape: {
        area: {},
        lane: {},
        crossing: {},
        infoWindow: {}
      }
    };
  },
  methods: {
    // 加载区域数据
    loadTree() {
      this.loading = true;
      dataList().then(res => {
        this.data = res.data;
        this.loading = false;
      });
    },
    // Tree节点点击
    treeNodeSelect(root, node, data) {
      this.data.forEach(item => {
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
      this.showMapArea(data);
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
                }
              })
            : h(
                "Dropdown",
                {
                  on: {
                    "on-click": name => {}
                  },
                  props: {
                    transfer: true
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
                      h("DropdownItem", { props: { name: "created" } }, "新增"),
                      h("DropdownItem", { props: { name: "modify" } }, "编辑")
                    ]
                  )
                ]
              )
        ]
      );
    },
    // Tree节点点击显示地图区域
    showMapArea(data) {
      let gmap = this.gmap;
      if (data.latlngs && data.latlngs.length) {
        let points = [];
        let bounds = new google.maps.LatLngBounds();
        data.latlngs.forEach(item => {
          let p = new google.maps.LatLng(item.lng, item.lat);
          points.push(p);
          bounds.extend(p);
        });
        // 如果已存在
        if (this.mapShape.area[data.id]) {
          this.mapShape.area[data.id].setMap(gmap);
        } else {
          this.mapShape.area[data.id] = new google.maps.Polygon({
            paths: points,
            strokeColor: "#096dd9",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#ccc",
            fillOpacity: 0.35,
            map: gmap
          });
        }
        // fitBounds 地图自动调整
        gmap.fitBounds(bounds);
      }
    },
    // Tree节点点击显示地图道路
    showMapLane(data) {
      let gmap = this.gmap;
      if (data.latlngs && data.latlngs.length) {
        let points = [];
        let bounds = new google.maps.LatLngBounds();
        data.latlngs.forEach(item => {
          let p = new google.maps.LatLng(item.lng, item.lat);
          points.push(p);
          bounds.extend(p);
        });
        // 如果已存在
        if (this.mapShape.lane[data.id]) {
          this.mapShape.lane[data.id].setMap(gmap);
        } else {
          this.mapShape.lane[data.id] = new google.maps.Polyline({
            path: points,
            strokeColor: "#096dd9",
            strokeOpacity: 1.0,
            strokeWeight: 4,
            map: this.gmap,
            title: "asdsadas"
          });
        }
        // fitBounds 地图自动调整
        gmap.fitBounds(bounds);
      }
    },
    // Tree节点点击显示地图路口
    showMapCrossing(data) {
      let gmap = this.gmap;
      if (data.lat && data.lng) {
        let p = new google.maps.LatLng(data.lng, data.lat);
        let bounds = new google.maps.LatLngBounds();
        bounds.extend(p);
        // 如果已存在
        if (this.mapShape.crossing[data.id]) {
          this.mapShape.crossing[data.id].setMap(gmap);
        } else {
          this.mapShape.crossing[data.id] = new google.maps.Marker({
            position: p,
            icon: "/static/images/gcrossing.png",
            title: data.name,
            id: data.id,
            map: gmap
          });
        }
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
    switchSelected() {}
  }
};
</script>


<style lang="less" scoped>
</style>

