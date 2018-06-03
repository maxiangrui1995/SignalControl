<template>
  <div>
    <Button type="primary" icon="plus" @click="createData" :style="{'margin-bottom':'10px'}">新增</Button>
    <Table :columns="columns" :data="data" :loading="loading"></Table>
    <Page :total="total" @on-change="pageChange" :style="{'margin-top':'10px','text-align':'right'}"></Page>

    <Modal v-model="modal" :title="modalTitle">
      <Form :model="formItem" ref="form" :rules="formRules" :label-width="80">
        <FormItem label="日期类型" prop="datetype">
          <Select v-model="formItem.datetype" @on-change="datetypeChange" placeholder="请选择新的日期类型...">
            <Option v-for="item in 10" :key="item" :value="''+(item-1)">类型{{item-1}}</Option>
            <Option :value="15">自定义</Option>
          </Select>
        </FormItem>
        <FormItem label="功能" prop="func_num">
          <Select v-model="formItem.func_num" placeholder="请选择新的功能...">
            <Option v-for="item in func_num" :key="item.value" :value="item.value">{{item.label}}</Option>
          </Select>
        </FormItem>
        <FormItem label="日期范围" prop="custom_date" v-if="seen">
          <DatePicker format="MM/dd" type="daterange" v-model="formItem.custom_date" placement="bottom-end" confirm placeholder="请选择新的日期范围..." :style="{width:'100%'}"></DatePicker>
        </FormItem>
        <FormItem label="日期范围" v-if="!seen">
          <i-input v-model="formItem.custom_date2" readonly :style="{width:'100%'}"></i-input>
        </FormItem>
        <FormItem label="开始时间" prop="custom_time">
          <TimePicker format="HH:mm" v-model="formItem.custom_time" placeholder="请选择新的开始时间... " :style="{width: '100%'} "></TimePicker>
        </FormItem>
        <FormItem label="方案" prop="patternid">
          <Select v-model="formItem.patternid" placeholder="请选择新的方案... ">
            <Option v-for="item in planData" :key="item.patternid " :value="''+item.patternid">方案{{~~item.patternid+1}}</Option>
          </Select>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="modal = false">取消</Button>
        <Button type="primary" :loading="modal_loading" @click="formOk">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { dataList, dataUpdate, dataAdd, dataDelete } from "@/api/d_timemanage";
