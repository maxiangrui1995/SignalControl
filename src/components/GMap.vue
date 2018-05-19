<template>
  <div style="width:100%;height:100%;">
    <div id="gmap" style="height:100%;"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gmap: null,
      lat: "119.77495282888412",
      lng: "36.37174657521467"
    };
  },
  props: {
    markers: Boolean
  },
  methods: {
    loadGMap() {
      function LocalMapType() {}
      LocalMapType.prototype.tileSize = new google.maps.Size(256, 256);
      LocalMapType.prototype.maxZoom = 18;
      LocalMapType.prototype.minZoom = 10;
      LocalMapType.prototype.getTile = function(coord, zoom, ownerDocument) {
        let img = ownerDocument.createElement("img");
        img.style.width = this.tileSize.width + "px";
        img.style.height = this.tileSize.height + "px";
        let strURL = `${window.googleMapsFilesUrl}tilemap/${zoom}/${coord.x}/${
          coord.y
        }.png`;
        let errorURL = `${window.googleMapsFilesUrl}404.png`;

        let imgObj = new Image();
        imgObj.src = strURL;
        imgObj.onload = function() {
          img.src = this.src;
        };
        imgObj.onerror = function() {
          img.src = errorURL;
        };
        return img;
      };
      let localMapType = new LocalMapType();
      let center = new google.maps.LatLng(this.lng, this.lat);
      let gMap = new google.maps.Map(document.getElementById("gmap"), {
        zoom: 14,
        center: center,
        panControl: false,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        overviewMapControl: false
      });
      gMap.mapTypes.set("locaMap", localMapType);
      gMap.setMapTypeId("locaMap");

      this.gmap = gMap;
      this.$emit("listenMap", gMap);
      if (this.markers) {
        this.drawMarkers();
      }
    },
    drawMarkers() {
      let markers = {};
      for (let item of this.region) {
        if (item.children) {
          for (let item2 of item.children) {
            if (item2.children) {
              for (let item3 of item2.children) {
                let marker = new google.maps.Marker({
                  position: new google.maps.LatLng(item3.lat, item3.lng),
                  icon: "/static/images/gcrossing.png",
                  title: item3.name,
                  id: item3.id,
                  map: this.gmap
                });
                markers[item3.id] = marker;
              }
            }
          }
        }
      }
    }
  },
  mounted() {
    this.loadGMap();
  },
  computed: {
    region() {
      return this.$store.state.regionModule.data;
    }
  },
  watch: {
    region() {
      if (this.markers) {
        this.drawMarkers();
      }
    }
  },
  created() {
    if (!this.$store.state.regionModule.data.length) {
      this.$store.dispatch("regionModule/SET_DATA");
    }
    this.$nextTick(() => {
      this.loadGMap();
    });
  }
};
</script>

<style scoped>
</style>
