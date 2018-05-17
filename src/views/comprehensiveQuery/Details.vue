<template>
  <div style="height:100%">
    <g-map :lat="lat" :lng="lng" />
    <div style="width:300px;position:absolute;top:20px;left:20px">
      <Card dis-hover>
        <p slot="title">The standard card</p>
        <p>Content of card</p>
        <p>Content of card</p>
        <p>Content of card</p>
      </Card>
    </div>
    <Card :style="{position:'absolute',top:'20px',left:'50%','margin-left':'-93px'}" :padding="10">
      <Tooltip content="实时监控">
        <Button type="text" @click="btnClick1">
          <Icon type="ios-color-filter" size="20"></Icon>
        </Button>
      </Tooltip>
      <Tooltip content="电子警察视频">
        <Button type="text" @click="btnClick2">
          <Icon type="ios-color-filter" size="20"></Icon>
        </Button>
      </Tooltip>
      <Tooltip content="车流量视频">
        <Button type="text" @click="btnClick3">
          <Icon type="ios-color-filter" size="20"></Icon>
        </Button>
      </Tooltip>
      <Tooltip content="车流量统计">
        <Button type="text" @click="btnClick4">
          <Icon type="ios-color-filter" size="20"></Icon>
        </Button>
      </Tooltip>
    </Card>
    <y-signal :modal="modal1" @visibleChange="visibleChange"></y-signal>
  </div>
</template>

<script>
import GMap from "@/components/GMap";
import YSignal from "./compontents/Signal";
export default {
  components: {
    GMap,
    YSignal
  },
  data() {
    return {
      lat: 119.77495282888412,
      lng: 36.37174657521467,
      id: this.$route.params.id,
      modal1: false
    };
  },
  created() {
    console.log(this.id);
  },
  methods: {
    btnClick1() {
      this.modal1 = true;
    },
    btnClick2() {},
    btnClick3() {},
    btnClick4() {},
    visibleChange(value) {
      this.modal1 = value;
    }
  }
};
</script>

<style>
</style>
