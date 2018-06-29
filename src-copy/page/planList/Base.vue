<template>
    <Card dis-hover>
        <Row>
            <i-col span="8" offset="8">
                <Form :model="formItem" :label-width="80">
                    <FormItem label="方案名称">
                        <i-input v-model="formItem.name" :style="{width:'100%'}"></i-input>
                    </FormItem>
                    <FormItem label="相位差">
                        <InputNumber v-model="formItem.phase_difference" :max="255" :min="0" :style="{width:'100%'}"></InputNumber>
                    </FormItem>
                    <FormItem label="脉冲倒计时">
                        <InputNumber v-model="formItem.mc_countdown" :max="255" :min="0" :style="{width:'100%'}"></InputNumber>
                    </FormItem>
                    <FormItem label="脉冲宽度">
                        <InputNumber v-model="formItem.mc_width" :max="255" :min="0" :style="{width:'100%'}"></InputNumber>
                    </FormItem>
                    <FormItem label="最小绿范围">
                        <Row>
                            <i-col span="11">
                                <FormItem>
                                    <InputNumber v-model="formItem.min_green_down" :max="255" :min="0" :style="{width:'100%'}"></InputNumber>
                                </FormItem>
                            </i-col>
                            <i-col span="2" style="text-align: center">-</i-col>
                            <i-col span="11">
                                <FormItem>
                                    <InputNumber v-model="formItem.min_green_up" :max="255" :min="0" :style="{width:'100%'}"></InputNumber>
                                </FormItem>
                            </i-col>
                        </Row>
                    </FormItem>
                    <FormItem label="最大绿范围">
                        <Row>
                            <i-col span="11">
                                <FormItem>
                                    <InputNumber v-model="formItem.max_green_down" :max="255" :min="0" :style="{width:'100%'}"></InputNumber>
                                </FormItem>
                            </i-col>
                            <i-col span="2" style="text-align: center">-</i-col>
                            <i-col span="11">
                                <FormItem>
                                    <InputNumber v-model="formItem.max_green_up" :max="255" :min="0" :style="{width:'100%'}"></InputNumber>
                                </FormItem>
                            </i-col>
                        </Row>
                    </FormItem>
                    <FormItem label="绿延伸范围">
                        <Row>
                            <i-col span="11">
                                <FormItem>
                                    <InputNumber v-model="formItem.extends_down" :max="255" :min="0" :style="{width:'100%'}"></InputNumber>
                                </FormItem>
                            </i-col>
                            <i-col span="2" style="text-align: center">-</i-col>
                            <i-col span="11">
                                <FormItem>
                                    <InputNumber v-model="formItem.extends_up" :max="255" :min="0" :style="{width:'100%'}"></InputNumber>
                                </FormItem>
                            </i-col>
                        </Row>
                    </FormItem>
                    <FormItem>
                        <Button type="primary">确定</Button>
                    </FormItem>
                </Form>
            </i-col>
        </Row>
    </Card>
</template>

<script>
export default {
  data() {
    return {
      formItem: {}
    };
  },
  methods: {
    //   请求数据
    fetchData() {
      this.loading = true;
      this.$http("index/d_plan/dataView", {
        id: 818
      }).then(res => {
        if (res.status) {
          console.log(res.data);
          let data = res.data;
          this.formatterData(data);
        }
      });
    },
    // 过滤数据
    formatterData(data) {
      this.formItem = {
        id: data.id,
        name: data.name,
        extends_down: ~~data.extends_down,
        extends_up: ~~data.extends_up,
        light_count: ~~data.light_count,
        max_green_down: ~~data.max_green_down,
        max_green_up: ~~data.max_green_up,
        mc_countdown: ~~data.mc_countdown,
        mc_width: ~~data.mc_width,
        min_green_down: ~~data.min_green_down,
        min_green_up: ~~data.min_green_up,
        phase_count: ~~data.phase_count,
        phase_difference: ~~data.phase_difference
      };
    }
  },
  computed: {
    data() {
      let data = this.$store.state.planModule.baseData;
      return data;
    }
  },
  watch: {
    data(data) {
      this.formatterData(data);
    }
  },
  created() {
    if (Object.keys(this.data).length) {
      this.formatterData(this.data);
    }
  }
};
</script>

<style>
</style>
