<template>
  <div style="position:absolute;top:0;left:0;width:100%;height:100%;">
    <!-- 地图 S -->
    <g-map id="map" />
    <!-- 地图 E -->

    <!-- 导航 S -->
    <div style="position:absolute;top:20px;right:20px;">
      <Button size="large">
        <Icon type="eye" :style="{marginRight:'8px'}"></Icon>实时监控
        <Switch v-model="show.signal" size="small"></Switch>
      </Button>
      <Dropdown style="margin-left: 20px">
        <Button size="large">
          <Icon type="videocamera" :style="{marginRight:'8px'}"></Icon>实时视频
          <Icon type="chevron-down" :style="{margin:'0 8px',fontSize:'12px'}"></Icon>
          <Switch v-model="show.camera" size="small"></Switch>
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem>电子警察视频</DropdownItem>
          <DropdownItem>车流量视频</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Button size="large">
        <Icon type="ios-pulse-strong" :style="{marginRight:'8px'}"></Icon>车流量分布
        <Switch v-model="show.flow" size="small"></Switch>
      </Button>
    </div>
    <!-- 导航 E -->

    <!-- 车流量 S -->
    <div style="position:absolute;right:20px;bottom:20px;">
      <transition name="fadeInRight">
        <Card v-if="show.flow" :style="{width:'400px'}">
          <div slot="title">
            <b style="margin-right:30px;">车流量</b>
            <div style="float:right;margin-right:30px;">
              <span style="margin-right:5px;">min</span>
              <span v-for="(item,index) in colorLevel" :key="index" class="color-leavel" :style="{color:item,background:item}"></span>
              <span style="margin-left:5px;">max</span>
            </div>
          </div>
          <div style="padding-left:10px;position:relative;">
            <DatePicker type="daterange" split-panels confirm placeholder="请选择时间范围" :transfer="true" :clearable="false" style="width: 300px"></DatePicker>
            <Slider v-model="flowTime" range :step="1" :min="0" :max="24" :tip-format="timeTipFormat" :style="{width:'300px'}"></Slider>
            <div class="slider-step">
              <div class="slider-step-inner">
                <div v-for="index in 4" :key="index" class="slider-step-title-inner"></div>
                <div class="slider-step-title">00:00</div>
              </div>
              <div class="slider-step-inner">
                <div v-for="index in 4" :key="index" class="slider-step-title-inner"></div>
                <div class="slider-step-title">04:00</div>
              </div>
              <div class="slider-step-inner">
                <div v-for="index in 4" :key="index" class="slider-step-title-inner"></div>
                <div class="slider-step-title">08:00</div>
              </div>
              <div class="slider-step-inner">
                <div v-for="index in 4" :key="index" class="slider-step-title-inner"></div>
                <div class="slider-step-title">12:00</div>
              </div>
              <div class="slider-step-inner">
                <div v-for="index in 4" :key="index" class="slider-step-title-inner"></div>
                <div class="slider-step-title">16:00</div>
              </div>
              <div class="slider-step-inner">
                <div v-for="index in 4" :key="index" class="slider-step-title-inner"></div>
                <div class="slider-step-title">20:00</div>
                <div class="slider-step-title">24:00</div>
              </div>
            </div>
            <Button type="primary" shape="circle" icon="arrow-right-b" :style="{position:'absolute',top:'0',right:'0'}"></Button>
          </div>
        </Card>
      </transition>
      <!-- <Card :style="{width:'300px'}">
        <div slot="title" :style="{padding:'0'}">
          <ButtonGroup>
            <Button>Cancel</Button>
            <Button type="primary">Confirm</Button>
          </ButtonGroup>
        </div>
        <p v-for="(item,index) in colorLeavel" :key="index" :style="{color:item}">
          <b>B</b>
        </p>
      </Card> -->
    </div>
    <!-- 车流量 E -->

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
      show: {
        flow: true,
        signal: false,
        camera: false,
        ipc: false
      },
      // 位置
      pos: {
        top: 0,
        left: 0
      },
      // 颜色等级
      colorLevel: [
        "#feeda7",
        "#fae37c",
        "#fcc954",
        "#ffa32c",
        "#fb7a1e",
        "#f5452a",
        "#d60f14",
        "#b3001c",
        "#710122",
        "#4d0022"
      ],
      // 车流量时间范围
      flowTime: [10, 16]
    };
  },
  methods: {
    // 加载路口,并绘制标记
    loadCrossing() {
      this.$http("index/d_area/treeList").then(res => {
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
                    map: this.gmap,
                    name: item.name
                  });
                  this.crossingMouseEvent(this.crossingMarkers[item.id]);
                });
              }
            });
          }
        });
        // fitBounds 地图自动调整
        this.gmap.fitBounds(bounds);
        this.fetchFlow();
      });
    },
    // 请求车流量
    fetchFlow() {
      this.$http("flow_check/f_flow/dataStatistic").then(res => {
        let data = res.data;
        if (!data.status) return;
        console.log(data.data);
        this.show.flow = true;
        let maxFlow = 0;
        data.data.forEach(item => {
          if (item.flow > maxFlow) {
            maxFlow = item.flow;
          }
        });
        data.data.forEach(item => {
          let marker = this.crossingMarkers[item.id];
          if (item.flow <= maxFlow * 0.1) {
            marker.setIcon("/static/images/crossing-marker-1.png");
          } else if (item.flow <= maxFlow * 0.2) {
            marker.setIcon("/static/images/crossing-marker-2.png");
          } else if (item.flow <= maxFlow * 0.3) {
            marker.setIcon("/static/images/crossing-marker-3.png");
          } else if (item.flow <= maxFlow * 0.4) {
            marker.setIcon("/static/images/crossing-marker-4.png");
          } else if (item.flow <= maxFlow * 0.5) {
            marker.setIcon("/static/images/crossing-marker-5.png");
          } else if (item.flow <= maxFlow * 0.6) {
            marker.setIcon("/static/images/crossing-marker-6.png");
          } else if (item.flow <= maxFlow * 0.7) {
            marker.setIcon("/static/images/crossing-marker-7.png");
          } else if (item.flow <= maxFlow * 0.8) {
            marker.setIcon("/static/images/crossing-marker-8.png");
          } else if (item.flow <= maxFlow * 0.9) {
            marker.setIcon("/static/images/crossing-marker-9.png");
          } else if (item.flow <= maxFlow * 1) {
            marker.setIcon("/static/images/crossing-marker-10.png");
          }
        });

        /* data.data.forEach(item => {
          
          // this.crossingMarkers[item.id].setIcon("/static/images/gcrossing.png");
        }); */
      });
    },
    // 路口标记的鼠标事件
    crossingMouseEvent(marker) {
      let self = this;
      let gmap = this.gmap;
      let view = null;
      google.maps.event.addListener(marker, "click", function(event) {});
      google.maps.event.addListener(marker, "mouseover", function(event) {
        let str =
          `<div class="overlay-poptip">` +
          `<div class="overlay-poptip-content">` +
          `<div class="overlay-poptip-arrow"></div>` +
          `<div class="overlay-poptip-inner">` +
          `<div class="overlay-poptip-title">` +
          "路口信息" +
          `</div>` +
          `<div class="overlay-poptip-body">` +
          this.name +
          `</div>` +
          `</div>` +
          `</div>` +
          `</div>`;
        view = new gmap.defineTitle(this, str);
      });
      google.maps.event.addListener(marker, "mouseout", function(event) {
        view.setMap(null);
      });
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
    },
    // 时间选择提示过滤
    timeTipFormat(value) {
      return (value <= 12 ? "上午" : "下午") + value + ":00";
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
    });
  },
  watch: {
    "show.flow"(bool) {
      if (!bool) {
        for (let i in this.crossingMarkers) {
          this.crossingMarkers[i].setIcon("/static/images/crossing-marker.svg");
        }
      } else {
        this.fetchFlow();
      }
    }
  }
};
</script>

