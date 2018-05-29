<template>
    <Modal :value="modal" title="信号机实时监控" :mask-closable="false" :width="900" :padding="0" class-name="special-modal">
        <!--  <div class="box">
            <div class="left">
                <y-signalView :start="modal" :lightData="lightData" :phaseData="phaseData" :count-time="count" :width="600" :height="500" :scale="0.8"></y-signalView>
            </div>
            <div class="right">
                <Tabs value="name1" :style="{width:'280px'}">
                    <TabPane label="信号机" name="name1">
                        <y-scontrol :realtime-data="realtimeSignalData" :machine-plan="machinePlan"></y-scontrol>
                    </TabPane>
                    <TabPane label="备用电源" name="name2">标签二的内容</TabPane>
                </Tabs>
            </div>
        </div> -->
        <div slot="footer" :style="{display:'none'}"></div>
    </Modal>
</template>

<script>
export default {
  data() {
    return {
      modal: true,
      id: this.$route.params.id
    };
  },
  methods: {},
  watch: {
    modal() {
      console.log(this.modal);
    }
  },
  destroyed() {
    console.log(1);

    this.$router.push("/comprehensiveQuery/" + this.id);
  }
};
</script>

<style>
</style>
