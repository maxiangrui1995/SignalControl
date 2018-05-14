<template>
  <div>
    <Table :columns="columns" :data="data" size="small" :showHeader="false">
      <div slot="footer" :style="{'text-align':'center'}">
        <Button type="dashed" @click="createData" :style="{'width':'100%'}">
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
export default {
  data() {
    return {
      columns: [
        {
          title: "步号",
          key: "index"
        },
        {
          title: "阶段",
          key: "phase",
          render: (h, params) => {
            return h("div", "阶段" + params.row.phase);
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
                      this.removeData();
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
      formItem: {}
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
          index: `步号${i}`,
          phase: `${~~this.row["phase" + i] + 1}`,
          time: `${this.row["time" + i]}`,
          period: `${~~this.row["time" + i] + ~~this.row["time_interval"]}`
        });
      }
      return data;
    },
    phaseData() {
      return this.$store.state.characterModule.phaseData;
    }
  },
  methods: {
    createData() {
      this.formItem = {
        index: `步号${this.data.length + 1}`,
        phase: "",
        time: 25
      };
      this.modal = true;
      this.formTitle = "方案信息新增";
    },
    modifyData(row) {
      this.formItem = {
        index: `${row.index}`,
        phase: row.phase,
        time: ~~row.time
      };
      this.modal = true;
      this.formTitle = "方案信息新增";
    },
    removeData() {
      this.$Modal.confirm({
        content: "<p>确定删除？删除后无法恢复！</p>",
        loading: true,
        onOk: () => {
          setTimeout(() => {
            this.$Modal.remove();
            this.$Message.success("删除成功！");
          }, 500);
        }
      });
    },
    formOk() {}
  }
};
</script>

<style scoped lang="less">

</style>
