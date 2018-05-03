<template>
  <div>
    <Row style="margin-bottom:16px;">
      <i-col span="24" :gutter="16">
        <span>间隔总时间：</span>
        <InputNumber :editable="false" :min="0" :max="9" v-model="lighttime"></InputNumber>
      </i-col>
    </Row>
    <Row type="flex" justify="center" :gutter="16">
      <i-col span="12">
        <Card>
          <p slot="title">行车-获得通行权</p>
          <y-temp :data="data1" :lighttime="lighttime" />
        </Card>
      </i-col>
      <i-col span="12">
        <Card>
          <p slot="title">行车-失去通行权</p>
          <y-temp :data="data2" />
        </Card>
      </i-col>
    </Row>
    <Row type="flex" justify="center" :gutter="16" style="margin-top:16px;">
      <i-col span="12">
        <Card>
          <p slot="title">行人-获得通行权</p>
          <y-temp :data="data3" />
        </Card>
      </i-col>
      <i-col span="12">
        <Card>
          <p slot="title">行人-失去通行权</p>
          <y-temp :data="data4" />
        </Card>
      </i-col>
    </Row>
    <Row style="margin-top:16px;">
      <i-col span="24" :gutter="16" style="text-align:center">
        <Button type="ghost" @click="nextStep('base')">上一步</Button>
        <Button type="primary" @click="submitForm" style="margin-left: 8px">确定</Button>
        <Button type="ghost" style="margin-left: 8px" @click="nextStep('lightgroup')">下一步</Button>
      </i-col>
    </Row>
  </div>

</template>

<script>
import { getCharacteristicWayleave } from "@/api";
import YTemp from "./Wayleave-temp";
export default {
  data() {
    return {
      lighttime: 0,
      data1: {},
      data2: {},
      data3: {},
      data4: {}
    };
  },
  components: {
    YTemp
  },
  methods: {
    nextStep(name) {
      this.$router.push({ path: name });
      this.$emit("listenStepChange", name);
    },
    submitForm() {
      console.log(this.data1.first_step);
    }
  },
  created() {
    getCharacteristicWayleave({
      plan_id: this.$route.params.id,
      page: 1,
      rows: 4
    }).then(res => {
      let data = res.data.list;
      data.map(item => {
        for (let i in item) {
          let d = item[i];
          if (!isNaN(d)) {
            item[i] = Number(d);
          }
        }
      });
      this.lighttime = ~~data[0].lighttime;
      this.data1 = data[0];
      this.data2 = data[1];
      this.data3 = data[2];
      this.data4 = data[3];
    });
  }
};
</script>

<style>

</style>
