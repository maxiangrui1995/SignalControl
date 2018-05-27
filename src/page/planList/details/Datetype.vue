<template>
    <div>
        <Table :columns="columns" :data="data" :border="true" :loading="loading"></Table>
        <Button type="primary" :loading="loading" @click="handleSubmit" :style="{'margin-top':'10px'}">确定</Button>
    </div>
</template>

<script>
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
      data: [],
      loading: false
    };
  },
  methods: {
    handleSubmit() {}
  }
};
</script>

<style scoped>
</style>
