<template>
  <div style="height:100%;">
    <g-map />
    <router-view></router-view>
  </div>
</template>

<script>
import GMap from "@/components/gmap";
export default {
  name: "greenBelt",
  components: { GMap }
};
</script>

<style>
</style>
