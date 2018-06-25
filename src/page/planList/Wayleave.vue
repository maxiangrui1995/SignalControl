<template>
  <Card dis-hover>
    <Form :label-width="80">
      <Row :gutter="16">
        <i-col :xs="24" :sm="12" :md="12" :lg="6">
          <FormItem label="间隔总时间">
            <InputNumber :max="9" :min="0" v-model="lighttime" :style="{width:'100%'}"></InputNumber>
          </FormItem>
        </i-col>
      </Row>
      <Row :gutter="16">
        <i-col :xs="24" :sm="12" :md="12" :lg="6" v-for="item in data" :key="item.id" :style="{'margin-bottom':'20px'}">
          <Card>
            <p slot="title">{{card_title[item.type]}}</p>
            <Row :style="{'margin-bottom':'10px'}" :gutter="16">
              <i-col span="8">#</i-col>
              <i-col span="8">灯色</i-col>
              <i-col span="8">秒数</i-col>
            </Row>
            <Row :style="{'margin-bottom':'10px'}" :gutter="16">
              <i-col span="8">第一步</i-col>
              <i-col span="8">
                <Select v-model="item.first_step">
                  <Option v-for="(val, key, index) in light_color" :value="key" :key="index">{{ val }}</Option>
                </Select>
              </i-col>
              <i-col span="8">
                <InputNumber v-model="item.first_step_time" :max="255" :min="0" :style="{width:'100%'}"></InputNumber>
              </i-col>
            </Row>
            <Row :style="{'margin-bottom':'10px'}" :gutter="16">
              <i-col span="8">第二步</i-col>
              <i-col span="8">
                <Select v-model="item.sec_step">
                  <Option v-for="(val, key, index) in light_color" :value="key" :key="index">{{ val }}</Option>
                </Select>
              </i-col>
              <i-col span="8">
                <InputNumber v-model="item.sec_step_time" :max="255" :min="0" :style="{width:'100%'}"></InputNumber>
              </i-col>
            </Row>
            <Row :gutter="16">
              <i-col span="8">第三步</i-col>
              <i-col span="8">
                <Select v-model="item.third_step">
                  <Option v-for="(val, key, index) in light_color" :value="key" :key="index">{{ val }}</Option>
                </Select>
              </i-col>
              <i-col span="8">
                <InputNumber v-model="item.third_step_time" :max="255" :min="0" :style="{width:'100%'}"></InputNumber>
              </i-col>
            </Row>
          </Card>
        </i-col>
      </Row>
      <Button type="primary" :loading="loading" @click="handleSubmit">确定</Button>
    </Form>
  </Card>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      data: [],
      lighttime: 0,
      loading: false,
      light_color: {
        "1": "红",
        "2": "黄",
        "3": "绿",
        "6": "红闪",
        "7": "黄闪",
        "8": "绿闪"
      },
      card_title: {
        "0": "行车-获得通行权",
        "1": "行车-失去通行权",
        "2": "行人-获得通行权",
        "3": "行人-失去通行权"
      }
    };
  },
  methods: {
    // 请求数据
    fetchData() {
      this.$http("index/d_passage/dataList", {
        plan_id: 818 /* this.id */,
        page: 1,
        rows: 4
      }).then(res => {
        if (res.status) {
          res.data.list.forEach(item => {
            item.first_step_time = ~~item.first_step_time;
            item.sec_step_time = ~~item.sec_step_time;
            item.third_step_time = ~~item.third_step_time;
            this.lighttime = ~~item.lighttime;
          });
          this.data = res.data.list;
        }
      });
    },
    handleSubmit() {
      let arr = [];
      let warning = [];
      this.data.forEach((item, index) => {
        arr.push({
          first_step: item.first_step,
          first_step_time: item.first_step_time,
          sec_step: item.sec_step,
          sec_step_time: item.sec_step_time,
          third_step: item.third_step,
          third_step_time: item.third_step_time,
          type: item.type,
          remark: item.remark,
          id: item.id
        });
        if (
          ~~item.first_step_time +
            ~~item.sec_step_time +
            ~~item.third_step_time !==
          ~~this.lighttime
        ) {
          warning.push(this.card_title[index]);
        }
      });
      if (warning.length) {
        this.$Modal.warning({
          content: warning.join(" , ") + "  三步时间之和 ≠ 间隔总时间"
        });
      } else {
        dataUpdateList({
          data: arr,
          plan_id: this.id,
          time_interval: this.lighttime
        }).then(res => {
          if (res.status) {
            this.$Message.success("更新成功");
          } else {
            this.$Message.error(res.message);
          }
          this.loadData();
        });
      }
    }
  },
  created() {
    this.fetchData();
  }
};
</script>

<style>
</style>