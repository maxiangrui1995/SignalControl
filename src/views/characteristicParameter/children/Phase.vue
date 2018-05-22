<template>
    <div style="text-align:center;overflow:auto">
        <y-signalView :phaseData="phaseData" :lightData="lightData"></y-signalView>
    </div>
</template>

<script>
import YSignalView from "@/components/SignalView.vue";
import { $d_phaseinfo } from "@/api";
import Draw from "@/untils/signal";
export default {
  components: {
    YSignalView
  },
  data() {
    return {
      id: this.$route.params.id,
      phaseData: "",
      lightData: []
    };
  },
  created() {
    this.$nextTick(() => {
      this.loadData();
    });
  },
  methods: {
    loadData() {
      $d_phaseinfo
        .dataList({
          plan_id: this.id,
          page: 1,
          rows: 16
        })
        .then(res => {
          this.lightData = res.data.list;
        });
    }
  }
};
</script> 

<style>
</style>
