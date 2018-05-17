<template>
    <div style="text-align:center;overflow:auto">
        <!-- <y-scanvas :width="width" :height="height" :crossingData="crossingData"></y-scanvas> -->
        <canvas id="my-canvas"></canvas>
    </div>
</template>

<script>
import YScanvas from "@/components/SCanvas.vue";
import axios from "axios";
import Draw from "@/untils/signal";
export default {
  components: {
    YScanvas
  },
  data() {
    return {
      width: 800,
      height: 600,
      id: this.$route.params.id,
      crossingData: []
    };
  },
  created() {
    this.$nextTick(() => {
      this.loadCrossing();
    });
  },
  methods: {
    loadCrossing() {
      let canvas = document.getElementById("my-canvas");
      canvas.width = this.width;
      canvas.height = this.height;
      canvas.style.background = "rgb(57, 61, 73)";
      axios
        .all([
          axios.post("d_crossing/getVar"),
          axios.post("d_phaseinfo/dataList", {
            plan_id: this.id,
            page: 1,
            rows: 16
          })
        ])
        .then(
          axios.spread(function(d_crossing, d_phaseinfo) {
            Draw(canvas).view({
              crossingData: d_crossing.data.data.road_data,
              lightData: d_phaseinfo.data.data.list
            });
          })
        );
    }
  }
};
</script> 

<style>
</style>
