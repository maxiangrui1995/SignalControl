<template>
  <Row>
    <i-col span="8" offset="8">
      <Form :model="formItem" :label-width="80">
        <FormItem label="方案名称">
          <Input v-model="formItem.name" />
        </FormItem>
        <FormItem label="相位差">
          <Input v-model="formItem.phase_difference" />
        </FormItem>
        <FormItem label="脉冲倒计时">
          <Input v-model="formItem.mc_countdown" />
        </FormItem>
        <FormItem label="脉冲宽度">
          <Input v-model="formItem.mc_width" />
        </FormItem>
        <FormItem label="最小绿范围">
          <Row>
            <i-col span="11">
              <Input v-model="formItem.min_green_down" />
            </i-col>
            <i-col span="2" style="text-align: center">-</i-col>
            <i-col span="11">
              <Input v-model="formItem.min_green_up" />
            </i-col>
          </Row>
        </FormItem>
        <FormItem label="最大绿范围">
          <Row>
            <i-col span="11">
              <Input v-model="formItem.max_green_down" />
            </i-col>
            <i-col span="2" style="text-align: center">-</i-col>
            <i-col span="11">
              <Input v-model="formItem.max_green_up" />
            </i-col>
          </Row>
        </FormItem>
        <FormItem label="绿延伸范围">
          <Row>
            <i-col span="11">
              <Input v-model="formItem.extends_down" />
            </i-col>
            <i-col span="2" style="text-align: center">-</i-col>
            <i-col span="11">
              <Input v-model="formItem.extends_up" />
            </i-col>
          </Row>
        </FormItem>
        <FormItem>
          <Button type="primary">确定</Button>
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
      formItem: {}
    };
  },
  methods: {
    nextStep() {
      this.$router.push({ path: "wayleave" });
      this.$emit("listenStepChange", "wayleave");
    }
  },
  created() {
    this.$ajax
      .post("d_plan/dataView", {
        id: this.$route.params.id
      })
      .then(res => {
        this.formItem = res.data.data;
      });
  }
};
</script>
