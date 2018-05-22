<template>
  <div style="height:100%">
    <g-map markers />
    <div style="position:absolute;top:20px;left:20px">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import GMap from "@/components/GMap.vue";
export default {
  name: "regionalManagement",
  components: {
    GMap
  },
  data() {
    return {};
  }
};
</script>

<style>
</style>
