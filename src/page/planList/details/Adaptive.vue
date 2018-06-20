<template>
  <div>
    <Table :columns="columns" :data="data" :loading="loading" class="ivu-table-noborder"></Table>
    <Button type="primary" icon="plus" @click="createData_sub" :style="{'margin':'10px 0'}">新增</Button>
    <Table :columns="columns_sub" :data="data_sub" :loading="loading_sub" class="ivu-table-noborder"></Table>
    <Page show-sizer show-elevator show-total :current="page" :total="total" :page-size="rows" @on-page-size-change="pageSizeChange" @on-change="pageChange" v-if="showPage" :style="{'margin':'10px','text-align':'right'}"></Page>

    <Modal v-model="modal" title="自适应方案编辑">
      <Form :model="formItem" :label-width="90">
        <FormItem label="统计时间间隔">
          <InputNumber v-model="formItem['statistic_minutes']" :min="0" :style="{width:'100%'}"></InputNumber>
        </FormItem>
        <FormItem label="触发时间间隔">
          <InputNumber v-model="formItem['do_minutes']" :min="0" :style="{width:'100%'}"></InputNumber>
        </FormItem>
        <FormItem label="触发流量总数">
          <InputNumber v-model="formItem['flow_total']" :min="0" :style="{width:'100%'}"></InputNumber>
        </FormItem>
        <FormItem label="东西向车道号">
          <Select v-model="formItem['lane_east_west']" multiple>
            <Option v-for="item in 16" :value="''+item" :key="item">{{ item }}</Option>
          </Select>
        </FormItem>
        <FormItem label="南北向车道号">
          <Select v-model="formItem['lane_south_north']" multiple>
            <Option v-for="item in 16" :value="''+item" :key="item">{{ item }}</Option>
          </Select>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="modal = false">取消</Button>
        <Button type="primary" :loading="modal_loading" @click="formOk">确定</Button>
      </div>
    </Modal>

    <Modal v-model="modal_sub" :title="modalTitle">
      <Form :model="formItem_sub" :label-width="90">
        <Row :gutter="20">
          <i-col span="11">
            <FormItem label="东西车流量">
              <InputNumber v-model="formItem_sub.proportion_east_west" :min="0" :style="{width:'100%'}"></InputNumber>
            </FormItem>
          </i-col>
          <i-col span="2" :style="{'text-align':'center','height':'32px','line-height':'32px'}">:</i-col>
          <i-col span="11">
            <FormItem label="南北车流量">
              <InputNumber v-model="formItem_sub.proportion_south_north" :min="0" :style="{width:'100%'}"></InputNumber>
            </FormItem>
          </i-col>
        </Row>
        <Row :gutter="20">
          <i-col span="24">
            <FormItem label="方案编号">
              <Select v-model="formItem_sub.pattern_id" placeholder="请选择新的方案... ">
                <Option v-for="item in planData" :key="item.patternid " :value="''+item.patternid">方案{{~~item.patternid+1}}</Option>
              </Select>
            </FormItem>
          </i-col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="text" @click="modal_sub = false,modal_loading=false">取消</Button>
        <Button type="primary" :loading="modal_loading" @click="formOk_sub">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { dataView, dataUpdate } from "@/api/d_pattern_adaptive";
