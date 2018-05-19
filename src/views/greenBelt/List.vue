<template>
  <div>
    <Card :padding="0">
      <p slot="title">绿波带</p>
      <a href="javascript:;" slot="extra" @click.prevent="createData">
        <Icon type="plus"></Icon>
        新增
      </a>
      <Table :columns="columns" :data="tableData" :showHeader="false" :loading="loading" highlight-row></Table>
      <Page :current="page" :total="total" :page-size="rows" simple @on-change="pageChange" :style="{'margin':'10px','text-align':'right'}"></Page>
    </Card>
  </div>
</template>

<script>
import GMap from "@/components/GMap";
export default {
  components: {
    GMap
  },
  data() {
    return {
      // table
      tableData: [],
      colunms: [{}],
      loading: false,
      // page
      page: 1,
      rows: 5,
      total: 0
    };
  },
  methods: {
    createData() {},
    loadData() {},
    pageChange(page) {
      this.page = page;
    }
  }
};
</script>

<style>
</style>
