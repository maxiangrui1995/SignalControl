<template>
    <div>
        <canvas id="my-canvas"></canvas>
    </div>
</template>

<script>
import Draw from "@/untils/signal";
export default {
  props: {
    width: [Number, String],
    height: [Number, String],
    crossingData: Array
  },
  data() {
    return {};
  },
  created() {
    this.$nextTick(() => {
      this.start();
    });
  },
  methods: {
    start() {
      let canvas = document.getElementById("my-canvas");
      canvas.width = this.width;
      canvas.height = this.height;
      canvas.style.background = "rgb(57, 61, 73)";
      Draw(canvas).view({
        crossingData: this.crossingData
      });
    }
  }
};
</script>

<style>
</style>
