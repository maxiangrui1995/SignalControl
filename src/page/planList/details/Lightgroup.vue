<template>
    <div>
        <!-- <Alert show-icon closable :style="{width:'220px','margin':'0 auto'}">点击信号灯图标可进行编辑</Alert> -->
        <canvas ref="canvas" id="canvas" width="800" height="600"></canvas>
    </div>
</template>

<script>
import DRAW from "@/untils/signal";
import { dataList } from "@/api/d_phaseinfo";
export default {
  name: "lightgroup",
  data() {
    return { id: this.$route.params.id };
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
      dataList({
        plan_id: this.id,
        page: 1,
        rows: 20
      }).then(res => {
        if (res.status) {
          v.draw({
            CROSSINGDATA: road_data,
            LIGHTDATA: res.data.list
          });
        }
      });
    });
  }
};
</script>

<style>
</style>
