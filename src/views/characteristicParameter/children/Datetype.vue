<template>
    <Table :columns="columns" :data="data" :border="true"></Table>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          title: "日期类型",
          key: "name",
          align: "center"
        },
        {
          title: "周日",
          key: "a",
          align: "center"
        },
        {
          title: "周一",
          key: "b",
          align: "center"
        },
        {
          title: "周二",
          key: "c",
          align: "center"
        },
        {
          title: "周三",
          key: "d",
          align: "center"
        },
        {
          title: "周四",
          key: "e",
          align: "center"
        },
        {
          title: "周五",
          key: "f",
          align: "center"
        },
        {
          title: "周六",
          key: "g",
          align: "center"
        }
      ],
      data: [
        { name: "类型一" },
        { name: "类型二" },
        { name: "类型三" },
        { name: "类型四" },
        { name: "类型五" },
        { name: "类型六" },
        { name: "类型七" },
        { name: "类型八" },
        { name: "类型九" }
      ]
    };
  }
};
</script>

<style>

</style>