import { dataList as dataList_pattern } from "@/api/d_pattern";
import {
  dataList,
  dataUpdate as dataUpdate_sub,
  dataDelete as dataDelete_sub,
  dataAdd as dataAdd_sub
} from "@/api/d_pattern_adaptive_sub";
export default {
  name: "adaptive",
  data() {
    return {
      id: this.$route.params.id,
      pid: "",
      // table
      loading: false,
      columns: [
        {
          key: "statistic_minutes",
          title: "统计时间间隔",
          width: 120
        },
        {
          key: "do_minutes",
          title: "触发时间间隔",
          width: 120
        },
        {
          key: "flow_total",
          title: "触发流量总数",
          width: 120
        },
        {
          key: "lane_east_west",
          title: "东西向车道号",
          render: (h, params) => {
            return params.row.lane_east_west.split(",").map(item => {
              return h("Tag", item);
            });
          }
        },
        {
          key: "lane_south_north",
          title: "南北向车道号",
          render: (h, params) => {
            return params.row.lane_south_north.split(",").map(item => {
              return h("Tag", item);
            });
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
                [h("a", "编辑")]
              )
            ]);
          }
        }
      ],
      data: [],
      // page_sub
      page: 1,
      rows: 10,
      total: 0,
      showPage: false,
      // data_sub
      columns_sub: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "东西与南北车流量比例",
          key: "proportion",
          render: (h, params) => {
            let row = params.row;
            return h(
              "div",
              row.proportion_east_west + " : " + row.proportion_south_north
            );
          }
        },
        {
          title: "需要触发的方案编号",
          key: "pattern_id",
          render: (h, params) => {
            return h("div", "方案" + (~~params.row.pattern_id + 1));
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
                      this.modifyData_sub(params.row);
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
                    click: event => {
                      event.stopPropagation();
                      this.removeData_sub(params.row.id);
                    }
                  }
                },
                [h("a", "删除")]
              )
            ]);
          }
        }
      ],
      data_sub: [],
      loading_sub: true,
      // modal_sub
      modal_sub: false,
      modal_loading: false,
      modalTitle: "",
      formItem_sub: {},
      // modal
      modal: false,
      formItem: {},
      // 方案数据
      planData: []
    };
  },
  methods: {
    loadData() {
      this.loading = true;
      dataView({
        plan_id: this.id
      }).then(res => {
        if (res.status === "1") {
          this.data = [res.data];
          this.pid = res.data.id;
          this.loadData_sub();
        }
        this.loading = false;
      });
    },
    pageChange(page) {
      this.page = page;
      this.loadData_sub();
    },
    pageSizeChange(rows) {
      this.rows = rows;
      this.loadData();
    },
    loadPlanData() {
      dataList_pattern({
        plan_id: this.id,
        page: 1,
        rows: 32
      }).then(res => {
        if (res.status) {
          this.planData = res.data.list;
        }
      });
    },
    loadData_sub() {
      this.loading_sub = true;
      dataList({
        pid: this.pid,
        page: this.page,
        rows: this.rows
      }).then(res => {
        if (res.status) {
          this.data_sub = res.data.list;
          this.total = ~~res.data.total;
        }
        this.loading_sub = false;
      });
    },
    modifyData(row) {
      this.modal = true;
      let statistic_minutes = ~~row.statistic_minutes;
      let do_minutes = ~~row.do_minutes;
      let flow_total = ~~row.flow_total;
      let lane_east_west = row.lane_east_west.split(",");
      let lane_south_north = row.lane_south_north.split(",");
      let id = row.id;
      this.formItem = {
        statistic_minutes,
        do_minutes,
        flow_total,
        lane_east_west,
        lane_south_north,
        id
      };
    },
    modifyData_sub(row) {
      this.modalTitle = "自适应子方案编辑";
      this.modal_sub = true;
      let proportion_east_west = ~~row.proportion_east_west;
      let proportion_south_north = ~~row.proportion_south_north;
      let pattern_id = row.pattern_id;
      let id = row.id;
      let pid = row.pid;
      this.formItem_sub = {
        proportion_east_west,
        proportion_south_north,
        pattern_id,
        id,
        pid
      };
    },
    removeData_sub(id) {
      this.$Modal.confirm({
        content: "<p>确定删除？删除后无法恢复！</p>",
        loading: true,
        onOk: () => {
          dataDelete_sub({ id: id }).then(res => {
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
    createData_sub() {
      this.modalTitle = "自适应子方案新增";
      this.modal_sub = true;
      this.formItem_sub = {
        proportion_east_west: 1,
        proportion_south_north: 1,
        pattern_id: "0",
        pid: this.pid
      };
    },
    formOk() {
      this.modal_loading = true;
      let statistic_minutes = this.formItem.statistic_minutes;
      let do_minutes = this.formItem.do_minutes;
      let flow_total = this.formItem.flow_total;
      let lane_east_west = this.formItem.lane_east_west.join(",");
      let lane_south_north = this.formItem.lane_south_north.join(",");
      let id = this.formItem.id;
      dataUpdate({
        statistic_minutes,
        do_minutes,
        flow_total,
        lane_east_west,
        lane_south_north,
        id
      }).then(res => {
        if (res.status) {
          this.$Message.success("修改成功");
          this.modal = false;
          this.loadData();
        } else {
          this.$Message.error(res.message);
        }
        this.modal_loading = false;
      });
    },
    formOk_sub() {
      this.modal_loading = true;
      if (this.formItem_sub.id) {
        dataUpdate_sub(this.formItem_sub).then(res => {
          if (res.status) {
            this.$Message.success("修改成功");
            this.modal_sub = false;
            this.loadData();
          } else {
            this.$Message.error(res.message);
          }
          this.modal_loading_sub = false;
        });
      } else {
        dataAdd_sub(this.formItem_sub).then(res => {
          if (res.status) {
            this.$Message.success("新增成功");
            this.modal_sub = false;
            this.loadData();
          } else {
            this.$Message.error(res.message);
          }
          this.modal_loading_sub = false;
        });
      }
    }
  },
  created() {
    this.loadPlanData();
    this.loadData();
  },
  watch: {
    total() {
      this.showPage = this.total > 0 ? true : false;
    }
  }
};
</script>

<style>
</style>
