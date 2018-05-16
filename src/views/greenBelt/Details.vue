<template>
    <div>
        <Card :padding="0">
            <p slot="title">
                <Breadcrumb>
                    <BreadcrumbItem to="/greenBelt">绿波带</BreadcrumbItem>
                    <BreadcrumbItem>{{name}}</BreadcrumbItem>
                </Breadcrumb>
            </p>
            <Table :columns="columns" :data="data" :showHeader="false" :loading="loading"></Table>
            <Page :current="page" :total="total" :page-size="rows" simple @on-change="pageChange" :style="{'margin':'10px','text-align':'right'}"></Page>
        </Card>
    </div>
</template>

<script>
import { getGreenBeltDetails } from "@/api";
export default {
  data() {
    return {
      id: this.$route.params.id,
      name: decodeURIComponent(this.$route.query.name),
      page: 1,
      rows: 5,
      total: 0,
      data: [],
      loading: false,
      columns: [
        {
          title: "名称",
          key: "name"
        }
      ]
    };
  },
  methods: {
    loadData() {
      this.loading = true;
      getGreenBeltDetails({
        pid: this.id,
        page: this.page,
        rows: this.rows
      }).then(res => {
        this.data = res.data.list;
        this.total = ~~res.data.total;
        this.loading = false;
        this.loading = false;
      });
    },
    pageChange(page) {
      this.page = page;
      this.loadData();
    }
  },
  created() {
    this.loadData();
  }
};
</script>

<style>
</style>
