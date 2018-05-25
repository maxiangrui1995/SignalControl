<template>
  <div style="height:100%">
    <g-map />
    <Card :style="{position:'absolute',top:'20px',left:'20px',width:'300px'}" :padding="0">
      <div slot="title">{{breadName}}</div>
      <a href="javascript:;" slot="extra" @click.prevent="returnback">
        <Icon type="reply"></Icon>
        返回
      </a>
      <Table :columns="columns1" :data="data1" size="small"></Table>
      <Table :columns="columns2" :data="data2" size="small"></Table>
      <Table :columns="columns3" :data="data3" size="small"></Table>
      <Table :columns="columns4" :data="data4" size="small"></Table>
    </Card>
    <Card :style="{position:'absolute',top:'20px',left:'50%','margin-left':'-101px'}" :padding="0">
      <Tooltip content="实时监控">
        <Button type="text" @click="btnClick1">
          <Icon type="cloud" size="20"></Icon>
        </Button>
      </Tooltip>
      <Tooltip content="电子警察视频">
        <Button type="text" @click="btnClick2">
          <Icon type="eye" size="20"></Icon>
        </Button>
      </Tooltip>
      <Tooltip content="车流量视频">
        <Button type="text" @click="btnClick3">
          <Icon type="android-car" size="20"></Icon>
        </Button>
      </Tooltip>
      <Tooltip content="车流量统计">
        <Button type="text" @click="btnClick4">
          <Icon type="stats-bars" size="20"></Icon>
        </Button>
      </Tooltip>
    </Card>
    <y-signal :modal="modal1" @visibleChange="visibleChange"></y-signal>
  </div>
</template>

<script>
import GMap from "@/components/GMap";
import YSignal from "./compontents/Signal";
import { $d_crossing } from "@/api";
export default {
  components: {
    GMap,
    YSignal
  },
  data() {
    return {
      crossing_id: this.$route.query.crossing_id,
      modal1: false,
      breadName: "",
      columns1: [
        {
          title: "信号机",
          key: "ip"
        }
      ],
      columns2: [
        {
          title: "备用电源",
          key: "ip"
        }
      ],
      columns3: [
        {
          title: "车检器",
          key: "ip"
        }
      ],
      columns4: [
        {
          title: "相机",
          key: "ip"
        }
      ],
      data1: [],
      data2: [],
      data3: [],
      data4: []
    };
  },
  created() {},
  methods: {
    btnClick1() {
      this.modal1 = true;
    },
    btnClick2() {},
    btnClick3() {},
    btnClick4() {},
    visibleChange(value) {
      this.modal1 = value;
    },
    // 返回
    returnback() {},
    // 加载一个路口下面的详细信息
    loadData() {
      $d_crossing
        .dataView({
          id: this.crossing_id
        })
        .then(res => {
          this.data1 = res.data.machine ? [res.data.machine] : [];
          this.data2 = res.data.ups ? [res.data.ups] : [];
          this.data3 = res.data.ipc ? res.data.ipc : [];
          this.data4 = res.data.camera ? res.data.camera : [];
        });
    }
  },
  computed: {
    regionData() {
      let data = this.$store.state.regionModule.data;
      let region = [];
      let name = (this.name = []);
      if (data) {
        data.forEach(element1 => {
          if (element1.children) {
            element1.children.forEach(element2 => {
              if (element2.children) {
                element2.children.forEach(element3 => {
                  if (element3.id === this.crossing_id) {
                    this.breadName = element3.name;
                    region = element3.children;
                  }
                });
              }
            });
          }
        });
      }

      return region;
    }
  },
  watch: {
    regionData() {}
  },
  created() {
    this.loadData();
  }
};
</script>

<style scoped lang='less'>
</style>
