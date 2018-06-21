<template>
  <div style="position:absolute;top:0;left:0;width:100%;height:100%;">
    <!-- 地图 S -->
    <g-map id="map" />
    <!-- 地图 E -->

    <div style="position:absolute;right:20px;bottom:20px;">
      <Card :style="{width:'300px'}">
        <div slot="title" :style="{padding:'0'}">
          <ButtonGroup>
            <Button>Cancel</Button>
            <Button type="primary">Confirm</Button>
          </ButtonGroup>
        </div>
        <p v-for="(item,index) in colorLeavel" :key="index" :style="{color:item}"><b>B</b></p>
      </Card>
    </div>

    <!-- 右侧弹窗 S -->
    <transition name="fadeInRight">
      <div v-if="show" class="sider-wrapper">
        <div class="sider-wrapper-content">

        </div>
        <div class="sider-wrapper-trigger">
          <Icon type="chevron-right" :size="12"></Icon>
        </div>
      </div>
    </transition>
    <!-- 右侧弹窗 E -->
  </div>
</template>

<script>
import GMap from "@/components/map";
export default {
  components: { GMap },
  data() {
    return {
      // 路口标记
      crossingMarkers: {},
      // 侧边栏
      show: false,
      // 位置
      pos: {
        top: 0,
        left: 0
      },
      // 颜色等级
      colorLeavel: [
        "#4d0022",
        "#710122",
        "#b3001c",
        "#d60f14",
        "#f5452a",
        "#fb7a1e",
        "#ffa32c",
        "#fcc954",
        "#fae37c",
        "#feeda7",
        "#fcef96"
      ]
    };
  },
  methods: {
    // 加载路口,并绘制标记
    loadCrossing() {
      this.$http.post("index/d_area/treeList").then(res => {
        let data = res.data;

        if (!data.status) return;
        let bounds = new google.maps.LatLngBounds();
        data.data.forEach(item => {
          if (item.children) {
            item.children.forEach(item => {
              if (item.children) {
                item.children.forEach(item => {
                  let p = new google.maps.LatLng(item.lat, item.lng);
                  bounds.extend(p);
                  this.crossingMarkers[item.id] = new google.maps.Marker({
                    position: p,
                    icon: "/static/images/crossing-marker.svg",
                    map: this.gmap
                  });
                  // this.crossingMouseEvent(this.crossingMarkers[item.id]);
                });
              }
            });
          }
        });
        // fitBounds 地图自动调整
        this.gmap.fitBounds(bounds);
      });
    },
    // 请求车流量
    fetchFlow() {
      this.$http.post("flow_check/f_flow/dataStatistic").then(res => {
        let data = res.data;
        if (!data.status) return;
        console.log(data.data);
      });
    },
    // 路口标记的鼠标事件
    crossingMouseEvent(marker) {
      let self = this;
      google.maps.event.addListener(marker, "click", function(event) {
        self.showOverlayView(this);
      });
      google.maps.event.addListener(marker, "mouseover", function(event) {
        self.getMarkersPos(this);
      });
      google.maps.event.addListener(marker, "mouseout", function(event) {});
    },
    // 获得标记位置
    getMarkersPos(marker) {
      let gmap = this.gmap;
      //   获取地图容器边界
      let bounds = gmap.getBounds();
      let style = getComputedStyle(document.getElementById("map"));
      let width = parseInt(style.width);
      let height = parseInt(style.height);
      let boundsPos = {
        y1: bounds.ta.b,
        y2: bounds.ta.d,
        x1: bounds.fa.b,
        x2: bounds.fa.d
      };
      //   计算当前标记的像素位置
      let lat = marker.position.d;
      let lng = marker.position.e;
      let pos = {
        left: (lng - boundsPos.x1) / (boundsPos.x2 - boundsPos.x1) * width,
        top: (lat - boundsPos.y1) / (boundsPos.y2 - boundsPos.y1) * height
      };
      this.pos = pos;
    },
    // 展示自定义叠加层
    showOverlayView(marker) {
      let gmap = this.gmap;
    }
  },
  computed: {
    gmap() {
      return this.$store.state.gmap;
    }
  },
  created() {
    this.$nextTick(() => {
      this.loadCrossing();
      this.fetchFlow();
    });
  }
};
</script>

<style scoped lang='less'>
.sider-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 0;
  &-content {
    width: 400px;
    height: 100%;
    background: #f8f8f8;
    box-shadow: -1px 0px 4px rgba(0, 0, 0, 0.28);
  }
  &-trigger {
    background: #fbf8f8;
    width: 14px;
    height: 96px;
    line-height: 96px;
    text-align: center;
    color: #ccc;
    position: absolute;
    top: 50%;
    margin-top: -48px;
    margin-left: -12px;
    border: 1px solid rgba(205, 208, 214, 0.9);
    border-radius: 10px;
    z-index: -1;
    cursor: pointer;
    &:hover {
      background: #eaeaec;
      color: #333;
    }
  }
}
</style>
