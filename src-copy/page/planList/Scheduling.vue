<template>
  <Card dis-hover>
    <Button type="primary" icon="plus" @click="createData" :style="{'margin-bottom':'10px'}">新增</Button>
    <Table :columns="columns" :data="data" :loading="loading" class="ivu-table-noborder"></Table>
    <Page show-sizer show-elevator show-total :current="page" :total="total" :page-size="rows" @on-page-size-change="pageSizeChange" @on-change="pageChange" v-if="showPage" :style="{'margin':'10px','text-align':'right'}"></Page>
  </Card>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      // table
      columns: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "日期类型",
          key: "datetype"
        },
        {
          title: "功能",
          key: "func_num"
        },
        {
          title: "日期范围",
          key: "custom_date"
        },
        {
          title: "开始时间",
          key: "custom_time"
        },
        {
          title: "方案",
          key: "patternid"
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
      loading: false,
      // page
      page: 1,
      rows: 10,
      total: 0,
      showPage: false
    };
  },
  methods: {
    loadData() {
      this.loading = true;
      dataList({
        plan_id: this.id,
        page: this.page,
        rows: this.rows
      }).then(res => {
        if (res.status === "1") {
          this.data = res.data.list;
          this.total = ~~res.data.total;
        }
        this.loading = false;
      });
    },
    // 加载日期类型数据
    loadWeekData() {
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
    // 加载方案数据
    loadPlanData() {
      dataList_pattern({ plan_id: this.id, page: 1, rows: 32 }).then(res => {
        if (res.status === "1") {
          this.planData = res.data.list;
        }
      });
    },
    createData() {
      this.modal = true;
      this.modalTitle = "时间调度新增";
      this.formItem = {
        datetype: "0",
        func_num: func_num[0].value || "",
        type_: "create"
      };
    },
    modifyData(row) {
      this.modal = true;
      this.modalTitle = "时间调度编辑";
      this.formItem = {
        datetype: "" + row.datetype,
        func_num: "" + row.func_num,
        custom_date: [
          `${row.start_mon}/${row.start_day}`,
          `${row.stop_mon}/${row.stop_day}`
        ],
        custom_time: `${row.start_hour}:${row.start_min}`,
        patternid: "" + row.patternid,
        id: row.id,
        type_: "modify"
      };
    },
    removeData(id) {
      this.$Modal.confirm({
        content: "<p>确定删除？删除后无法恢复！</p>",
        loading: true,
        onOk: () => {
          dataDelete({ id }).then(res => {
            if (res.status) {
              this.$Message.success("删除成功");
              this.loadData();
            } else {
              this.$Message.error(res.message);
            }
            this.$Modal.remove();
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
        if (obj.datetype === "15") {
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
        if (this.formItem.type_ === "modify") {
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
    pageSizeChange(rows) {
      this.rows = rows;
      this.loadData();
    },
    datetypeChange(value) {
      if (value === "15") {
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
    /*  this.loadWeekData();
    this.loadPlanData();
    this.loadData(); */
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