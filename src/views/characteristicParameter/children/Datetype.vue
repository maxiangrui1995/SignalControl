<template>
  <div>
    <Table :columns="columns" :data="data" :border="true" :loading="loading"></Table>
    <Button type="primary" :loading="loading" @click="handleSubmit" :style="{'margin-top':'20px'}">确定</Button>
  </div>
</template>

<script>
import { getDateType, updateDateType } from "@/api";
export default {
  data() {
    return {
      columns: [
        {
          title: "日期类型",
          key: "num",
          align: "center",
          render: (h, params) => {
            return h("div", `类型${~~params.row.num + 1}`);
          }
        },
        {
          title: "周日",
          key: "sunday",
          align: "center",
          render: (h, params) => {
            return this.tdRender(h, params, "sunday");
          }
        },
        {
          title: "周一",
          key: "monday",
          align: "center",
          render: (h, params) => {
            return this.tdRender(h, params, "monday");
          }
        },
        {
          title: "周二",
          key: "tuesday",
          align: "center",
          render: (h, params) => {
            return this.tdRender(h, params, "tuesday");
          }
        },
        {
          title: "周三",
          key: "wednesday",
          align: "center",
          render: (h, params) => {
            return this.tdRender(h, params, "wednesday");
          }
        },
        {
          title: "周四",
          key: "thursday",
          align: "center",
          render: (h, params) => {
            return this.tdRender(h, params, "thursday");
          }
        },
        {
          title: "周五",
          key: "friday",
          align: "center",
          render: (h, params) => {
            return this.tdRender(h, params, "friday");
          }
        },
        {
          title: "周六",
          key: "saturday",
          align: "center",
          render: (h, params) => {
            return this.tdRender(h, params, "saturday");
          }
        }
      ],
      id: this.$route.params.id,
      copyData: []
    };
  },
  methods: {
    loadData() {
      this.loading = true;
      getDateType({
        plan_id: this.id,
        page: 1,
        rows: 20
      }).then(res => {
        this.data = res.data.list;
        this.loading = false;
      });
    },
    tdRender(h, params, type) {
      return h(
        "div",
        {
          style: {
            width: "100%",
            height: "48px",
            "line-height": "48px"
          },
          on: {
            click: () => {
              params.row[type] = params.row[type] === "1" ? "0" : "1";
              this.copyData[params.index][type] =
                this.copyData[params.index][type] === "1" ? "0" : "1";
            }
          }
        },
        [
          h("Icon", {
            props: {
              type: "checkmark",
              color: params.row[type] === "1" ? "" : "#444"
            }
          })
        ]
      );
    },
    handleSubmit() {
      updateDateType({
        data: this.copyData
      }).then(res => {
        if (res.status) {
          this.$Message.success("操作成功");
        } else {
          this.$Message.error("操作失败");
        }
        this.data.forEach((item, i) => {
          item = Object.assign(item, this.copyData[i]);
        });
      });
    }
  },
  computed: {
    data() {
      let data = this.$store.state.characterModule.weekData;

      data.forEach(element => {
        let copy = Object.assign({}, element);
        this.copyData.push(copy);
      });

      return data;
    },
    loading() {
      return this.$store.state.characterModule.loading;
    }
  },
  created() {
    if (!this.$store.state.characterModule.weekData.length) {
      this.$store.dispatch("characterModule/SET_WEEK", this.id);
    }
  }
};
</script>

<style scoped>
</style>
