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
    <Button type="primary" :loading="loading" @click="handleSubmit">确定</Button>
  </div>
</template>

<script>
import YWayleave from "./components/Wayleave";
import { getWayleave, updateWayleave } from "@/api";
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
      lighttime: 0,
      loading: false
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
      // 判断每一阶段的三步时间和是否等于间隔时间
      let data = [this.data1, this.data2, this.data3, this.data4];
      let isError = false;
      data.forEach(item => {
        if (
          ~~item.first_step_time +
            ~~item.sec_step_time +
            ~~item.third_step_time !==
          ~~this.lighttime
        ) {
          isError = true;
        }
      });
      if (isError) {
        this.$Notice.warning({
          title: "系统提示",
          desc: "每一阶段的三步时间之和必须等于间隔时间！"
        });
      } else {
        this.loading = true;
        updateWayleave({
          data: data,
          plan_id: this.id,
          time_interval: this.lighttime
        }).then(res => {
          if (res.status) {
            this.$Message.success("修改成功");
          } else {
            this.$Message.error("修改失败");
          }
          this.loading = false;
          this.loadData();
        });
      }
    }
  },
  created() {
    this.loadData();
  }
};
</script>

<style>

</style>
