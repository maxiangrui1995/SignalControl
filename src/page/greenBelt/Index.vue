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
          key: "period"
        },
        {
          title: "协调方向",
          key: "coordinate_direction"
        },
        {
          title: "绿波类型",
          key: "type"
        },
        {
          title: "时间范围",
          key: "time_range"
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
    // 详情
    viewMore(row) {
      this.resetScrollbarPosition();
      this.$router.push({
        path: "/region/" + row.id
      });
    },
    // 编辑
    modifyData(row) {
      this.modal.show = true;
      this.modal.title = "区域编辑";
      this.modal.type = "modify";
      this.form.data = {
        name: row.name,
        id: row.id
      };
    },
    // 删除
    removeData(row) {
      this.$Modal.confirm({
        content: "<h3>确定删除？删除后无法恢复！</h3>",
        loading: true,
        onOk: () => {
          /* dataDelete({ id: id }).then(res => {
            if (res.status) {
              this.$Message.success("删除成功");
            } else {
              this.$Message.error("删除失败");
            }
            this.$Modal.remove();
            this.loadData();
          }); */
        }
      });
    },
    // 新增
    createData() {},
    // 提交
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.modal.type === "modify") {
            let data = this.form.data;
            this.$http
              .post("index/d_area/dataUpdate1", this.form.data)
              .then(res => {
                let data = res.data;
                if (data.status) {
                  this.fetchPlanList();
                  this.$Message.success("编辑成功");
                } else {
                  this.$Message.error(data.message);
                }
                this.modal.show = false;
              });
          }
        }
      });
    }
  },
  created() {
    this.fetchData();
  }
};
</script>

<style lang="less">
</style>