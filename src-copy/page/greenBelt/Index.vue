<template>
  <Layout>
    <Header :style="{background: '#fff', padding: '0 20px', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
      <Breadcrumb :style="{display: 'inline-block'}">
        <BreadcrumbItem>绿波带</BreadcrumbItem>
      </Breadcrumb>
      <div style="float:right;">
        <Button type="primary" @click="createData">
          <Icon type="plus" :style="{marginRight:'10px'}"></Icon>新增
        </Button>
        <i-input icon="ios-search" placeholder="请输入名称进行检索" style="width: 200px"></i-input>
      </div>
    </Header>
    <Content :style="{padding: '20px'}">
      <Card dis-hover>
        <Table highlight-row :columns="columns" :data="data" :loading="loading" class="table-noborder"></Table>
        <Page show-sizer show-elevator show-total :current="page" :total="total" :page-size="rows" @on-page-size-change="pageSizeChange" @on-change="pageChange" v-if="show" :style="{'margin':'10px','text-align':'right'}"></Page>
      </Card>
    </Content>
  </Layout>
</template>

<script>
export default {
  data() {
    return {
      // page
      page: 1,
      rows: 20,
      total: 0,
      show: false,
      // tabs
      data: [],
      columns: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "子区名称",
          key: "name"
        },
        {
          title: "周期",
          key: "period",
          width: 160,
          sortable: true
        },
        {
          title: "协调方向",
          key: "coordinate_direction",
          width: 160,
          render: (h, params) => {
            return h(
              "div",
              { "1": "正向协调相位" }[params.row.coordinate_direction]
            );
          }
        },
        {
          title: "绿波类型",
          key: "type",
          width: 160,
          filters: [
            {
              label: "每天",
              value: "0"
            },
            {
              label: "时间段",
              value: "1"
            }
          ],
          filterMultiple: false,
          filterMethod(value, row) {
            if (value === "1") {
              return row.type === "1";
            } else if (value === "0") {
              return row.type === "0";
            }
          },
          render: (h, params) => {
            return h("div", { "0": "每天", "1": "时间段" }[params.row.type]);
          }
        },
        {
          title: "时间范围",
          key: "time_range",
          render: (h, params) => {
            return h(
              "div",
              params.row.mon_day_start + " - " + params.row.mon_day_end
            );
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 200,
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
                      this.viewMore(params.row);
                    }
                  }
                },
                [h("a", "详情")]
              ),
              h("em", { class: ["item-split"] }),
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
              h("em", { class: ["item-split"] }),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.removeData(params.row);
                    }
                  }
                },
                [h("a", "删除")]
              )
            ]);
          }
        }
      ],
      loading: false
    };
  },
  methods: {
    // 请求数据
    fetchData() {
      this.loading = true;
      this.$http("index/d_green_wave/dataList", {
        page: this.page,
        rows: this.rows
      }).then(res => {
        let data = res.data;
        if (res.status === "1") {
          this.data = data.list;
          this.total = ~~data.total;
        }
        this.loading = false;
      });
    },
    // 新增数据
    createData() {},
    // 切换分页
    pageChange(page) {
      this.page = page;
      this.fetchData();
      this.resetScrollbarPosition();
    },
    // 切换页码
    pageSizeChange(rows) {
      if (this.rows !== rows) {
        this.rows = rows;
        this.fetchData();
        this.resetScrollbarPosition();
      }
    },
    // 详情
    viewMore(row) {
      this.resetScrollbarPosition();
      this.$router.push({
        path: "/greenBelt/" + row.id
      });
    }
  },
  watch: {
    total() {
      this.show = this.total > 0 ? true : false;
    }
  },
  created() {
    this.fetchData();
  }
};
</script>

<style lang="less">
</style>