<template>
  <div>
    <Button type="primary" icon="plus" @click="createData" :style="{'margin-bottom':'10px'}">新增</Button>
    <Table :columns="columns" :data="data" :loading="loading" class="ivu-table-noborder"></Table>
    <Page show-sizer show-elevator show-total :current="page" :total="total" :page-size="rows" @on-page-size-change="pageSizeChange" @on-change="pageChange" v-if="showPage" :style="{'margin':'10px','text-align':'right'}"></Page>

    <Modal v-model="modal" :title="modalTitle">
      <Form :model="formItem" :label-width="40">
        <Row :gutter="20" v-for="(item,$index) in ~~formItem.step" :key="$index">
          <i-col span="6">
            <FormItem label="步号">
              <Input :value="$index+1" readonly />
            </FormItem>
          </i-col>
          <i-col span="7">
            <FormItem label="阶段">
              <Select v-model="formItem['phase'+($index+1)]">
                <Option v-for="item in phaseData" :key="item.id" :value="''+item.serialid">阶段{{~~item.serialid+1}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="7">
            <FormItem label="时长">
              <InputNumber v-model="formItem['time'+($index+1)]" :max="255" :min="0" :style="{width:'100%'}"></InputNumber>
            </FormItem>
          </i-col>
          <i-col span="4">
            <Button type="text" @click="removeStep($index)">
              <a href="javascript:;">
                删除
              </a>
            </Button>
          </i-col>
        </Row>
        <Row>
          <i-col>
            <Button type="dashed" long @click="addStep" v-if="formItem.step<8" icon="plus-round">新增步号</Button>
          </i-col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="text" @click="modal = false">取消</Button>
        <Button type="primary" :loading="modal_loading" @click="formOk">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { dataList, dataDelete, dataUpdate, dataAdd } from "@/api/d_pattern";
import { dataList as dataList_phase } from "@/api/d_phasestatus";
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
          title: "方案名称",
          key: "patternid",
          render: (h, params) => {
            let row = params.row;
            let style = { "margin-bottom": "10px" };
            let step = [];
            for (let i = 1; i <= row.step; i++) {
              step.push({
                phase: row["phase" + i],
                time: row["time" + i]
              });
            }
            return h(
              "Poptip",
              {
                props: {
                  trigger: "hover",
                  title: "详细信息",
                  placement: "right"
                }
              },
              [
                h("Tag", `方案${~~row.patternid + 1}`),
                h(
                  "div",
                  {
                    slot: "content"
                  },
                  [
                    step.map((item, index) => {
                      return h(
                        "div",
                        { style: style },
                        `步号${index + 1} - 阶段：${~~item.phase + 1} - 时长：${
                          item.time
                        }`
                      );
                    })
                  ]
                )
              ]
            );
          }
        },
        {
          title: "总步数",
          key: "step"
        },
        {
          title: "间隔",
          key: "time_interval"
        },
        {
          title: "周期",
          key: "period"
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
                      this.removeData(params.row.id, params.index);
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
      id: this.$route.params.id,
      loading: false,
      // page
      total: 0,
      page: 1,
      rows: 10,
      showPage: false,
      modal: false,
      modal_loading: false,
      modalTitle: "",
      formItem: {},
      phaseData: []
    };
  },
  methods: {
    pageChange(page) {
      this.page = page;
      this.loadData();
    },
    pageSizeChange(rows) {
      this.rows = rows;
      this.loadData();
    },
    loadData() {
      this.loading = true;
      dataList({ plan_id: this.id, page: this.page, rows: this.rows }).then(
        res => {
          if (res.status) {
            this.data = res.data.list;
            this.total = ~~res.data.total;
            this.loading = false;
          }
        }
      );
    },
    loadData_phase() {
      dataList_phase({ plan_id: this.id, page: 1, rows: 8 }).then(res => {
        if (res.status) {
          this.phaseData = res.data.list;
        }
      });
    },
    removeData(id, index) {
      // 删除必须从最后一条记录开始
      if ((this.page - 1) * this.rows + index + 1 !== this.total) {
        this.$Modal.warning({
          content: "<p>删除必须从最后一条记录开始!</p>"
        });
      } else {
        this.$Modal.confirm({
          content: "<p>确定删除？删除后无法恢复！</p>",
          loading: true,
          onOk: () => {
            dataDelete({ id: id }).then(res => {
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
      }
    },
    modifyData(row) {
      this.modal = true;
      this.modalTitle = "方案编辑";
      this.formItem = Object.assign({}, row);
      for (let i = 0; i < ~~this.formItem.step; i++) {
        this.formItem["time" + (i + 1)] = ~~this.formItem["time" + (i + 1)];
      }
    },
    createData() {
      this.$Modal.confirm({
        content: "<p>即将自动生成一条方案记录！</p>",
        loading: true,
        onOk: () => {
          dataAdd({ plan_id: this.id }).then(res => {
            if (res.status) {
              this.$Message.success("添加成功");
            } else {
              this.$Message.error(res.message);
            }
            this.$Modal.remove();
            this.loadData();
          });
        }
      });
    },
    addStep() {
      this.formItem.step++;
      this.formItem["phase" + this.formItem.step] = "0";
      this.formItem["time" + this.formItem.step] = 25;
    },
    removeStep(index) {
      if (index + 1 < this.formItem.step) {
        this.$Modal.warning({
          content: "<p>删除必须从最后一条记录开始!</p>"
        });
      } else if (index <= 1) {
        this.$Modal.warning({
          content: "<p>至少保留两条步号!</p>"
        });
      } else {
        this.formItem.step--;
        this.formItem["phase" + (this.formItem.step + 1)] = "255";
        this.formItem["time" + (this.formItem.step + 1)] = 0;
      }
    },
    formOk() {
      this.modal_loading = true;
      let period = 0;
      for (let i = 0; i < ~~this.formItem.step; i++) {
        period +=
          ~~this.formItem["time" + (i + 1)] + ~~this.formItem["time_interval"];
      }
      this.formItem.period = period;
      delete this.formItem._index;
      delete this.formItem._rowKey;
      delete this.formItem.patternid;
      delete this.formItem.plan_id;
      delete this.formItem.time_interval;
      dataUpdate(this.formItem).then(res => {
        if (res.status) {
          this.$Message.success("修改成功");
          this.modal = false;
          this.loadData();
        } else {
          this.$Message.error(res.message);
        }
        this.modal_loading = false;
      });
    }
  },
  created() {
    this.loadData();
    this.loadData_phase();
  },
  watch: {
    total() {
      this.showPage = this.total > 0 ? true : false;
    }
  }
};
</script>

<style scoped>
</style>
