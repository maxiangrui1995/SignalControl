<template>
  <div>
      <div :style="{'margin-bottom':'40px'}">
        <Table :columns="columns_1" :data="data_1" :loading="loading_1"></Table>
        <Modal v-model="modal_1" :loading="true" :title="formTitle" @on-ok="formOk">
          <Form :model="formItem" :label-width="100">
            <FormItem label="统计时间间隔">
              <i-input v-model="formItem.statistic_minutes" :style="{width:'100%'}"></i-input>
            </FormItem>
            <FormItem label="触发时间间隔">
              <i-input v-model="formItem.do_minutes" :style="{width:'100%'}"></i-input>
            </FormItem>
            <FormItem label="触发流量总数">
              <i-input v-model="formItem.flow_total" :style="{width:'100%'}"></i-input>
            </FormItem>
            <FormItem label="东西向车道号">
              <i-input v-model="formItem.lane_east_west" :style="{width:'100%'}"></i-input>
            </FormItem>
            <FormItem label="南北向车道号">
              <i-input v-model="formItem.lane_south_north" :style="{width:'100%'}"></i-input>
            </FormItem>
          </Form>
        </Modal>
      </div>
      <div>
        <Button type="primary" icon="plus" @click="createData" :style="{'margin-bottom':'20px'}">新增</Button>
        <Table :columns="columns_2" :data="data_2" :loading="loading_2"></Table>
        <Modal v-model="modal_2" :loading="true" :title="formTitle" @on-ok="formOk">
          <Form :model="formItem" :label-width="110">
            <FormItem label="东西车流量占比">
              <i-input v-model="formItem.proportion_east_west" :style="{width:'100%'}"></i-input>
            </FormItem>
            <FormItem label="南北车流量占比">
              <i-input v-model="formItem.proportion_south_north" :style="{width:'100%'}"></i-input>
            </FormItem>
            <FormItem label="需要触发方案编号">
              <Select v-model="formItem.pattern_id" placeholder="请选择新的方案... ">
                <Option v-for="(item,index) in planData" :key="index" :value="index">{{item}}</Option>
              </Select>
            </FormItem>
          </Form>
        </Modal>
      </div>
  </div>
</template>

<script>
import {
  getAdaptive_1,
  getAdaptive_2,
  updateAdaptive_1,
  updateAdaptive_2,
  createAdaptive,
  removeAdaptive
} from "@/api";

