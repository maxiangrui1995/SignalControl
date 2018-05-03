<template>
  <Row>
    <i-col span="8" offset="8">
      <Form :model="formItem" :label-width="80">
        <FormItem label="方案名称">
          <Input :value="formItem.name" @input="setPlanName" />
        </FormItem>
        <FormItem label="相位差">
          <InputNumber :min="0" v-model="formItem.phase_difference" :style="{width:'100%'}"></InputNumber>
        </FormItem>
        <FormItem label="脉冲倒计时">
          <InputNumber :min="0" v-model="formItem.mc_countdown" :style="{width:'100%'}"></InputNumber>
        </FormItem>
        <FormItem label="脉冲宽度">
          <InputNumber :min="0" v-model="formItem.mc_width" :style="{width:'100%'}"></InputNumber>
        </FormItem>
        <FormItem label="最小绿范围">
          <Row>
            <i-col span="11">
              <InputNumber :min="0" :max="255" v-model="formItem.min_green_down" :style="{width:'100%'}"></InputNumber>
            </i-col>
            <i-col span="2" style="text-align: center">-</i-col>
            <i-col span="11">
              <InputNumber :min="0" :max="255" v-model="formItem.min_green_up" :style="{width:'100%'}"></InputNumber>
            </i-col>
          </Row>
        </FormItem>
        <FormItem label="最大绿范围">
          <Row>
            <i-col span="11">
              <InputNumber :min="0" :max="255" v-model="formItem.max_green_down" :style="{width:'100%'}"></InputNumber>
            </i-col>
            <i-col span="2" style="text-align: center">-</i-col>
            <i-col span="11">
              <InputNumber :min="0" :max="255" v-model="formItem.max_green_up" :style="{width:'100%'}"></InputNumber>
            </i-col>
          </Row>
        </FormItem>
        <FormItem label="绿延伸范围">
          <Row>
            <i-col span="11">
              <InputNumber :min="0" :max="255" v-model="formItem.extends_down" :style="{width:'100%'}"></InputNumber>
            </i-col>
            <i-col span="2" style="text-align: center">-</i-col>
            <i-col span="11">
              <InputNumber :min="0" :max="255" v-model="formItem.extends_up" :style="{width:'100%'}"></InputNumber>
            </i-col>
          </Row>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="submitForm">确定</Button>
          <Button type="ghost" style="margin-left: 8px" @click="nextStep">下一步</Button>
        </FormItem>
      </Form>
    </i-col>
  </Row>
</template>
<script>
export default {
  data() {
    return {
      name: ""
    };
  },
  methods: {
    nextStep() {
      this.$router.push({ path: "wayleave" });
      this.$emit("listenStepChange", "wayleave");
    },
    setPlanName(value) {
      this.name = value;
    },
    submitForm() {
      console.log(this.name, this.formItem);
    }
  },
  computed: {
    formItem() {
      return this.$store.state.CharacteristicModule.BASE;
    }
  }
};
</script>
