<template>
    <div style="width:300px;">
        <Card :padding="10">
            <p slot="title">
                <Breadcrumb>
                    <BreadcrumbItem :to="'/regionalManagement/'+id+'/'+pid">上一级</BreadcrumbItem>
                    <BreadcrumbItem>{{name}}</BreadcrumbItem>
                </Breadcrumb>
            </p>
            <a href="javascript:;" slot="extra" @click.prevent="createData">
                <Icon type="plus"></Icon>
                新增
            </a>
            <Tabs value="signal">
                <TabPane label="信号机" name="signal">
                    <y-signal :data="signalData"></y-signal>
                </TabPane>
                <TabPane label="备用电源" name="ups">
                    <y-ups :data="upsData"></y-ups>
                </TabPane>
                <TabPane label="车检服务器" name="ipc">
                    <y-ipc :data="ipcData"></y-ipc>
                </TabPane>
                <TabPane label="电子警察" name="camera">
                    <y-camera :data="cameraData"></y-camera>
                </TabPane>
            </Tabs>
        </Card>
    </div>
</template>

<script>
import GMap from "@/components/GMap";
import YSignal from "./Details/Signal";
import YUps from "./Details/Ups";
import YCamera from "./Details/Camera";
import YIpc from "./Details/Ipc";
import { $d_crossing } from "@/api";
export default {
  components: {
    YSignal,
    YUps,
    YCamera,
    YIpc
  },
  data() {
    return {
      id: this.$route.params.id,
      pid: this.$route.params.pid,
      crossing_id: this.$route.params.crossing_id,
      name: "",
      signalData: [],
      upsData: [],
      ipcData: [],
      cameraData: []
    };
  },
  computed: {
    regionData() {
      let data = this.$store.state.regionModule.data;
      let region = [];
      if (data) {
        data.forEach(element => {
          if (element.id === this.id) {
            if (element.children) {
              element.children.forEach(element => {
                if (element.id === this.pid) {
                  if (element.children) {
                    element.children.forEach(element => {
                      if (element.id === this.crossing_id) {
                        this.name = element.name;
                        region = element.children;
                      }
                    });
                  }
                }
              });
            }
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
    $d_crossing
      .dataView({
        id: this.crossing_id
      })
      .then(res => {
        let data = res.data;
        this.signalData = data.machine ? [data.machine] : [];
        this.upsData = data.ups ? [data.ups] : [];
        this.ipcData = data.ipc ? data.ipc : [];
        this.cameraData = data.camera ? data.camera : [];
      });
  },
  methods: {
    createData() {}
  }
};
</script>

<style>
</style>
