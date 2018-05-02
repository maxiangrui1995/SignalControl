<template>
    <div>
        <div class="breadWarpper">
            <p style="font-size:16px;font-weight:500">区域管理</p>
            <Row type="flex" justify="center" align="middle" class="code-row-bg">
                <i-col span="6">
                    <Cascader v-model="value3" :data="data" filterable change-on-select size="large"></Cascader>
                </i-col>
            </Row>
        </div>
        <div class="contentWrapper">
            <Steps :current="0">
                <Step title="区域"></Step>
                <Step title="道路"></Step>
                <Step title="路口"></Step>
                <Step title="设备"></Step>
            </Steps>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      select3: "day",
      data: [
        {
          value: "beijing",
          label: "北京",
          children: [
            {
              value: "gugong",
              label: "故宫"
            },
            {
              value: "tiantan",
              label: "天坛"
            },
            {
              value: "wangfujing",
              label: "王府井"
            }
          ]
        },
        {
          value: "jiangsu",
          label: "江苏",
          children: [
            {
              value: "nanjing",
              label: "南京",
              children: [
                {
                  value: "fuzimiao",
                  label: "夫子庙"
                }
              ]
            },
            {
              value: "suzhou",
              label: "苏州",
              children: [
                {
                  value: "zhuozhengyuan",
                  label: "拙政园"
                },
                {
                  value: "shizilin",
                  label: "狮子林"
                }
              ]
            }
          ]
        }
      ],
      value13: "",
      value3: []
    };
  }
};
</script>

<style scoped>
.breadWarpper {
  padding: 20px;
  background: #fff;
}
.contentWrapper {
  margin: 20px;
  min-height: 400px;
  background: #fff;
  padding: 10px;
}
</style>
