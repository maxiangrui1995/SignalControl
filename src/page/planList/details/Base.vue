<template>
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
                    <Button type="primary" :loading="loading" @click="handleSubmit">确定</Button>
                </FormItem>
            </Form>
        </i-col>
    </Row>
</template>
<script>
import { dataUpdate } from "@/api/d_plan";
export default {
  data() {
    return {
      id: this.$route.params.id,
      loading: false
    };
  },
  methods: {
    handleSubmit() {
      this.loading = true;
      dataUpdate(this.formItem).then(res => {
        if (res.status) {
          this.$Message.success("修改成功");
        } else {
          this.$Message.error("修改失败");
        }
        this.loading = false;
      });
    }
  },
  computed: {
    formItem() {
      let data = this.$store.state.characterModule.baseData;
      for (let i in data) {
        let item = data[i];
        if (!isNaN(item)) {
          data[i] = ~~item;
        }
      }
      return data;
    }
  }
};
</script>
