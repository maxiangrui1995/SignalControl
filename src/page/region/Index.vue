<template>
  <div style="position:absolute;top:0;left:0;width:100%;height:100%;">
    <g-map />
    <!-- <Spin fix></Spin> -->
    <div style="position:absolute;top:20px;left:20px;width:400px;max-height:500px;overflow:auto">
      <Card :bordered="false" :padding="10">
        <div slot="title">区域管理</div>
        <vue-scrollbar style="width:100%;max-height:400px;">
          <Spin v-if="loading" fix></Spin>
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
      loading: false
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
          h(
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
                  h("DropdownItem", { props: { name: "details" } }, "详情"),
                  h("DropdownItem", { props: { name: "modify" } }, "编辑"),
                  h("DropdownItem", { props: { name: "remove" } }, "删除")
                ]
              )
            ]
          )
        ]
      );
    },
    // Tree节点点击显示地图区域线段
    showMapArea(data) {
      let gmap = this.gmap;
      // 区域/道路
      if (data.type === "area" || data.type === "lane") {
        if (data.latlngs && data.latlngs.length) {
          let points = [];
          var bounds = new google.maps.LatLngBounds();
          data.latlngs.forEach(item => {
            let p = new google.maps.LatLng(item.lng, item.lat);
            points.push(p);
            bounds.extend(p);
          });
          new google.maps.Polyline({
            path: points,
            strokeColor: "#096dd9",
            strokeOpacity: 1.0,
            strokeWeight: 4,
            map: this.gmap,
            title: "asdsadas"
          });

          // fitBounds 地图自动调整
          gmap.fitBounds(bounds);
        }
      } else {
        //路口
        if (data.lat && data.lng) {
          let p = new google.maps.LatLng(data.lng, data.lat);
          new google.maps.Marker({
            position: p,
            icon: "/static/images/gcrossing.png",
            title: data.name,
            id: data.id,
            map: gmap
          });
          gmap.panTo(p);
        }
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
  }
};
</script>
