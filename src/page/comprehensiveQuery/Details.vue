<template>
  <div style="height:100%;">
    <g-map />

    <div style="position:absolute;top:20px;left:20px;width:300px;">
      <Card :padding="0">
        <div slot="title">{{crossing.crossing_data.name}}</div>
        <a href="javascript:;" slot="extra" @click.prevent="returnback">
          <Icon type="reply"></Icon>
          返回
        </a>
      </Card>
      <Card :padding="6" :style="{'margin-top':'10px'}">
        <img :src="crossing.imgurl" alt="路口图像" style="display:inline-block;width:90px;vertical-align:middle">
        <span>十字路口</span>
      </Card>
      <Card :padding="6" :style="{'margin-top':'10px'}">
        <Tabs size="small">
          <TabPane label="信号机">
            <Table :columns="columns" :data="crossing.signal_data" size="small" :showHeader='false'></Table>
          </TabPane>
          <TabPane label="备用电源">
            <Table :columns="columns" :data="crossing.ups_data" size="small" :showHeader='false'></Table>
          </TabPane>
          <TabPane label="车检器">
            <Table :columns="columns" :data="crossing.ipc_data" size="small" :showHeader='false'></Table>
          </TabPane>
          <TabPane label="电子警察">
            <Table :columns="columns" :data="crossing.camera_data" size="small" :showHeader='false'></Table>
          </TabPane>
        </Tabs>
      </Card>
    </div>

    <Card :style="{position:'absolute',top:'20px',left:'50%',transform:'translateX(-50%)'}" :padding="0">
      <Tooltip content="实时监控">
        <Button type="text" @click="realtimeMonitoring">
          <Icon type="cloud" size="20"></Icon>
        </Button>
      </Tooltip>
      <Tooltip content="电子警察视频">
        <Button type="text" @click="electronicPoliceVideo">
          <Icon type="eye" size="20"></Icon>
        </Button>
      </Tooltip>
      <Tooltip content="车流量视频">
        <Button type="text" @click="vehicleTrafficVideo">
          <Icon type="android-car" size="20"></Icon>
        </Button>
      </Tooltip>
      <Tooltip content="车流量统计">
        <Button type="text" @click="trafficStatistics">
          <Icon type="stats-bars" size="20"></Icon>
        </Button>
      </Tooltip>
    </Card>

    <y-modalmonitor :model="modal_monitor" :data="signal_data" :machine-ip="signal_ip" :ups-ip="ups_ip" :signal-id="signal_id" @visible-change="visibleChange"></y-modalmonitor>
    <Modal v-model="modal_police" title="电子警察视频" :mask-closable="false" :width="900" class-name="special-modal">
      <div style="padding:6px;">
        <Row :gutter="16" :style="{'margin-bottom':'10px'}">
          <i-col span="12" v-for="item in data_police" :key="item.id">
            <video-player class="vjs-custom-skin" :ref="'videoPlayer'+item.id" :options="item.options" @play="onPlayerPlay($event)" @statechanged="playerStateChanged($event)" style="width:100%;">
            </video-player>
          </i-col>
        </Row>
      </div>
    </Modal>
    <Modal v-model="modal_traffic" title="车流量视频" :mask-closable="false" :width="900" class-name="special-modal">
      <div style="padding:6px;">
        <Row :gutter="16" :style="{'margin-bottom':'10px'}">
          <i-col span="12" v-for="item in data_traffic" :key="item.id">
            <video-player class="vjs-custom-skin" :ref="'videoPlayer'+item.id" :options="item.options" @play="onPlayerPlay($event)" @statechanged="playerStateChanged($event)" style="width:100%;">
            </video-player>
          </i-col>
        </Row>
      </div>
    </Modal>
  </div>
</template>

