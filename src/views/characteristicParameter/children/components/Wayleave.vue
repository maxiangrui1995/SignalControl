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
                <Select>
                    <Option v-for="item in colorList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </i-col>
            <i-col span="8">
                <InputNumber :max="255" :min="0" :style="{width:'100%'}"></InputNumber>
            </i-col>
        </Row>
        <Row :style="{'margin-bottom':'10px'}" :gutter="16">
            <i-col span="8">第二步</i-col>
            <i-col span="8">
                <Select>
                    <Option v-for="item in colorList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </i-col>
            <i-col span="8">
                <InputNumber :max="255" :min="0" :style="{width:'100%'}"></InputNumber>
            </i-col>
        </Row>
        <Row :gutter="16">
            <i-col span="8">第三步</i-col>
            <i-col span="8">
                <Select>
                    <Option v-for="item in colorList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </i-col>
            <i-col span="8">
                <InputNumber :max="255" :min="0" :style="{width:'100%'}"></InputNumber>
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
          value: "New York",
          label: "New York"
        },
        {
          value: "London",
          label: "London"
        },
        {
          value: "Sydney",
          label: "Sydney"
        },
        {
          value: "Ottawa",
          label: "Ottawa"
        },
        {
          value: "Paris",
          label: "Paris"
        },
        {
          value: "Canberra",
          label: "Canberra"
        }
      ]
    };
  }
};
</script>

<style>

</style>
