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
                    <my-temp :data="data1" />
                </Card>
            </i-col>
            <!-- <i-col span="12">
                <Card>
                    <p slot="title">行车-失去通行权</p>
                    <my-temp :data="data2" />
                </Card>
            </i-col> -->
        </Row>
        <!-- <Row type="flex" justify="center" :gutter="16" style="margin-top:16px;">
            <i-col span="12">
                <Card>
                    <p slot="title">行人-获得通行权</p>
                    <my-temp :data="data3" />
                </Card>
            </i-col>
            <i-col span="12">
                <Card>
                    <p slot="title">行人-失去通行权</p>
                    <my-temp :data="data4" />
                </Card>
            </i-col>
        </Row> -->
        <Row style="margin-top:16px;">
            <i-col span="24" :gutter="16" style="text-align:center">
                <Button type="ghost" @click="prevStep">上一步</Button>
                <Button type="primary" @click="submitForm" style="margin-left: 8px">确定</Button>
                <Button type="ghost" style="margin-left: 8px" @click="nextStep">下一步</Button>
            </i-col>
        </Row>
    </div>

</template>

<script>
const temp = {
  template:
    `<div>` +
    `<Row :gutter="16" style="margin-bottom:20px">
                        <i-col span="8">#</i-col>
                        <i-col span="8">灯色</i-col>
                        <i-col span="8">时长</i-col>
                    </Row>` +
    `<Row :gutter="16" style="margin-bottom:20px">
                        <i-col span="8">第一步</i-col>
                        <i-col span="8">
                            <Select v-model="data.first_step" style="width:80px">
                                <Option v-for="item in color" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </i-col>
                        <i-col span="8">
                            <InputNumber :max="lighttime" :min="0" v-model="data.first_step_time" ></InputNumber>
                        </i-col>
                    </Row>` +
    `</div>`,
  props: {
    data: Object
  },
  data() {
    return {
      lighttime: 9,
      color: [
        {
          value: "1",
          label: "红"
        },
        {
          value: "2",
          label: "黄"
        },
        {
          value: "3",
          label: "绿"
        },
        {
          value: "6",
          label: "红闪"
        },
        {
          value: "7",
          label: "黄闪"
        },
        {
          value: "8",
          label: "绿闪"
        }
      ]
    };
  },
  filters: {
    ToNumber: function(value) {
      console.log(value);

      return ~~value || null;
    }
  },
  watch: {
    data() {
      console.log(typeof this.data.first_step);
    }
  }
};

export default {
  data() {
    return {
      lighttime: 9,
      data1: {},
      data2: {},
      data3: {},
      data4: {}
    };
  },
  components: {
    "my-temp": temp
  },

  methods: {
    prevStep() {
      this.$router.push({ path: "base" });
      this.$emit("listenStepChange", "base");
    },
    nextStep() {
      this.$router.push({ path: "lightgroup" });
      this.$emit("listenStepChange", "lightgroup");
    },
    submitForm() {
      console.log(this.data1.first_step);
    }
  },
  created() {
    this.$ajax
      .post("d_passage/dataList", {
        plan_id: this.$route.params.id,
        page: 1,
        rows: 4
      })
      .then(res => {
        let data = res.data.data.list;
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
