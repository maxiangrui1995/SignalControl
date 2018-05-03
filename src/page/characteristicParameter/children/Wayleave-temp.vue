<template>
    <div>
        <Row :gutter="16" :style="{'margin-bottom':'20px'}">
            <i-col span="8">#</i-col>
            <i-col span="8">灯色</i-col>
            <i-col span="8">时长</i-col>
        </Row>
        <Row :gutter="16" :style="{'margin-bottom':'20px'}">
            <i-col span="8">第一步</i-col>
            <i-col span="8">
                <Select :style="{width:'80px'}" v-model="data.first_step">
                    <Option v-for="item in color" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </i-col>
            <i-col span="8">
                <InputNumber :max="lighttime" :min="0" v-model="data.first_step_time"></InputNumber>
            </i-col>
        </Row>
        <Row :gutter="16" :style="{'margin-bottom':'20px'}">
            <i-col span="8">第二步</i-col>
            <i-col span="8">
                <Select :style="{width:'80px'}" v-model="data.sec_step">
                    <Option v-for="item in color" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </i-col>
            <i-col span="8">
                <InputNumber :max="lighttime" :min="0" v-model="data.sec_step_time"></InputNumber>
            </i-col>
        </Row>
        <Row :gutter="16">
            <i-col span="8">第三步</i-col>
            <i-col span="8">
                <Select :style="{width:'80px'}" v-model="data.third_step">
                    <Option v-for="item in color" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </i-col>
            <i-col span="8">
                <InputNumber :max="lighttime" :min="0" v-model="data.third_step_time"></InputNumber>
            </i-col>
        </Row>
    </div>
</template>

<script>
export default {
  data() {
    return {
      color: [
        {
          value: 1,
          label: "红"
        },
        {
          value: 2,
          label: "黄"
        },
        {
          value: 3,
          label: "绿"
        },
        {
          value: 6,
          label: "红闪"
        },
        {
          value: 7,
          label: "黄闪"
        },
        {
          value: 8,
          label: "绿闪"
        }
      ]
    };
  },
  props: {
    lighttime: Number,
    data: Object
  }
};
</script>

<style>

</style>
