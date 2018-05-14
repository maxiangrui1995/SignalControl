<template>
  <div>
    <Button type="primary" icon="plus" @click="createData" :style="{'margin-bottom':'20px'}">新增</Button>
    <Table :columns="columns" :data="data" :loading="loading"></Table>
    <Page :total="total" @on-change="pageChange" :style="{'margin-top':'20px','text-align':'right'}"></Page>

    <Modal v-model="modal" :loading="true" :title="formTitle" @on-ok="formOk">
      <Form :model="formItem" :label-width="80">
        <FormItem label="日期类型">
          <Select v-model="formItem.datetype" placeholder="请选择新的日期类型...">
            <Option v-for="item in datetype" :key="item.value" :value="item.value">{{item.label}}</Option>
          </Select>
        </FormItem>
        <FormItem label="功能">
          <Select v-model="formItem.func_num" placeholder="请选择新的功能...">
            <Option v-for="item in func_num" :key="item.value" :value="item.value">{{item.label}}</Option>
          </Select>
        </FormItem>
        <FormItem label="日期范围">
          <DatePicker format="yyyy/MM/dd" type="daterange" placement="bottom-end" confirm placeholder="请选择新的日期范围..." :style="{width:'100%'}"></DatePicker>
        </FormItem>
        <FormItem label="开始时间">
          <TimePicker format="HH:mm" placeholder="Select time" :style="{width:'100%'}"></TimePicker>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { geSchedule } from "@/api";

const week = {
  sunday: "周日",
  monday: "周一",
  tuesday: "周二",
  wednesday: "周三",
  thursday: "周四",
  friday: "周五",
  saturday: "周六"
};

export default {
  data() {
    return {
      datetype: [
        {
          value: "0",
          label: "类型0"
        },
        {
          value: "1",
          label: "类型1"
        },
        {
          value: "2",
          label: "类型2"
        },
        {
          value: "3",
          label: "类型3"
        },
        {
          value: "4",
          label: "类型4"
        },
        {
          value: "5",
          label: "类型5"
        },
        {
          value: "6",
          label: "类型6"
        },
        {
          value: "7",
          label: "类型7"
        },
        {
          value: "8",
          label: "类型8"
        },
        {
          value: "9",
          label: "类型9"
        },
        {
          value: "15",
          label: "自定义"
        }
      ],
      func_num: [
        {
          value: "0",
          label: "定周期方式"
        },
        {
          value: "1",
          label: "待机黄闪"
        },
        {
          value: "2",
          label: "待机全红"
        },
        {
          value: "3",
          label: "无线缆协调"
        },
        {
          value: "4",
          label: "感应方式"
        },
        {
          value: "9",
          label: "时钟同步"
        },
        {
          value: "200",
          label: "自适应方案"
        }
      ],
      columns: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "日期类型",
          key: "datetype",
          width: 180,
          render: (h, params) => {
            let data = "";
            this.datetype.forEach(element => {
              if (element.value === params.row.datetype) {
                data = element.label;
              }
            });
            return h("div", data);
          }
        },
        {
          title: "功能",
          key: "func_num",
          width: 180,
          render: (h, params) => {
            let data = "";
            this.func_num.forEach(element => {
              if (element.value === params.row.func_num) {
                data = element.label;
              }
            });
            return h("div", data);
          }
        },
        {
          title: "日期范围",
          key: "custom_date",
          render: (h, params) => {
            let data = params.row;
            let msg = "";
            if (data.datetype === "15") {
              msg = `${
                data.start_mon < 10 ? "0" + data.start_mon : data.start_mon
              } / ${
                data.start_day < 10 ? "0" + data.start_day : data.start_day
              } - ${
                data.stop_mon < 10 ? "0" + data.stop_mon : data.stop_mon
              } / ${data.stop_day < 10 ? "0" + data.stop_day : data.stop_day}`;
            } else {
              let _msg = [];
              let d = this.weekData[data.datetype];
              for (let i in week) {
                if (d[i] === "1") {
                  _msg.push(week[i]);
                }
              }
              msg = _msg.join(",");
            }
            return h("div", msg);
            /* return h(
              "div",
              `${
                data.start_mon < 10 ? "0" + data.start_mon : data.start_mon
              } / ${
                data.start_day < 10 ? "0" + data.start_day : data.start_day
              } - ${
                data.stop_mon < 10 ? "0" + data.stop_mon : data.stop_mon
              } / ${data.stop_day < 10 ? "0" + data.stop_day : data.stop_day}`
            ); */
          }
        },
        {
          title: "开始时间",
          key: "custom_time",
          render: (h, params) => {
            let data = params.row;
            return h(
              "div",
              `${
                data.start_hour < 10 ? "0" + data.start_hour : data.start_hour
              } : ${
                data.start_min < 10 ? "0" + data.start_min : data.start_min
              }`
            );
          }
        },
        {
          title: "方案",
          key: "patternid",
          render: (h, params) => {
            return h("div", `方案${~~params.row.patternid + 1}`);
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
                  class: {
                    "dh-btn": true
                  },
                  on: {
                    click: () => {}
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
                  class: {
                    "dh-btn": true
                  },
                  on: {
                    click: () => {
                      this.removeData(params.row.id);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data: [],
      page: 1,
      rows: 10,
      total: 1,
      id: this.$route.params.id,
      loading: false,
      modal: false,
      formTitle: "",
      formItem: {}
    };
  },
  methods: {
    removeData() {
      this.$Modal.confirm({
        content: "<p>The dialog box will be closed after 2 seconds</p>",
        loading: true,
        onOk: () => {
          setTimeout(() => {
            this.$Modal.remove();
            this.$Message.info("Asynchronously close the dialog box");
          }, 2000);
        }
      });
    },
    loadData() {
      this.loading = true;
      geSchedule({
        plan_id: this.id,
        page: this.page,
        rows: this.rows
      }).then(res => {
        this.data = res.data.list;
        this.total = ~~res.data.total;
        this.loading = false;
      });
    },
    pageChange(page) {
      this.page = page;
      this.loadData();
    },
    formOk() {},
    createData() {
      this.modal = true;
      this.formTitle = "时间调度新增";
    }
  },
  computed: {
    weekData() {
      return this.$store.state.characterModule.weekData;
    }
  },
  watch: {
    weekData() {
      console.log(this.weekData);
    }
  },
  created() {
    if (!this.$store.state.characterModule.weekData.length) {
      this.$store.dispatch("characterModule/SET_WEEK", this.id);
    }
    this.loadData();
  }
};
</script>

<style>

</style>