<script>
import GMap from "@/components/gmap";
import YModalmonitor from "./components/RealtimeMonitoring";
import { dataView } from "@/api/d_crossing";
import { getMachinePlan } from "@/api/d_machine_control";
import "videojs-flash";
export default {
  name: "comprehensiveQuery-details",
  components: { GMap, YModalmonitor },
  data() {
    return {
      id: this.$route.params.id,
      // 路口信息
      crossing: {
        imgurl: require("@/assets/imgs/a.jpg"),
        crossing_data: {},
        signal_data: [],
        ups_data: [],
        ipc_data: [],
        camera_data: []
      },
      //
      columns: [
        {
          title: "ip",
          key: "ip"
        }
      ],
      // 设备方案信息
      signal_data: [],
      signal_ip: "",
      signal_id: "",
      ups_ip: "",
      // 实时监控modal
      modal_monitor: false,
      modal_police: false,
      modal_traffic: false,
      // 电子警察
      data_police: [],
      // 车流量
      data_traffic: []
    };
  },
  methods: {
    // 加载路口设备
    dataView() {
      dataView({
        id: this.id
      }).then(res => {
        if (res.status === "1") {
          let data = res.data;
          let signal = data.machine;
          let ups = data.ups;
          let ipc = data.ipc;
          let camera = data.camera;
          let crossing = data.crossing;

          this.crossing.crossing_data = crossing;
          this.crossing.signal_data = signal ? [signal] : [];
          this.crossing.ups_data = ups ? [ups] : [];
          this.crossing.ipc_data = ipc ? ipc : [];
          this.crossing.camera_data = camera ? camera : [];
          this.crossing.name = res.data.crossing.name;
          this.signal_ip = signal.ip;
          this.signal_id = signal.id;
          this.ups_ip = ups.ip;
          this.loadMarker();
        }
      });
    },
    // 实时监控
    realtimeMonitoring() {
      this.modal_monitor = true;
      getMachinePlan({
        machine_id: this.signal_id
      }).then(res => {
        if (res.status === "1") {
          this.signal_data = res.data;
        }
      });
    },
    // 电子警察视频
    electronicPoliceVideo() {
      this.modal_police = true;
    },
    // 车流量视频
    vehicleTrafficVideo() {
      this.modal_traffic = true;
    },
    // 车流量统计
    trafficStatistics() {},

    visibleChange(value) {
      this.modalpolice = value;
    },
    /* 加载地图点 */
    loadMarker() {
      if (this.gmap) {
        let crossing = this.crossing.crossing_data;
        let title = crossing.name;
        let marker = new google.maps.Marker({
          position: new google.maps.LatLng(crossing.lat, crossing.lng),
          icon: "/static/images/gcrossing.png",
          title: title,
          id: crossing.id,
          map: this.gmap
        });
        this.gmap.panTo(marker.position);
        let info = new google.maps.InfoWindow({
          content: "&nbsp;" + title
        });
        info.open(this.gmap, marker);
      }
    },
    returnback() {
      this.$router.push({
        path: "/comprehensiveQuery"
      });
    },
    onPlayerEnded(player) {
      console.log("player ended!", player);
    },
    onPlayerPlay(player) {
      console.log("开始播放！", player);
    },
    playerStateChanged(playerCurrentState) {
      // console.log("player current update state", playerCurrentState);
    }
  },
  created() {
    this.dataView();
  },
  computed: {
    gmap() {
      return this.$store.state.gmap;
    }
  },
  mounted() {},
  watch: {
    modal_police() {
      if (this.modal_police) {
        this.data_police = [];
        this.crossing.camera_data.forEach(item => {
          if (item.type === "2") {
            item.options = {
              height: "340",
              width: "100%",
              sources: [
                {
                  type: "rtmp/mp4",
                  src: item.video_url
                }
              ],
              techOrder: ["flash"],
              autoplay: true,
              controls: true,
              notSupportedMessage: "此视频暂无法播放，请稍后再试"
            };
            this.data_police.push(item);
          }
        });
      } else {
      }
    },
    modal_traffic() {
      if (this.modal_traffic) {
        this.data_traffic = [];
        this.crossing.camera_data.forEach(item => {
          if (item.type === "1") {
            item.options = {
              height: "340",
              width: "100%",
              sources: [
                {
                  type: "rtmp/mp4",
                  src: item.video_url
                }
              ],
              techOrder: ["flash"],
              autoplay: true,
              controls: true,
              notSupportedMessage: "此视频暂无法播放，请稍后再试"
            };
            this.data_traffic.push(item);
          }
        });
      } else {
      }
    }
  }
};
</script>

<style>
</style>
