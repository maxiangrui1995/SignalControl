<template>
  <div>
    <Table :columns="columns" :data="data" size="small" :showHeader="false">
      <div slot="footer" :style="{'text-align':'center'}">
        <Button type="dashed" @click="createData" :disabled="disabled" :style="{'width':'100%'}">
          <Icon type="plus"></Icon> 新增
        </Button>
      </div>
    </Table>
    <Modal v-model="modal" :loading="true" :title="formTitle" @on-ok="formOk">
      <Form :model="formItem" :label-width="80">
        <FormItem label="步号">
          <Input v-model="formItem.index" readonly />
        </FormItem>
        <FormItem label="阶段">
          <Select v-model="formItem.phase">
            <Option v-for="item in phaseData" :key="item.id" :value="item.serialid">阶段{{~~item.serialid+1}}</Option>
          </Select>
        </FormItem>
        <FormItem label="时长">
          <InputNumber v-model="formItem.time" :max="255" :min="0" :style="{width:'100%'}"></InputNumber>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { updatePattern } from "@/api";
export default {
  data() {
    return {
      columns: [
        {
          title: "步号",
          key: "index",
          render: (h, params) => {
            return h("div", "步号" + params.row.index);
          }
        },
        {
          title: "阶段",
          key: "phase",
          render: (h, params) => {
            return h("div", "阶段" + (~~params.row.phase + 1));
          }
        },
        {
          title: "时长",
          key: "time",
          render: (h, params) => {
            return h("div", "时长：" + params.row.time);
          }
        },
        {
          title: "周期",
          key: "period",
          render: (h, params) => {
            return h("div", "周期：" + params.row.period);
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 120,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: event => {
                      event.stopPropagation();
                      this.modifyData(params.row);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: event => {
                      event.stopPropagation();
                      this.removeData(
                        params.row.id,
                        params.index,
                        params.row.step
                      );
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      modal: false,
      formTitle: "",
      formItem: {},
      disabled: false
    };
  },
  props: {
    row: Object
  },
  computed: {
    data() {
      let data = [];
      for (let i = 1; i <= this.row.step; i++) {
        data.push({
          index: i,
          phase: `${this.row["phase" + i]}`,
          time: `${this.row["time" + i]}`,
          period: `${~~this.row["time" + i] + ~~this.row["time_interval"]}`,
          step: this.row.step
        });
      }
      this.disabled = this.row.step >= 8 ? true : false;
      return data;
    },
    phaseData() {
      return this.$store.state.characterModule.phaseData;
    }
  },
  methods: {
    createData() {
      this.formItem = {
        index: this.data.length + 1,
        phase: "0",
        time: 25,
        type: "create"
      };
      this.modal = true;
      this.formTitle = "方案信息新增";
    },
    modifyData(row) {
      this.formItem = {
        index: `${row.index}`,
        phase: row.phase,
        time: ~~row.time,
        type: "modify"
      };
      this.modal = true;
      this.formTitle = "方案信息新增";
    },
    removeData(id, index, step) {
      if (index + 1 !== ~~step) {
        this.$Modal.warning({
          content: "<p>删除必须从最后一条记录开始!</p>"
        });
      } else {
        let self = this;
        this.$Modal.confirm({
          content: "<p>确定删除？删除后无法恢复！</p>",
          loading: true,
          onOk: () => {
            let copy = Object.assign({}, this.row);
            copy["phase" + (index + 1)] = 255;
            copy["time" + (index + 1)] = 0;
            copy.step--;
            let period = 0;
            for (let i = 1; i <= ~~copy.step; i++) {
              period += ~~copy["time" + i] + ~~copy["time_interval"];
            }
            copy["period"] = period;
            this.fetch(copy);
          }
        });
      }
    },
    fetch(data) {
      delete data._index;
      delete data._rowKey;
      delete data.patternid;
      delete data.plan_id;
      delete data.time_interval;
      updatePattern(data).then(res => {
        if (res.status) {
          this.$Message.success("操作成功");
        } else {
          this.$Message.error("操作失败");
        }
        this.modal = false;
        this.$Modal.remove();
        this.row = Object.assign(this.row, data);
      });
    },
    formOk() {
      let copy = Object.assign({}, this.row);
      if (this.formItem.type === "modify") {
        let step = ~~copy.step;
        copy["phase" + step] = this.formItem.phase;
        copy["time" + step] = this.formItem.time;
        let period = 0;
        for (let i = 1; i <= step; i++) {
          period += ~~copy["time" + i] + ~~copy["time_interval"];
        }
        copy["period"] = period;
        this.fetch(copy);
      } else {
        copy.step++;
        let step = copy.step;
        copy["phase" + step] = this.formItem.phase;
        copy["time" + step] = this.formItem.time;
        let period = 0;
        for (let i = 1; i <= step; i++) {
          period += ~~copy["time" + i] + ~~copy["time_interval"];
        }
        copy["period"] = period;
        this.fetch(copy);
      }
    }
  }
};
</script>

<style scoped lang="less">

</style>
