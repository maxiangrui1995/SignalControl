<template>
  <Modal :value="model" title="信号机实时监控" :mask-closable="false" :width="900" class-name="special-modal" @on-visible-change="visibleChange">
    <Row :style="{height:'500px'}">
      <i-col span="16">
        <canvas ref="canvas" id="canvas" width="600" height="500"></canvas>
      </i-col>
      <i-col span="8" :style="{padding:'10px'}">
        <Tabs value="name1">
          <TabPane label="信号机" name="name1">
            <Tabs type="card" value="a">
              <TabPane label="信息" name="a">
                <Form :model="formItem1" :label-width="80">
                  <formItem label="信号机IP" :style="{'margin-bottom':'5px'}">
                    <i-input v-model="formItem1.signal_ip" readonly></i-input>
                  </formItem>
                  <formItem label="信号机时间" :style="{'margin-bottom':'5px'}">
                    <i-input v-model="formItem1.time" readonly></i-input>
                  </formItem>
                  <formItem label="方案名称" :style="{'margin-bottom':'5px'}">
                    <i-input v-model="formItem1.data_plan" readonly></i-input>
                  </formItem>
                  <formItem label="当前方案" :style="{'margin-bottom':'5px'}">
                    <i-input v-model="formItem1.current_plan" readonly></i-input>
                  </formItem>
                  <formItem label="方案周期" :style="{'margin-bottom':'5px'}">
                    <i-input v-model="formItem1.period" readonly></i-input>
                  </formItem>
                  <formItem label="控制状态" :style="{'margin-bottom':'5px'}">
                    <i-input v-model="formItem1.control_func" readonly></i-input>
                  </formItem>
                  <formItem label="当前阶段" :style="{'margin-bottom':'5px'}">
                    <i-input v-model="formItem1.current_step_num" readonly></i-input>
                  </formItem>
                  <formItem label="频率" :style="{'margin-bottom':'5px'}">
                    <i-input v-model="formItem1.frequency" readonly></i-input>
                  </formItem>
                  <formItem label="温度" :style="{'margin-bottom':'5px'}">
                    <i-input v-model="formItem1.temperature" readonly></i-input>
                  </formItem>
                  <formItem label="电压" :style="{'margin-bottom':'5px'}">
                    <i-input v-model="formItem1.voltage" readonly></i-input>
                  </formItem>
                </Form>
              </TabPane>
              <TabPane label="特勤" name="b">
                <Form :model="formItem2" :label-width="80" :style="{width:'280px'}">
                  <formItem label="目标位置">
                    <Select v-model="formItem2.wait_place">
                      <Option value="2">东</Option>
                      <Option value="1">南</Option>
                      <Option value="4">西</Option>
                      <Option value="3">北</Option>
                    </Select>
                  </formItem>
                  <formItem label="目标类型1">
                    <Select v-model="formItem2.direction1">
                      <Option value="3">左转</Option>
                      <Option value="4">右转</Option>
                      <Option value="2">直行</Option>
                    </Select>
                  </formItem>
                  <formItem label="目标类型2">
                    <Select v-model="formItem2.direction2" clearable>
                      <Option value="3">左转</Option>
                      <Option value="4">右转</Option>
                      <Option value="2">直行</Option>
                    </Select>
                  </formItem>
                  <formItem label="">
                    <Button type="primary" @click="openTeQing">开启</Button>
                    <Button type="primary" @click="closeTeQing">关闭</Button>
                  </formItem>
                </Form>
              </TabPane>
              <TabPane label="方案" name="c">
                <div style="margin-bottom:10px">
                  <ButtonGroup>
                    <Button type="ghost" :disabled="formItem3.disabled1" @click="bujing(1)">步进一</Button>
                    <Button type="ghost" :disabled="formItem3.disabled2" @click="bujing(2)">步进二</Button>
                  </ButtonGroup>
                  <Button type="ghost" @click="red()">全红</Button>
                </div>
                <div style="margin-bottom:10px">
                  <ButtonGroup>
                    <Button type="ghost" :disabled="formItem3.disabled3" @click="bujing(3)">步进三</Button>
                    <Button type="ghost" :disabled="formItem3.disabled4" @click="bujing(4)">步进四</Button>
                  </ButtonGroup>
                  <Button type="ghost" @click="yellow()">黄闪</Button>
                </div>
                <div style="margin-bottom:10px">
                  <ButtonGroup>
                    <Button type="ghost" :disabled="formItem3.disabled5" @click="bujing(5)">步进五</Button>
                    <Button type="ghost" :disabled="formItem3.disabled6" @click="bujing(6)">步进六</Button>
                  </ButtonGroup>
                  <Button type="ghost" @click="auto()">自动</Button>
                </div>
                <div style="margin-bottom:10px">
                  <ButtonGroup>
                    <Button type="ghost" :disabled="formItem3.disabled7" @click="bujing(7)">步进七</Button>
                    <Button type="ghost" :disabled="formItem3.disabled8" @click="bujing(8)">步进八</Button>
                  </ButtonGroup>
                  <Button type="ghost" @click="bujing(0)">步进</Button>
                </div>
              </TabPane>
              <TabPane label="控制" name="d">
                <div style="margin-bottom:10px">
                  <ButtonGroup>
                    <Button type="ghost" @click="closeLamp">关闭外灯</Button>
                    <Button type="ghost" @click="openLamp">打开外灯</Button>
                  </ButtonGroup>
                </div>
                <div style="margin-bottom:10px">
                  <ButtonGroup>
                    <Button type="ghost" @click="correctionTime">矫正时间</Button>
                    <Button type="ghost" @click="restartMachine">重启机器</Button>
                  </ButtonGroup>
                </div>
                <div style="margin-bottom:10px">
                  <Select v-model="formItem4.plan">
                    <Option v-for="item in planList" :key="item.id" :value="item.id">{{item.name}}</Option>
                  </Select>
                </div>
                <div style="margin-bottom:10px">
                  <Button type="ghost" @click="downloadPlan">下载配置</Button>
                  <ButtonGroup>
                    <Button type="ghost" @click="uploadPlan">上传方案</Button>
                    <Button type="ghost">
                      <Checkbox v-model="formItem4.is_cover">覆盖</Checkbox>
                    </Button>
                  </ButtonGroup>
                </div>
              </TabPane>
            </Tabs>
          </TabPane>
          <TabPane label="备用电源" name="name2" :style="{overflow:'auto'}">
            <Form :model="formItem_ups" :label-width="80">
              <formItem label="备用电源IP" :style="{'margin-bottom':'5px'}">
                <i-input v-model="formItem_ups.ups_ip" readonly></i-input>
              </formItem>
              <formItem label="市输出电压" :style="{'margin-bottom':'5px'}">
                <i-input v-model="formItem_ups.ups1" readonly></i-input>
              </formItem>
              <formItem label="故障市电压" :style="{'margin-bottom':'5px'}">
                <i-input v-model="formItem_ups.ups2" readonly></i-input>
              </formItem>
              <formItem label="输出电压" :style="{'margin-bottom':'5px'}">
                <i-input v-model="formItem_ups.ups3" readonly></i-input>
              </formItem>
              <formItem label="负载百分比" :style="{'margin-bottom':'5px'}">
                <i-input v-model="formItem_ups.ups4" readonly></i-input>
              </formItem>
              <formItem label="输出频率" :style="{'margin-bottom':'5px'}">
                <i-input v-model="formItem_ups.ups5" readonly></i-input>
              </formItem>
              <formItem label="直流电压" :style="{'margin-bottom':'5px'}">
                <i-input v-model="formItem_ups.ups6" readonly></i-input>
              </formItem>
              <formItem label="机内温度" :style="{'margin-bottom':'5px'}">
                <i-input v-model="formItem_ups.ups7" readonly></i-input>
              </formItem>
              <!--  <formItem label="市电状态" :style="{'margin-bottom':'5px'}">
                <i-input v-model="formItem_ups.ups80" readonly></i-input>
              </formItem>
              <formItem label="直流电压" :style="{'margin-bottom':'5px'}">
                <i-input v-model="formItem_ups.ups81" readonly></i-input>
              </formItem>
              <formItem label="输出" :style="{'margin-bottom':'5px'}">
                <i-input v-model="formItem_ups.ups82" readonly></i-input>
              </formItem>
              <formItem label="内部状态" :style="{'margin-bottom':'5px'}">
                <i-input v-model="formItem_ups.ups83" readonly></i-input>
              </formItem>
              <formItem label="工作方式" :style="{'margin-bottom':'5px'}">
                <i-input v-model="formItem_ups.ups84" readonly></i-input>
              </formItem>
              <formItem label="UPS电池" :style="{'margin-bottom':'5px'}">
                <i-input v-model="formItem_ups.ups85" readonly></i-input>
              </formItem> -->
            </Form>
          </TabPane>
        </Tabs>
      </i-col>
    </Row>
  </Modal>
