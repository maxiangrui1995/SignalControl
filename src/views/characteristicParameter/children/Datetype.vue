<template>
  <Table :columns="columns" :data="data" :border="true" :loading="loading"></Table>
</template>

<script>
import { getDateType } from "@/api";
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
      // data: [],
      id: this.$route.params.id
      // loading: false
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
    changeStatus(row, type) {
      console.log(row, type);
      row[type] = row[type] === "1" ? "0" : "1";
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
              this.changeStatus(params.row, type);
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
    }
  },
  computed: {
    data() {
      return this.$store.state.characterModule.weekData;
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