export default {
  data() {
    return {
      columns_1:[
        {
          title: "统计时间间隔",
          key: "statistic_minutes",
        },
        {
          title: "触发时间间隔",
          key: "do_minutes",
        },
        {
          title: "触发流量总数",
          key: "flow_total",
        },
        {
          title: "东西向车道号",
          key: "lane_east_west",
        },
        {
          title: "南北向车道号",
          key: "lane_south_north",
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
                    click: () => {
                      this.modifyData_1(params.row);
                    }
                  }
                },
                "编辑"
              )
            ]);
          }
        }
      ],
      columns_2: [
        {
          title: "东西车流量占比",
          key: "proportion_east_west",
        },
        {
          title: "南北车流量占比",
          key: "proportion_south_north",
        },
        {
          title: "需要触发方案编号",
          key: "pattern_id",
          render: (h, params) => {
            return h("div", `方案${~~params.row.pattern_id + 1}`);
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
                    click: () => {
                      this.modifyData_2(params.row);
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
      data_1: [],
      data_2: [],
      page: 1,
      rows: 999,
      id: this.$route.params.id,
      pid: 0,
      loading_1: false,
      loading_2: false,
      modal_1: false,
      modal_2: false,
      formTitle: "",
      formItem: {},
      seen: true
    }
  },
  methods: {
    loadData_1() {
      this.loading_1 = true;
      if(!this.formItem.type){
        this.loading_2 = true;
      }
      getAdaptive_1({
        plan_id: this.id
      }).then(res => {
        this.data_1 = [];
        this.data_1.push(res.data);
        this.pid = res.data.id;
        this.loading_1 = false;
        if(!this.formItem.type){
          this.loadData_2();
        }
      });
    },
    loadData_2() {
      this.loading_2 = true;
      getAdaptive_2({
        pid: this.pid,
        page: this.page,
        rows: this.rows
      }).then(res_2 => {
        this.data_2 = res_2.data.list;
        this.loading_2 = false;
      });
    },
    modifyData_1(row) {
      this.modal_1 = true;
      this.formTitle = "自适应方案编辑";
      this.formItem = {
        statistic_minutes: row.statistic_minutes,
        do_minutes: row.do_minutes,
        flow_total: row.flow_total,
        lane_east_west: row.lane_east_west,
        lane_south_north: row.lane_south_north,
        id: row.id,
        type: "modify_1"
      };
    },
    modifyData_2(row) {
      this.modal_2 = true;
      this.formTitle = "自适应方案子区编辑";
      this.formItem = {
        proportion_east_west: row.proportion_east_west,
        proportion_south_north: row.proportion_south_north,
        pattern_id: ~~row.pattern_id,
        pid:row.pid,
        id: row.id,
        type: "modify_2"
      };
    },
    createData() {
      this.modal_2 = true;
      this.formTitle = "自适应方案子新增";
      this.formItem = {
        pid:this.pid,
        type: "create"
      };
    },
    formOk() {
      if(this.formItem.type === 'modify_1'){
        let obj = {};
        obj.statistic_minutes = this.formItem.statistic_minutes;
        obj.do_minutes = this.formItem.do_minutes;
        obj.flow_total = this.formItem.flow_total;
        obj.lane_east_west = this.formItem.lane_east_west;
        obj.lane_south_north = this.formItem.lane_south_north;
        obj.id = this.formItem.id;
        updateAdaptive_1({
          ...obj
        }).then(res => {
          if (res.status) {
            this.$Message.success("编辑成功");
          } else {
            this.$Message.error("编辑失败");
          }
          this.modal_1 = false;
          this.loadData_1();
        });
      }else{
        let obj = {};
        obj.proportion_east_west = this.formItem.proportion_east_west;
        obj.proportion_south_north = this.formItem.proportion_south_north;
        obj.pattern_id = this.formItem.pattern_id;
        obj.pid = this.formItem.pid;
        if(this.formItem.type === 'modify_2'){
          updateAdaptive_2({
            id:this.formItem.id,
            ...obj
          }).then(res => {
            if (res.status) {
              this.$Message.success("编辑成功");
            } else {
              this.$Message.error("编辑失败");
            }
            this.modal_2 = false;
            this.loadData_2();
          });
        }else{
          createAdaptive({
            ...obj
          }).then(res => {
            if (res.status) {
              this.$Message.success("添加成功");
            } else {
              this.$Message.error("添加失败");
            }
            this.modal_2 = false;
            this.loadData_2();
          });
        }
      }
    },
    removeData(id) {
      this.$Modal.confirm({
        content: "<p>确定删除？删除后无法恢复！</p>",
        loading: true,
        onOk: () => {
          removeAdaptive({ id }).then(res => {
            if (res.status) {
              this.$Message.success("删除成功");
            } else {
              this.$Message.error("删除失败");
            }
            this.$Modal.remove();
            this.loadData_2();
          });
        }
      });
    }
  },
  computed: {
    planData() {
      let item = 1;
      let planData = []
      while (item <= ~~this.$store.state.characterModule.planData.total) {
        planData.push('方案' + item);
        item++;
      }
      return planData;
    }
  },
  created() {
    if (!this.$store.state.characterModule.planData.list) {
      this.$store.dispatch("characterModule/SET_PLAN", {
        id: this.id,
        page: 1,
        rows: 10
      });
    }
    this.loadData_1();
  }

}
</script>

<style>
</style>
