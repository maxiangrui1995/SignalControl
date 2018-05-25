<template>
  <div style="height:100%;">
    <g-map markers @listenMap="getMap" />
    <router-view></router-view>
  </div>
</template>

<script>
import GMap from "@/components/GMap";

export default {
  components: {
    GMap
  },
  data() {
    return {};
  },
  methods: {
    getMap(gmap) {
      this.$store.dispatch("gmap", gmap);
    }
  }
};
</script>

<style>
</style>
