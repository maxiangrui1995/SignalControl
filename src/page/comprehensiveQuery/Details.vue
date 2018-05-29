<template>
    <div style="height:100%;">
        <g-map />

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

        <!-- <router-view></router-view> -->
        <Modal :value="modal" title="电子警察视频" :mask-closable="false" :width="900" :padding="0">
            <Row :style="{'margin-bottom':'20px'}">
                <i-col span="12">
                    <video-player class="video-player-box" ref="videoPlayer" :options="playerOptions" :playsinline="true" customEventName="customstatechangedeventname">
                    </video-player>
                </i-col>
                <i-col span="12">s</i-col>
            </Row>
            <div slot="footer" :style="{display:'none'}"></div>
        </Modal>
    </div>
</template>

<script>
import GMap from "@/components/gmap";
import "videojs-flash";
export default {
  name: "comprehensiveQuery-details",
  components: { GMap },
  data() {
    return {
      modal: false,
      playerOptions: {
        // videojs options
        muted: true,
        language: "en",
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: "video/mp4",
            src:
              "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
          }
        ],
        poster: "/static/images/author.jpg"
      }
    };
  },
  mounted() {
    console.log("this is current player instance object", this.player);
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    }
  },
  methods: {
    btnClick1() {},
    btnClick2() {
      this.modal = true;
    },
    btnClick3() {},
    btnClick4() {},
    onPlayerPlay(player) {
      console.log("player play!", player);
    },
    onPlayerPause(player) {
      console.log("player pause!", player);
    },
    // ...player event

    // or listen state event
    playerStateChanged(playerCurrentState) {
      console.log("player current update state", playerCurrentState);
    },

    // player is ready
    playerReadied(player) {
      console.log("the player is readied", player);
      // you can use it to do something...
      // player.[methods]
    }
  }
};
</script>

<style>
</style>
