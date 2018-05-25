<template>
    <Tabs type="card" value="a">
        <TabPane label="信息" name="a">
            <Form :model="formItem1" :label-width="80">
                <formItem label="信号机IP" :style="{'margin-bottom':'5px'}">
                    <i-input :value="formItem1.signal_ip" readonly></i-input>
                </formItem>
                <formItem label="信号机时间" :style="{'margin-bottom':'5px'}">
                    <i-input :value="formItem1.time" readonly></i-input>
                </formItem>
                <formItem label="方案名称" :style="{'margin-bottom':'5px'}">
                    <i-input :value="formItem1.data_plan" readonly></i-input>
                </formItem>
                <formItem label="当前方案" :style="{'margin-bottom':'5px'}">
                    <i-input :value="formItem1.current_plan" readonly></i-input>
                </formItem>
                <formItem label="方案周期" :style="{'margin-bottom':'5px'}">
                    <i-input :value="formItem1.data_pattern" readonly></i-input>
                </formItem>
                <formItem label="控制状态" :style="{'margin-bottom':'5px'}">
                    <i-input :value="formItem1.control_func" readonly></i-input>
                </formItem>
                <formItem label="当前阶段" :style="{'margin-bottom':'5px'}">
                    <i-input :value="formItem1.input" readonly></i-input>
                </formItem>
                <formItem label="频率" :style="{'margin-bottom':'5px'}">
                    <i-input :value="formItem1.input" readonly></i-input>
                </formItem>
                <formItem label="温度" :style="{'margin-bottom':'5px'}">
                    <i-input :value="formItem1.input" readonly></i-input>
                </formItem>
                <formItem label="电压" :style="{'margin-bottom':'5px'}">
                    <i-input :value="formItem1.input" readonly></i-input>
                </formItem>
            </Form>
            {{realtimeData}}
        </TabPane>
        <TabPane label="特勤" name="b">
            <Form :model="formItem2" :label-width="80" :style="{width:'280px'}">
                <formItem label="等待位置">
                    <Select :value="formItem2.a">
                        <Option :value="0">东</Option>
                    </Select>
                </formItem>
                <formItem label="目标类型1">
                    <Select :value="formItem2.a">
                        <Option :value="0">东</Option>
                    </Select>
                </formItem>
                <formItem label="目标类型2">
                    <Select :value="formItem2.a">
                        <Option :value="0">东</Option>
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
                    <Button type="ghost">步进一</Button>
                    <Button type="ghost">步进二</Button>
                </ButtonGroup>
                <Button type="ghost">全红</Button>
            </div>
            <div style="margin-bottom:10px">
                <ButtonGroup>
                    <Button type="ghost">步进三</Button>
                    <Button type="ghost">步进四</Button>
                </ButtonGroup>
                <Button type="ghost">黄闪</Button>
            </div>
            <div style="margin-bottom:10px">
                <ButtonGroup>
                    <Button type="ghost">步进五</Button>
                    <Button type="ghost">步进六</Button>
                </ButtonGroup>
                <Button type="ghost">自动</Button>
            </div>
            <div style="margin-bottom:10px">
                <ButtonGroup>
                    <Button type="ghost">步进七</Button>
                    <Button type="ghost">步进八</Button>
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
      formItem4: {},
      control_func: control_func
    };
  },
  props: ["realtimeData", "machinePlan"],
  watch: {
    machinePlan() {
      let realtimeData = this.realtimeData;
      let machinePlan = this.machinePlan;
      console.log();
      
      this.formItem1 = {
        //   信号机ip
        signal_ip: realtimeData.signal_ip,
        // 信号机时间
        time: realtimeData.signal_ip,
        // 方案名称
        data_plan: machinePlan.data_plan.name,
        // 当前方案
        current_plan: realtimeData.current_plan,
        // 方案周期
        period: machinePlan.data_plan.period,
        // 控制状态
        control_func: control_func[realtimeData.control_func]
      };
      console.log(this.formItem1);
    }
  }
};
</script>

<style>
</style>
