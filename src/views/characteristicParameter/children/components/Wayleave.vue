<template>
    <div>
        <Row :style="{'margin-bottom':'10px'}" :gutter="16">
            <i-col span="8">#</i-col>
            <i-col span="8">灯色</i-col>
            <i-col span="8">秒数</i-col>
        </Row>
        <Row :style="{'margin-bottom':'10px'}" :gutter="16">
            <i-col span="8">第一步</i-col>
            <i-col span="8">
                <Select v-model="data.first_step">
                    <Option v-for="item in colorList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </i-col>
            <i-col span="8">
                <InputNumber v-model="data.first_step_time" :max="255" :min="0" :style="{width:'100%'}"></InputNumber>
            </i-col>
        </Row>
        <Row :style="{'margin-bottom':'10px'}" :gutter="16">
            <i-col span="8">第二步</i-col>
            <i-col span="8">
                <Select v-model="data.sec_step">
                    <Option v-for="item in colorList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </i-col>
            <i-col span="8">
                <InputNumber v-model="data.sec_step_time" :max="255" :min="0" :style="{width:'100%'}"></InputNumber>
            </i-col>
        </Row>
        <Row :gutter="16">
            <i-col span="8">第三步</i-col>
            <i-col span="8">
                <Select v-model="data.third_step">
                    <Option v-for="item in colorList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </i-col>
            <i-col span="8">
                <InputNumber v-model="data.third_step_time" :max="255" :min="0" :style="{width:'100%'}"></InputNumber>
            </i-col>
        </Row>
    </div>
</template>

<script>
export default {
  data() {
    return {
      colorList: [
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
    data: Object
  }
};
</script>

<style>

</style>
