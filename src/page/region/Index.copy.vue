<template>
    <div style="position:absolute;top:0;left:0;width:100%;height:100%;">
        <!-- 地图 S -->
        <g-map id="map" />
        <!-- 地图 E -->

        <!-- 右侧弹窗 S -->
        <transition name="fadeInRight">
            <div v-if="show" class="sider-wrapper">
                <div class="sider-wrapper-content">
                    <Tree :data="treeData" :render="renderTree"></Tree>
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
      // 路口标记叠加层
      crossingOverlay: null,
      show: false,
      // 路口数据
      treeData: []
    };
  },
  methods: {
    // 加载路口,并绘制标记
    loadCrossing() {
      this.$http.post("index/d_area/treeList").then(res => {
        let data = res.data;
        if (!data.status) return;
        this.treeData = data.data;
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
                    icon: "/static/images/map-crossing.svg",
                    map: this.gmap,
                    title: item.name,
                    name: item.name,
                    id: item.id
                  });
                  this.crossingMouseEvent(this.crossingMarkers[item.id]);
                });
              }
            });
          }
        });
        // fitBounds 地图自动调整
        this.gmap.fitBounds(bounds);
      });
    },
    // 渲染Tree
    renderTree(h, { root, node, data }) {
      return h("span", {}, [h("span", data.name)]);
    },
    // 路口标记的鼠标事件
    crossingMouseEvent(marker) {
      let self = this;
      let gmap = this.gmap;
      google.maps.event.addListener(marker, "click", function(event) {
        if (self.crossingOverlay) {
          self.crossingOverlay.setMap(null);
          self.crossingOverlay = null;
        }
        let str = `<div class="overlay-poptip overlay-poptip-blue" style="min-width:300px;">
            <div class="overlay-poptip-content">
              <div class="overlay-poptip-arrow"></div>
              <div class="overlay-poptip-inner">
                <div class="overlay-poptip-title">
                  <span class="overlay-poptip-title-header">${this.name}</span>
                  <div class="overlay-poptip-title-content">
                    <div class="overlay-poptip-title-content-item">普通十字路口</div>
                    信号机 备用电源 相机 车检服务器
                  </div>
                </div>
                <div class="overlay-poptip-body">
                  <div class="ivu-btn-group ivu-btn-group-small" style="margin-bottom:12px;">
                    <button type="button" class="ivu-btn ivu-btn-primary">资产</button><button type="button" class="ivu-btn">类型</button>
                  </div>
                  <div class="overlay-poptip-body-item">信号机<span>1</span></div>
                  <div class="overlay-poptip-body-item">备用电源<span>1</span></div>
                  <div class="overlay-poptip-body-item">相机<span>4</span></div>
                  <div class="overlay-poptip-body-item">车检服务器<span>4</span></div>
                </div>
              </div>
            </div>
          </div>`;
        self.crossingOverlay = new gmap.defineTitle(this, str);
      });
    }
  },
  computed: {
    gmap() {
      return this.$store.state.gmap;
    }
  },
  watch: {
    gmap() {
      this.loadCrossing();
    }
  }
};
</script>

<style scoped lang="less">
@keyframes fadeInRight {
  0% {
    opacity: 0;
    transform: translateX(400px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
.fadeInRight-enter-active {
  animation: fadeInRight 1s;
}
.fadeInRight-leave-active {
  animation: fadeInRight 1s reverse;
}
</style>
