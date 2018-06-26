<template>
  <div style="position:absolute;top:0;left:0;width:100%;height:100%;">
    <YGMap />

    <div style="position: absolute; top: 20px; left: 20px;">
      <Button type="primary" shape="circle" icon="reply" @click="returnBack"></Button>
    </div>
  </div>
</template>

<script>
import YGMap from "@/components/map";
export default {
  components: { YGMap },
  data() {
    return {
      data: [],
      id: this.$route.params.id,
      page: 1,
      rows: 999,
      total: 0,
      markers: {},
      positive_phase: [
        {
          value: "0",
          title: "由东向西左转"
        },
        {
          value: "1",
          title: "由东向西直行"
        },
        {
          value: "2",
          title: "由东向西右转"
        },
        {
          value: "3",
          title: "由东向西行人"
        },
        {
          value: "4",
          title: "由南向北左转"
        },
        {
          value: "5",
          title: "由南向北直行"
        },
        {
          value: "6",
          title: "由南向北右转"
        },
        {
          value: "7",
          title: "由南向北行人"
        },
        {
          value: "8",
          title: "由西向东左转"
        },
        {
          value: "9",
          title: "由西向东直行"
        },
        {
          value: "10",
          title: "由西向东右转"
        },
        {
          value: "11",
          title: "由西向东行人"
        },
        {
          value: "12",
          title: "由北向南左转"
        },
        {
          value: "13",
          title: "由北向南直行"
        },
        {
          value: "14",
          title: "由北向南右转"
        },
        {
          value: "15",
          title: "由北向南行人"
        }
      ]
    };
  },
  methods: {
    // 加载数据
    fetchData() {
      this.$http("index/d_green_wave_sub/dataList", {
        pid: this.id,
        page: this.page,
        rows: this.rows
      }).then(res => {
        let data = res.data;
        if (res.status === "1") {
          this.data = data.list;
          this.total = ~~data.total;
          this.drawMapMarkers();
        }
        this.loading = false;
      });
    },
    // 绘制地图标记
    drawMapMarkers() {
      if (!this.data.length) return this.$Message.info("暂无数据");
      let bounds = new google.maps.LatLngBounds();
      let latlngArray = [];
      this.data.forEach(item => {
        let p = new google.maps.LatLng(item.lat, item.lng);
        bounds.extend(p);
        latlngArray.push(p);
        let marker = (this.markers[item.id] = new google.maps.Marker({
          position: p,
          icon: "/static/images/map-crossing.svg",
          map: this.gmap,
          title: item.name,
          data: item
        }));
        this.markersMouseEvent(marker);
      });
      var trackPath = new google.maps.Polyline({
        path: latlngArray,
        strokeColor: "#FF0000", // 线条颜色
        strokeOpacity: 1.0, // 线条透明度
        strokeWeight: 2, // 线条粗细
        map: this.gmap
      });

      this.gmap.fitBounds(bounds);
    },
    // 标记的鼠标事件
    markersMouseEvent(marker) {
      let self = this;
      let gmap = this.gmap;
      google.maps.event.addListener(marker, "click", function(event) {
        let data = this.data;
        let positive_phase = self.positive_phase.map(item => {
          return item.title;
        });
        let str = `<div class="overlay-poptip overlay-poptip-blue" style="min-width:300px;">
            <div class="overlay-poptip-content">
              <div class="overlay-poptip-arrow"></div>
              <div class="overlay-poptip-inner">
                <div class="overlay-poptip-title">
                  <span class="overlay-poptip-title-header">${data.name}</span>
                  <div class="overlay-poptip-title-content">
                    <div class="overlay-poptip-title-content-item">${
                      positive_phase[data.positive_phase]
                    }</div>
                    <div class="ivu-row">
                      <div class="ivu-col ivu-col-span-8"><div class="overlay-poptip-title-content-item" style="font-size:1.12em">${
                        data.phase_difference
                      }</div><div class="overlay-poptip-title-content-item" style="color:#ccc;">路口相位差</div></div>
                      <div class="ivu-col ivu-col-span-8" style="text-align:right;"><div class="overlay-poptip-title-content-item">${
                        data.road_distance
                      }m</div><div  class="overlay-poptip-title-content-item" style="color:#ccc;">路段距离</div></div>
                      <div class="ivu-col ivu-col-span-8" style="text-align:right;"><div class="overlay-poptip-title-content-item">${
                        data.forward_speed
                      }m/s</div><div class="overlay-poptip-title-content-item" style="color:#ccc;">正向速度</div></div>
                    </div>
                  </div>
                </div>
                <div class="overlay-poptip-body">
                  <div class="ivu-btn-group">
                    <button type="button" class="ivu-btn">详情</button>
                    <button type="button" class="ivu-btn">下载</button>
                    <button type="button" class="ivu-btn">编辑</button>
                    <button type="button" class="ivu-btn">删除</button>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
        self.crossingOverlay = new gmap.defineTitle(this, str);
      });
    },
    returnBack() {
      this.$router.push({
        path: "/greenBelt"
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
      this.fetchData();
    }
  },
  created() {}
};
</script>

<style>
</style>
