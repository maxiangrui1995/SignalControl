<template>
  <div>
    <!-- <Alert show-icon closable :style="{width:'220px','margin':'0 auto'}">点击信号灯图标可进行编辑</Alert> -->
    <canvas ref="canvas" width="800" height="600" style="vertical-align:top"></canvas>
    <div style="display:inline-block;width:300px;">
      <Button type="primary" icon="plus" @click="createData" :style="{'margin-bottom':'10px'}">新增</Button>
      <Button type="primary" icon="document-text" @click="saveData" :style="{'margin-bottom':'10px'}">保存</Button>
      <Table :columns="columns" :data="data" :loading="loading" :show-header="false" highlight-row @on-current-change="onCurrentChange"></Table>
    </div>
  </div>
</template>

<script>
import DRAW from "@/untils/signal";
import { dataList as dataList_light } from "@/api/d_phaseinfo";
import {
  dataList as dataList_phase,
  dataUpdate,
  dataDelete,
  dataAdd
} from "@/api/d_phasestatus";
export default {
  name: "lightgroup",
  data() {
    return {
      id: this.$route.params.id,
      columns: [
        {
          key: "serialid",
          name: "serialid",
          render: (h, params) => {
            return h("div", "阶段" + (~~params.row.serialid + 1));
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
      loading: false,
      currentRow: null
    };
  },
  methods: {
    loadData() {
      // 传入路口数据
      let road_data = [
        {
          direction: "1",
          roadnum: "3",
          target: ["3", "2", "4"]
        },
        {
          direction: "3",
          roadnum: "3",
          target: ["3", "2", "4"]
        },
        {
          direction: "5",
          roadnum: "3",
          target: ["3", "2", "4"]
        },
        {
          direction: "7",
          roadnum: "3",
          target: ["3", "2", "4"]
        }
      ];
      dataList_light({ page: 1, rows: 16, plan_id: this.id }).then(res => {
        if (res.status) {
          this.fn.draw({
            CROSSINGDATA: road_data,
            LIGHTDATA: res.data.list
          });
        }
      });
    },
    loadData_phase() {
      this.loading = true;
      dataList_phase({ page: 1, rows: 8, plan_id: this.id }).then(res => {
        if (res.status) {
          res.data.list[0]._highlight = true;
          this.data = res.data.list;
          this.currentRow = res.data.list[0];
          this.fn.PHASEDATA = res.data.list[0].light_list;
          this.loading = false;
        }
      });
    },
    onCurrentChange(currentRow, oldCurrentRow) {
      this.fn.PHASEDATA = currentRow.light_list;
      this.currentRow = currentRow;
    },
    removeData(id, index) {
      if (index + 1 < this.data.length) {
        this.$Modal.warning({
          content: "请从最后一条开始删除！"
        });
      } else {
        this.$Modal.confirm({
          content: "<p>确定删除？删除后无法恢复！</p>",
          loading: true,
          onOk: () => {
            dataDelete({ id: id }).then(res => {
              if (res.status) {
                this.$Message.success(res.message);
              } else {
                this.$Message.error(res.message);
              }
              this.$Modal.remove();
              this.loadData_phase();
            });
          }
        });
      }
    },
    onClick(row) {
      // 1-3,3-1
      let phase = this.fn.PHASEDATA.split("");
      let index = "ABCDEFGHIJKLMNOPQRST".indexOf(row.title);
      phase.splice(index, 1, phase[index] === "1" ? "3" : "1");
      this.fn.PHASEDATA = phase.join("");
    },
    createData() {
      this.$Modal.confirm({
        content: "<p>确定新增一条相位？</p>",
        loading: true,
        onOk: () => {
          dataAdd({ plan_id: this.id }).then(res => {
            if (res.status) {
              this.$Message.success(res.message);
            } else {
              this.$Message.error(res.message);
            }
            this.$Modal.remove();
            this.loadData_phase();
          });
        }
      });
    },
    saveData() {
      let row = this.currentRow;
      dataUpdate({
        id: row.id,
        plan_id: this.id,
        serialid: row.id,
        light_list: this.fn.PHASEDATA,
        phasename: ""
      }).then(res => {
        if (res.status) {
          this.$Message.success(res.message);
        } else {
          this.$Message.error(res.message);
        }
        this.loadData_phase();
      });
    }
  },
  created() {
    this.$nextTick(() => {
      let v = (this.fn = new DRAW(this.$refs.canvas));
      v.onClick = this.onClick;
      this.loadData();
      this.loadData_phase();
    });
  }
};
</script>

<style>
</style>
