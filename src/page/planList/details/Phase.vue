<template>
    <div>
        <!-- <Alert show-icon closable :style="{width:'220px','margin':'0 auto'}">点击信号灯图标可进行编辑</Alert> -->
        <canvas ref="canvas" width="800" height="600"></canvas>
    </div>
</template>

<script>
import DRAW from "@/untils/signal";
export default {
  name: "lightgroup",
  data() {
    return {};
  },
  created() {
    this.$nextTick(() => {
      let v = new DRAW(this.$refs.canvas);
      // 传入路口数据
      let road_data = [
        {
          direction: "1",
          roadnum: "3",
          target: ["3", "2", "4"]
        },
        {
          direction: "3",
          roadnum: "3",
          target: ["3", "2", "4"]
        },
        {
          direction: "5",
          roadnum: "3",
          target: ["3", "2", "4"]
        },
        {
          direction: "7",
          roadnum: "3",
          target: ["3", "2", "4"]
        }
      ];
      v.draw({
        CROSSINGDATA: road_data
      });
    });
  }
};
</script>

<style>
</style>
