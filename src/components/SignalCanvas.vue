<template>
    <canvas id="dh-canvas"></canvas>
</template>

<script>
export default {
  data() {
    return {
      dom: null
    };
  },
  created() {
    this.$nextTick(() => {
      this.initDOM();
    });
  },
  methods: {
    initDOM() {
      let canvas = (this.dom = document.getElementById("dh-canvas"));
      canvas.width = 600;
      canvas.height = 400;
      canvas.style.background = "#000";
    }
  }
};
</script>

<style>
</style>