</template>

<script>
import DRAW from "@/untils/signal";
import {
  getVar,
  sendToMachine,
  uploadSetting,
  downLoadSetting
} from "@/api/d_machine_control";
import { dataList } from "@/api/d_plan";
import { control_func } from "@/untils/params";
export default {
  props: ["model", "data", "machineIp", "upsIp", "signalId"],
  data() {
    return {
      id: this.$route.params.id,
      road_data: [
        {
          direction: "1",
          roadnum: "3",
          target: ["3", "2", "4"]
        },
        {
          direction: "3",
          roadnum: "3",
          target: ["3", "2", "4"]
        },
        {
          direction: "5",
          roadnum: "3",
          target: ["3", "2", "4"]
        },
        {
          direction: "7",
          roadnum: "3",
          target: ["3", "2", "4"]
        }
      ],
      fn: null,
      formItem1: {},
      formItem2: {},
      formItem3: {},
      formItem4: {
        plan: "",
        is_cover: false
      },
      formItem_ups: {},
      planList: []
    };
  },
  methods: {
    visibleChange(value) {
      this.$emit("visible-change", value);
      if (value) {
        this.start();
      } else {
        this.websocket.onclose();
      }
    },
    start() {
      if (!this.fn) {
        this.fn = new DRAW(document.getElementById("canvas"));
      }
      this.fn.draw({
        CROSSINGDATA: this.road_data
      });
      this.getWebsocket();
    },
    getWebsocket() {
      getVar()
        .then(res => {
          if (res.status === "1") {
            this.wsUrl =
              "ws://" +
              res.data.web_socket_host +
              ":" +
              res.data.web_socket_port +
              "/";
          }
        })
        .then(() => {
          let w = (this.websocket = new WebSocket(this.wsUrl));
          let self = this;
          w.onopen = function() {
            self.$Message.info("websocket开始连接");
            w.send(self.id);
          };
          w.onmessage = function(evt) {
            var data = JSON.parse(evt.data);
            if (data.status) {
              if (!data.data.machine) {
                return self.$Message.warning("信号机无返回消息");
              }
              let machine = data.data.machine;
              self.fn.PHASEDATA = machine.status;

              // 信号机ip
              self.$set(self.formItem1, "signal_ip", self.machineIp);
              // 信号机时间
              self.$set(self.formItem1, "time", machine.time);
              // 当前方案
              self.$set(
                self.formItem1,
                "current_plan",
                "方案" + (~~machine.current_plan + 1)
              );
              // 控制状态
              self.$set(
                self.formItem1,
                "control_func",
                control_func[machine.control_func]
              );
              // 当前阶段
              self.$set(
                self.formItem1,
                "current_step_num",
                machine.current_step_num === 160
                  ? "倒计时"
                  : machine.current_step_num
              );
              // 频率
              self.$set(self.formItem1, "frequency", machine.frequency);
              // 温度
              self.$set(self.formItem1, "temperature", machine.temperature);
              // 电压
              self.$set(self.formItem1, "voltage", machine.voltage);
              // 方案名称
              self.$set(self.formItem1, "data_plan", self.data.data_plan.name);
              // 方案周期
              self.$set(
                self.formItem1,
                "period",
                self.data.data_pattern[0].period
              );

              // 计算倒计时
              let current_plan = self.data.data_pattern[machine.current_plan];
              let time_interval = ~~self.data.data_passage[0].time_interval;
              if (machine.current_step_num == 160) {
                self.fn.COUNT = time_interval - machine.current_phase_time;
              } else if (machine.current_step_num > 16) {
              } else {
                self.fn.COUNT =
                  ~~current_plan["time" + machine.current_step_num] +
                  time_interval -
                  machine.current_phase_time;
              }

              // UPS
              if (!data.data.ups) {
                return;
              }
              let ups = data.data.ups;
              // upsip
              self.$set(self.formItem_ups, "ups_ip", self.upsIp);
              // 市输出电压
              self.$set(self.formItem_ups, "ups1", ups[0]);
              // UPS故障时记录的市电电压
              self.$set(self.formItem_ups, "ups2", ups[1]);
              // 输出电压
              self.$set(self.formItem_ups, "ups3", ups[2]);
              // 输出负载百分比
              self.$set(self.formItem_ups, "ups4", ups[3]);
              // 市电输出平率
              self.$set(self.formItem_ups, "ups5", ups[4]);
              // 显示直流电压需要换算
              self.$set(self.formItem_ups, "ups6", ups[5]);
              // 机内温度
              self.$set(self.formItem_ups, "ups7", ups[6]);
            }
          };
          w.onerror = function() {
            throw "websocket连接失败";
          };
          w.onclose = function() {
            self.$Message.info("websocket连接断开");
            w.close();
          };
        });
    },
    openTeQing() {
      let wait_place = this.formItem2.wait_place;
      let direction =
        this.formItem2.direction1 +
        (this.formItem2.direction2 ? this.formItem2.direction2 : "");
      if (!wait_place || !direction) {
        return;
      }
      sendToMachine({
        machine_id: this.signalId,
        type: 7,
        wait_place,
        direction
      }).then(res => {
        if (res.status === "1") {
          this.$Message.success(res.message);
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    closeTeQing() {
      sendToMachine({
        machine_id: this.signalId,
        type: 8,
        wait_place: 1,
        direction: 10
      }).then(res => {
        if (res.status === "1") {
          this.$Message.success(res.message);
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    bujing(value) {
      sendToMachine({
        machine_id: this.signalId,
        type: 9,
        wait_place: value,
        direction: 10
      }).then(res => {
        if (res.status === "1") {
          this.$Message.success(res.message);
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    red() {
      sendToMachine({
        machine_id: this.signalId,
        type: 1,
        wait_place: 1,
        direction: 10
      }).then(res => {
        if (res.status === "1") {
          this.$Message.success(res.message);
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    yellow() {
      sendToMachine({
        machine_id: this.signalId,
        type: 2,
        wait_place: 1,
        direction: 10
      }).then(res => {
        if (res.status === "1") {
          this.$Message.success(res.message);
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    auto() {
      sendToMachine({
        machine_id: this.signalId,
        type: 3,
        wait_place: 1,
        direction: 10
      }).then(res => {
        if (res.status === "1") {
          this.$Message.success(res.message);
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    closeLamp() {
      sendToMachine({
        machine_id: this.signalId,
        type: 5,
        wait_place: 1,
        direction: 10
      }).then(res => {
        if (res.status === "1") {
          this.$Message.success(res.message);
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    openLamp() {
      sendToMachine({
        machine_id: this.signalId,
        type: 4,
        wait_place: 1,
        direction: 10
      }).then(res => {
        if (res.status === "1") {
          this.$Message.success(res.message);
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    correctionTime() {
      sendToMachine({
        machine_id: this.signalId,
        type: 0,
        wait_place: 1,
        direction: 10
      }).then(res => {
        if (res.status === "1") {
          this.$Message.success(res.message);
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    restartMachine() {
      sendToMachine({
        machine_id: this.signalId,
        type: 6,
        wait_place: 1,
        direction: 10
      }).then(res => {
        if (res.status === "1") {
          this.$Message.success(res.message);
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    downloadPlan() {
      downLoadSetting({
        machine_id: this.signalId,
        plan_id: this.formItem4.plan
      }).then(res => {
        if (res.status === "1") {
          this.$Message.success(res.message);
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    uploadPlan() {
      let is_cover = this.formItem4.is_cover;
      let plan_id = this.formItem4.plan;
      let self = this;
      if (is_cover) {
        uploadSetting({
          machine_id: self.signalId,
          is_cover: 1,
          plan_id: plan_id
        }).then(res => {
          if (res.status === "1") {
            this.$Message.success(res.message, "请手动刷新");
          } else {
            this.$Message.error(res.message);
          }
          self.$Modal.remove();
        });
      } else {
        let value = "";
        this.$Modal.confirm({
          render: h => {
            return h("Input", {
              props: {
                value: value,
                autofocus: true,
                placeholder: "不覆盖原有方案，需输入一个方案名称"
              },
              on: {
                input: val => {
                  value = val;
                }
              }
            });
          },
          loading: true,
          onOk() {
            uploadSetting({
              machine_id: self.signalId,
              is_cover: 0,
              name: value
            }).then(res => {
              if (res.status === "1") {
                this.$Message.success(res.message, "请手动刷新");
              } else {
                this.$Message.error(res.message);
              }
              self.$Modal.remove();
            });
          }
        });
      }
    },
    loadData_planList() {
      dataList({ page: 1, rows: 999 }).then(res => {
        if (res.status) {
          this.planList = res.data.list;
        }
      });
    }
  },
  created() {},
  watch: {
    data() {
      this.fn.draw({
        CROSSINGDATA: this.road_data,
        LIGHTDATA: this.data.data_phaseinfo
      });
      for (let index = 0; index < 8; index++) {
        this.formItem3["disabled" + (index + 1)] = true;
      }
      this.data.data_phasestatus.forEach((item, index) => {
        this.formItem3["disabled" + (index + 1)] = false;
      });

      this.loadData_planList();
    },
    machineIp() {}
  }
};
</script>

<style scoped lang="less">
</style>
