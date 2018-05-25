<template>
  <Modal :value="modal" title="信号机实时监控" :mask-closable="false" :width="900" :padding="0" class-name="special-modal" @on-visible-change="change">
    <div class="box">
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
    </div>
    <div slot="footer" :style="{display:'none'}"></div>
  </Modal>
</template>

<script>
import YSignalView from "@/components/SignalView.vue";
import YScontrol from "./SignalControl";
import { $d_machine_control, $d_crossing } from "@/api";
export default {
  components: {
    YSignalView,
    YScontrol
  },
  data() {
    return {
      crossing_id: this.$route.query.crossing_id,
      machine_id: "",
      wsUrl: "",
      lightData: [],
      phaseData: "",
      // 倒计时
      count: 0,
      // 实时信号机数据
      realtimeSignalData: {},
      // 信号机当前方案所有信息
      machinePlan: {},
      // 信号机IP
      signal_ip: ""
    };
  },
  props: {
    modal: Boolean
  },
  methods: {
    change(value) {
      this.$emit("visibleChange", value);
    },
    /* 获取websocket地址 */
    getVar() {
      $d_machine_control.getVar().then(res => {
        this.wsUrl =
          "ws://" +
          res.data.web_socket_host +
          ":" +
          res.data.web_socket_port +
          "/";
        this.getWeb();
      });
    },
    /* 获取信号机方案 */
    getSignal() {
      $d_crossing
        .dataView({
          id: this.crossing_id
        })
        .then(res => {
          let machine_id = res.data.machine.id;
          this.signal_ip = res.data.machine.ip;
          $d_machine_control
            .getMachinePlan({
              machine_id: machine_id
            })
            .then(res => {
              if (res.data.data_phaseinfo) {
                this.lightData = res.data.data_phaseinfo;
                this.machinePlan = res.data;
                this.getVar();
              }
            });
        });
    },
    /* websocket获取实时数据 */
    getWeb() {
      let w = (this.websocket = new WebSocket(this.wsUrl));
      let self = this;
      w.onopen = function() {
        console.log("websocket开始连接");
        w.send(self.crossing_id);
      };
      w.onmessage = function(evt) {
        var data = JSON.parse(evt.data);
        if (data.status) {
          let machine = data.data.machine;
          self.phaseData = machine.status + "/" + Math.random();
          machine.signal_ip = self.signal_ip;
          self.realtimeSignalData = machine;
          // 计算倒计时
          let current_plan =
            self.machinePlan.data_pattern[machine.current_plan];
          let time_interval = ~~self.machinePlan.data_passage[0].time_interval;
          if (machine.current_step_num == 160) {
            self.count = time_interval - machine.current_phase_time;
          } else {
            self.count =
              ~~current_plan["time" + machine.current_step_num] +
              time_interval -
              machine.current_phase_time;
          }
        }
      };
      w.onerror = function() {
        throw "websocket连接失败";
      };
      w.onclose = function() {
        console.log("websocket连接断开");
        w.close();
      };
    }
  },
  computed: {
    MODAL() {
      return this.modal;
    }
  },
  watch: {
    MODAL() {
      if (this.modal) {
        this.getSignal();
      } else {
        this.websocket.onclose();
      }
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
    padding: 0;
  }
  .box {
    display: table;
    .left,
    .right {
      display: table-cell;
      vertical-align: top;
    }
    .right {
      width: 300px;
      height: 100%;
      padding: 10px;
    }
  }
}
</style>
