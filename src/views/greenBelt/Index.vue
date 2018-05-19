<template>
  <div style="height:100%">
    <g-map markers @listenMap="getMap" />
    <div style="width:300px;position:absolute;top:20px;left:20px">
      <router-view></router-view>
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
    return {};
  },
  methods: {
    getMap(gmap) {
      this.$store.dispatch("gmap", gmap);
    }
  },
  created() {}
};
</script>

<style>
</style>
