<template>
  <div style="width:100%;height:100%">
    <g-map :lat="lat" :lng="lng" :markers="true" @listenMap="getMap" />
    <div style="width:300px;position:absolute;top:20px;left:20px">
      <router-view/>
    </div>
  </div>
</template>

<script>
import GMap from "@/components/GMap";

export default {
  components: {
    GMap
  },
  data() {
    return {
      lat: 119.77495282888412,
      lng: 36.37174657521467
    };
  },
  methods: {
    
    getMap(gmap) {
      this.gmap = gmap;
    },
    loadMarkers() {
      console.log(this.region);
      for (let item of this.region) {
        if (item.children) {
          for (let item2 of item.children) {
            if (item2.children) {
              for (let item3 of item2.children) {
                let marker = new google.maps.Marker({
                  position: new google.maps.LatLng(item3.lat, item3.lng),
                  icon: "./static/images/gcrossing.png",
                  title: item3.name,
                  id: item3.id,
                  map: this.gmap
                });
              }
            }
          }
        }
      }
    }
  },
  created() {}
};
</script>

<style>
</style>