import { dataList as dataList_week } from "@/api/d_week";
import { dataList as dataList_pattern } from "@/api/d_pattern";
import { control_func, func_num, week } from "@/untils/params";
export default {
  data() {
    return {
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
            return h(
              "div",
              params.row.datetype === "15"
                ? "自定义"
                : "类型" + params.row.datetype
            );
          }
        },
        {
          title: "功能",
          key: "func_num",
          width: 180,
          render: (h, params) => {
            return h("div", control_func[params.row.func_num]);
          }
        },
        {
          title: "日期范围",
          key: "custom_date",
          render: (h, params) => {
            let row = params.row;
            return h(
              "div",
              row.datetype !== "15"
                ? this.weekData[row.datetype]
                  ? this.weekData[row.datetype].join(" , ")
                  : ""
                : `${row.start_mon}/${row.start_day} - ${row.stop_mon}/${
                    row.stop_day
                  }`
            );
          }
        },
        {
          title: "开始时间",
          key: "custom_time",
          width: 180,
          render: (h, params) => {
            let row = params.row;
            return h("div", `${row.start_hour} : ${row.start_min}`);
          }
        },
        {
          title: "方案",
          key: "patternid",
          width: 180,
          render: (h, params) => {
            let row = params.row;
            return h("div", `方案 ${~~row.patternid + 1}`);
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
                    click: () => {
                      this.modifyData(params.row);
                    }
                  }
                },
                [h("a", "编辑")]
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.removeData(params.row.id);
                    }
                  }
                },
                [h("a", "删除")]
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
      weekData: {},
      planData: [],
      func_num: func_num,
      modal: false,
      modalTitle: "",
      modal_loading: false,
      formItem: {},
      seen: true,
      formRules: {
        datetype: [
          {
            required: true,
            message: "请选择日期类型"
          }
        ],
        func_num: [
          {
            required: true,
            message: "请选择功能"
          }
        ],
        custom_date: [
          {
            required: true,
            message: "请选择日期范围"
          }
        ],
        custom_time: [
          {
            required: true,
            message: "请选择开始时间"
          }
        ],
        patternid: [
          {
            required: true,
            message: "请选择方案"
          }
        ]
      }
    };
  },
  methods: {
    createData() {
      this.modal = true;
      this.modalTitle = "时间调度新增";
      this.formItem = {};
      this.formItem.datetype = "0";
      this.formItem.type = "create";
    },
    modifyData(row) {
      this.modal = true;
      this.modalTitle = "时间调度编辑";
      this.formItem.datetype = row.datetype;
      this.formItem.func_num = row.func_num;
      this.formItem.custom_date = [
        `${row.start_mon}/${row.start_day}`,
        `${row.stop_mon}/${row.stop_day}`
      ];
      this.formItem.custom_time = `${row.start_hour}:${row.start_min}`;
      this.formItem.patternid = row.patternid;
      this.formItem.id = row.id;
      this.formItem.type = "modify";
      console.log(this.formItem);
    },
    removeData(id) {
      this.$Modal.confirm({
        content: "<p>确定删除？删除后无法恢复！</p>",
        loading: true,
        onOk: () => {
          dataDelete({ id }).then(res => {
            if (res.status) {
              this.$Message.success("删除成功");
            } else {
              this.$Message.error(res.message);
            }
            this.$Modal.remove();
            this.loadData();
          });
        }
      });
    },
    formOk() {
      this.modal_loading = true;
      this.$refs["form"].validate(valid => {
        if (!valid) {
          this.modal_loading = false;
          return;
        }

        let obj = {};
        obj.datetype = this.formItem.datetype;
        obj.func_num = this.formItem.func_num;
        obj.patternid = this.formItem.patternid;
        if (obj.datetype === 15) {
          let date = this.formItem.custom_date;
          obj.start_mon = date[0].split("/")[0] || 0;
          obj.start_day = date[0].split("/")[1] || 0;
          obj.stop_mon = date[1].split("/")[0] || 0;
          obj.stop_day = date[1].split("/")[1] || 0;
        } else {
          obj.start_mon = 0;
          obj.start_day = 0;
          obj.stop_mon = 0;
          obj.stop_day = 0;
        }
        let time = this.formItem.custom_time;
        obj.start_hour = time.split(":")[0];
        obj.start_min = time.split(":")[1];

        if (this.formItem.type === "modify") {
          dataUpdate({
            id: this.formItem.id,
            ...obj
          }).then(res => {
            if (res.status) {
              this.$Message.success("编辑成功");
              this.modal = false;
              this.loadData();
            } else {
              this.$Message.error(res.message);
            }
            this.modal_loading = false;
          });
        } else {
          let serialid = this.total;
          serialid++;
          dataAdd({
            plan_id: this.id,
            serialid,
            ...obj
          }).then(res => {
            if (res.status) {
              this.$Message.success("添加成功");
              this.modal = false;
              this.loadData();
            } else {
              this.$Message.error(res.message);
            }
            this.modal_loading = false;
          });
        }
      });
    },
    pageChange(page) {
      this.page = page;
    },
    loadData() {
      this.loading = true;
      dataList({
        plan_id: this.id,
        page: this.page,
        rows: this.rows
      }).then(res => {
        if (res.status) {
          this.data = res.data.list;
          this.total = ~~res.data.total;
          this.loading = false;
        }
      });
    },
    loadData_week() {
      dataList_week({ plan_id: this.id, page: 1, rows: 10 }).then(res => {
        if (res.status) {
          this.weekData = {};
          res.data.list.forEach(item => {
            let array = (this.weekData[item.num] = []);
            for (let i in week) {
              if (item[i] === "1") {
                array.push(week[i]);
              }
            }
          });
        }
      });
    },
    loadData_pattern() {
      dataList_pattern({ plan_id: this.id, page: 1, rows: 32 }).then(res => {
        if (res.status) {
          this.planData = res.data.list;
        }
      });
    },
    datetypeChange(value) {
      if (value === 15) {
        this.seen = true;
      } else {
        this.seen = false;
        this.$set(
          this.formItem,
          "custom_date2",
          this.weekData[value].join(" , ")
        );
      }
    }
  },
  created() {
    this.loadData();
    this.loadData_week();
    this.loadData_pattern();
  }
};
</script>

<style>
</style>
