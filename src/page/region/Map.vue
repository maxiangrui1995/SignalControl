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
      data: {},
      id1: this.$route.params.id1,
      id2: this.$route.params.id2,
      id3: this.$route.params.id3,
      name1: "",
      name2: "",
      name3: ""
    };
  },
  methods: {
    // 请求数据
    fetchCrossing() {
      this.$store.dispatch("setCrossing");
    },
    // 过滤数据
    formatterCrossing(data) {
      data.forEach(item => {
        if (item.id == this.id1 && item.children) {
          this.name1 = item.name;
          item.children.forEach(item => {
            if (item.id == this.id2 && item.children) {
              this.name2 = item.name;
              item.children.forEach(item => {
                if (item.id == this.id3) {
                  this.data = item;
                  this.name3 = item.name;
                  this.drawCrossingMarker();
                }
              });
            }
          });
        }
      });
    },
    // 返回
    returnBack() {
      this.$router.push({
        path: "/region/" + this.id1 + "/" + this.id2
      });
    },
    // 绘制地图标记
    drawCrossingMarker() {
      let data = this.data;
      let gmap = this.gmap;
      let p = new google.maps.LatLng(data.lat, data.lng);
      let marker = new google.maps.Marker({
        position: p,
        icon: "/static/images/map-crossing.svg",
        map: gmap,
        title: data.name,
        id: data.id
      });
      gmap.panTo(p);

      // 叠加层
      let str = `<div class="overlay-poptip overlay-poptip-blue" style="min-width:300px;">
            <div class="overlay-poptip-content">
              <div class="overlay-poptip-arrow"></div>
              <div class="overlay-poptip-inner">
                <div class="overlay-poptip-title">
                  <span class="overlay-poptip-title-header">${data.name}</span>
                  <div class="overlay-poptip-title-content">
                    <div class="overlay-poptip-title-content-item">普通十字路口</div>
                    <div class="overlay-poptip-title-content-item">
                    ${this.formatterLatLng(data.lat)}N &nbsp;&nbsp;&nbsp;&nbsp;
                    ${this.formatterLatLng(data.lng)}S
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
      self.crossingOverlay = new gmap.defineTitle(marker, str);
    },
    // 地图经纬度格式转换为 度°分`秒`
    formatterLatLng(latlng) {
      if (!latlng) {
        return "";
      } else {
        let ddd = Math.floor(latlng);
        let dec = (latlng - ddd) * 60;
        let mmm = Math.floor(dec);
        let dec2 = (dec - mmm) * 60;
        let sss = Math.floor(dec2);
        return `${ddd}°${mmm}"${sss}"`;
      }
    }
  },
  computed: {
    crossing() {
      let data = this.$store.state.crossing;
      return data;
    },
    gmap() {
      return this.$store.state.gmap;
    }
  },
  watch: {
    crossing(data) {
      this.formatterCrossing(data);
    },
    gmap() {
      if (!this.crossing.length) {
        this.fetchCrossing();
      } else {
        this.formatterCrossing(this.crossing);
      }
    }
  },
  created() {}
};
</script>

<style>
</style>
