<template>
    <Tabs type="card" value="c">
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
                <formItem label="等待位置">
                    <Select v-model="formItem2.a">
                        <Option value="2">东</Option>
                        <Option value="1">南</Option>
                        <Option value="4">西</Option>
                        <Option value="3">北</Option>
                    </Select>
                </formItem>
                <formItem label="目标类型1">
                    <Select v-model="formItem2.a">
                        <Option value="3">左转</Option>
                        <Option value="4">右转</Option>
                        <Option value="2">直行</Option>
                    </Select>
                </formItem>
                <formItem label="目标类型2">
                    <Select v-model="formItem2.a">
                        <Option value="3">左转</Option>
                        <Option value="4">右转</Option>
                        <Option value="2">直行</Option>
                    </Select>
                </formItem>
                <formItem label="">
                    <Button type="primary">确定</Button>
                </formItem>
            </Form>
        </TabPane>
        <TabPane label="方案" name="c">
            <div style="margin-bottom:10px">
                <ButtonGroup>
                    <Button type="ghost" :disabled="formItem3.disabled1">步进一</Button>
                    <Button type="ghost" :disabled="formItem3.disabled2">步进二</Button>
                </ButtonGroup>
                <Button type="ghost">全红</Button>
            </div>
            <div style="margin-bottom:10px">
                <ButtonGroup>
                    <Button type="ghost" :disabled="formItem3.disabled3">步进三</Button>
                    <Button type="ghost" :disabled="formItem3.disabled4">步进四</Button>
                </ButtonGroup>
                <Button type="ghost">黄闪</Button>
            </div>
            <div style="margin-bottom:10px">
                <ButtonGroup>
                    <Button type="ghost" :disabled="formItem3.disabled5">步进五</Button>
                    <Button type="ghost" :disabled="formItem3.disabled6">步进六</Button>
                </ButtonGroup>
                <Button type="ghost">自动</Button>
            </div>
            <div style="margin-bottom:10px">
                <ButtonGroup>
                    <Button type="ghost" :disabled="formItem3.disabled7">步进七</Button>
                    <Button type="ghost" :disabled="formItem3.disabled8">步进八</Button>
                </ButtonGroup>
                <Button type="ghost">步进</Button>
            </div>
        </TabPane>
        <TabPane label="控制" name="d">
            <div style="margin-bottom:10px">
                <ButtonGroup>
                    <Button type="ghost">关闭外灯</Button>
                    <Button type="ghost">代开外灯</Button>
                </ButtonGroup>
            </div>
            <div style="margin-bottom:10px">
                <ButtonGroup>
                    <Button type="ghost">矫正时间</Button>
                    <Button type="ghost">重启机器</Button>
                </ButtonGroup>
            </div>
            <div style="margin-bottom:10px">
                <Select :value="formItem4.a">
                    <Option :value="0">东</Option>
                </Select>
            </div>
            <div style="margin-bottom:10px">
                <Button type="ghost">上传方案</Button>
                <ButtonGroup>
                    <Button type="ghost">下载配置</Button>
                    <Button type="ghost">
                        <Checkbox>覆盖</Checkbox>
                    </Button>
                </ButtonGroup>
            </div>
        </TabPane>
    </Tabs>
</template>

<script>
import { control_func } from "@/untils/params";
export default {
  data() {
    return {
      formItem1: {},
      formItem2: {},
      formItem3: {},
      formItem4: {}
    };
  },
  props: ["realtimeData", "machinePlan"],
  watch: {
    realtimeData() {
      let realtimeData = this.realtimeData;
      // 信号机ip
      this.$set(this.formItem1, "signal_ip", realtimeData.signal_ip);
      // 信号机时间
      this.$set(this.formItem1, "time", realtimeData.time);
      // 当前方案
      this.$set(
        this.formItem1,
        "current_plan",
        "方案" + (~~realtimeData.current_plan + 1)
      );
      // 控制状态
      this.$set(
        this.formItem1,
        "control_func",
        control_func[realtimeData.control_func]
      );
      // 当前阶段
      this.$set(
        this.formItem1,
        "current_step_num",
        realtimeData.current_step_num === "160"
          ? "倒计时"
          : realtimeData.current_step_num
      );
      // 频率
      this.$set(this.formItem1, "frequency", realtimeData.frequency);
      // 温度
      this.$set(this.formItem1, "temperature", realtimeData.temperature);
      // 电压
      this.$set(this.formItem1, "voltage", realtimeData.voltage);
    },
    machinePlan() {
      let machinePlan = this.machinePlan;
      // 方案名称
      this.$set(this.formItem1, "data_plan", machinePlan.data_plan.name);
      // 方案周期
      this.$set(this.formItem1, "period", machinePlan.data_pattern[0].period);
      console.log(machinePlan);
      // 阶段信息-控制步数
      for (let i = 1; i <= 8; i++) {
        this.formItem3["disabled" + i] = true;
        if (i <= machinePlan.data_phasestatus.length) {
          this.formItem3["disabled" + i] = false;
        }
      }
    }
  }
};
</script>

<style>
</style>
