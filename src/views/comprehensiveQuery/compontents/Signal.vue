<template>
    <Modal :value="modal" title="信号机实时监控" :mask-closable="false" :width="900" class-name="special-modal" @on-visible-change="change">
        <y-signal></y-signal>
        <div slot="footer" :style="{display:'none'}"></div>
    </Modal>
</template>

<script>
import YSignal from "@/components/SignalCanvas.vue";
export default {
  components: {
    YSignal
  },
  props: {
    modal: Boolean
  },
  created() {},
  computed: {},
  methods: {
    change(value) {
      this.$emit("visibleChange", value);
    }
  }
};
</script>

<style lang="less">
.special-modal {
  .ivu-modal-footer {
    display: none;
  }
  .ivu-modal-body {
    padding: 6px;
  }
}
</style>
