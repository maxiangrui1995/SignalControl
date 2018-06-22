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
                    icon: "/static/images/crossing-marker.svg",
                    map: this.gmap,
                    name: item.name
                  });
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
    }
  },
  computed: {
    gmap() {
      return this.$store.state.gmap;
    }
  },
  created() {
    this.loadCrossing();
  },
  mounted() {
    setTimeout(() => {
      this.show = !this.show;
    }, 1000);
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