<style scoped lang='less'>
@keyframes fadeInRight {
  0% {
    opacity: 0;
    transform: translate3d(100px, 0, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
.fadeInRight-enter-active {
  animation: fadeInRight 0.5s;
}
.fadeInRight-leave-active {
  animation: fadeInRight 0.5s reverse;
}

.color-leavel {
  display: inline-block;
  margin-right: 1px;
  width: 8px;
  height: 16px;
  vertical-align: middle;
}
.slider-step {
  width: 300px;
  display: table;
  margin-top: -8px;
  &-inner {
    display: table-cell;
    width: 60px;
    position: relative;
  }
  &-inner > &-title-inner:first-child:before {
    height: 8px;
  }
  &-inner:last-child > &-title-inner:nth-child(4):after {
    content: "";
    display: block;
    width: 1px;
    height: 8px;
    background: #ccc;
    position: absolute;
    top: 0;
    right: 0;
  }
  &-inner:last-child > &-title:last-child {
    position: absolute;
    top: 16px;
    right: -33px;
  }
  &-title-inner {
    float: left;
    width: 25%;
    height: 16px;
    position: relative;
    &:before {
      content: "";
      display: block;
      width: 1px;
      height: 3px;
      background: #ccc;
    }
  }
  &-title {
    transform: translateX(-16px);
  }
}
</style>
