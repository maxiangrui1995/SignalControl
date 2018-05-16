<template>
  <div>
    <Button type="primary" icon="plus" :style="{'margin-bottom':'20px'}" @click="createData">新增</Button>
    <Table :columns="columns" :data="data" :loading="loading"></Table>
    <Page :total="total" @on-change="pageChange" :style="{'margin-top':'20px','text-align':'right'}"></Page>
  </div>
</template>

<script>
import expandRow from "./components/Plan";
import { removePattern, createPattern } from "@/api";
export default {
  components: { expandRow },
  data() {
    return {
      columns: [
        {
          type: "expand",
          width: 50,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                row: params.row
              }
            });
          }
        },
        {
          title: "方案名称",
          key: "patternid",
          render: (h, params) => {
            return h("div", `方案${~~params.row.patternid + 1}`);
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
                      this.removeData(params.row.id, params.index);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      // data: [],
      id: this.$route.params.id,
      // loading: false,
      // total: 0,
      page: 1,
      rows: 10
    };
  },
  methods: {
    pageChange(page) {
      this.page = page;
      this.$store.dispatch("characterModule/SET_PLAN", {
        id: this.id,
        page: this.page,
        rows: this.rows
      });
    },
    createData() {
      this.$Modal.confirm({
        content: "<p>即将自动生成一条方案记录！</p>",
        loading: true,
        onOk: () => {
          createPattern({ plan_id: this.id }).then(res => {
            if (res.status) {
              this.$Message.success("添加成功");
            } else {
              this.$Message.error("添加失败");
            }
            this.$Modal.remove();
            this.loadData();
          });
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
            removePattern({ id: id }).then(res => {
              if (res.status) {
                this.$Message.success("删除成功");
              } else {
                this.$Message.error("删除失败");
              }
              this.$Modal.remove();
              this.loadData();
            });
          }
        });
      }
    },
    loadData() {
      this.$store.dispatch("characterModule/SET_PLAN", {
        id: this.id,
        page: this.page,
        rows: this.rows
      });
    }
  },
  computed: {
    data() {
      return this.$store.state.characterModule.planData.list;
    },
    total() {
      return ~~this.$store.state.characterModule.planData.total;
    },
    loading() {
      return this.$store.state.characterModule.loading;
    }
  },
  created() {
    if (!this.$store.state.characterModule.planData.list) {
      this.loadData();
    }
    if (!this.$store.state.characterModule.phaseData.length) {
      this.$store.dispatch("characterModule/SET_PHASE", this.id);
    }
  }
};
</script>

<style scoped>
</style>
