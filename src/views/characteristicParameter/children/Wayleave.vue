<template>
    <div>
        <Row :style="{'margin-bottom':'20px'}">
            <i-col span="12">
                间隔总时间:
                <InputNumber :max="255" :min="0" v-model="lighttime"></InputNumber>
            </i-col>
        </Row>
        <Row :gutter="16">
            <i-col :xs="24" :sm="12" :md="12" :lg="6" :style="{'margin-bottom':'20px'}">
                <Card>
                    <p slot="title">行车 - 获得通行权</p>
                    <y-wayleave :data="data1" />
                </Card>
            </i-col>
            <i-col :xs="24" :sm="12" :md="12" :lg="6" :style="{'margin-bottom':'20px'}">
                <Card>
                    <p slot="title">行车 - 失去通行权</p>
                    <y-wayleave :data="data2" />
                </Card>
            </i-col>
            <i-col :xs="24" :sm="12" :md="12" :lg="6" :style="{'margin-bottom':'20px'}">
                <Card>
                    <p slot="title">行人 - 获得通行权</p>
                    <y-wayleave :data="data3" />
                </Card>
            </i-col>
            <i-col :xs="24" :sm="12" :md="12" :lg="6" :style="{'margin-bottom':'20px'}">
                <Card>
                    <p slot="title">行人 - 失去通行权</p>
                    <y-wayleave :data="data4" />
                </Card>
            </i-col>
        </Row>
        <Button type="primary" @click="handleSubmit">确定</Button>
    </div>
</template>

<script>
import YWayleave from "./components/Wayleave";
import { getWayleave } from "@/api";
export default {
  components: {
    YWayleave
  },
  data() {
    return {
      id: this.$route.params.id,
      data1: {},
      data2: {},
      data3: {},
      data4: {},
      lighttime: 0
    };
  },
  methods: {
    loadData() {
      getWayleave({
        plan_id: this.id,
        page: 1,
        rows: 4
      }).then(res => {
        let data = res.data.list;
        data.forEach(element => {
          for (let i in element) {
            let item = element[i];
            if (!isNaN(item)) {
              element[i] = ~~item;
            }
          }
        });
        this.data1 = data[0];
        this.data2 = data[1];
        this.data3 = data[2];
        this.data4 = data[3];
        this.lighttime = data[0].time_interval;
      });
    },
    handleSubmit() {
      console.log(this.data1.third_step_time);
    }
  },
  created() {
    this.loadData();
  }
};
</script>

<style>

</style>
