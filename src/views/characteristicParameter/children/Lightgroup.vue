<template>
  <div style="text-align:center;overflow:auto">
    <y-signalView :start="true" :phaseData="phaseData" :lightData="lightData"></y-signalView>
  </div>
</template>

<script>
import YSignalView from "@/components/SignalView.vue";
export default {
  components: {
    YSignalView
  },
  data() {
    return {
      id: this.$route.params.id,
      phaseData: ""
    };
  },
  created() {
    if (!this.$store.state.characterModule.phaseinfo.length) {
      this.$store.dispatch("characterModule/SET_PHASEINFO", this.id);
    }
  },
  methods: {},
  computed: {
    lightData() {
      return this.$store.state.characterModule.phaseinfo;
    }
  }
};
</script> 

<style>
</style>
