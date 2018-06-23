<template>
  <div class="card">
    <div class="card-header">
      <div class="card-title">
        <h3>区域管理</h3>
        <Tooltip content="区域管理" transfer :style="{height:'16px',lineHeight:'16px',marginRight:'10px',cursor:'pointer'}">
          <Icon type="information-circled"></Icon>
        </Tooltip>
        <span v-if="show">共
          <i class="warning">{{total}}</i> 条</span>
      </div>
      <div class="card-extra">
        <Button type="primary" @click="createData">
          <Icon type="plus" :style="{marginRight:'10px'}"></Icon>新增
        </Button>
        <i-input icon="ios-search" placeholder="请输入方案名称进行检索" style="width: 200px"></i-input>
      </div>
    </div>
    <div style="padding:20px">
      <Table highlight-row :show-header="false" :columns="columns" :data="data" :loading="loading"></Table>
    </div>

    <Modal v-model="modal.show" :loading="modal.loading" :title="modal.title" @on-ok="submit">
      <Form ref="form" :model="form.data" :rules="form.rules" :label-width="80">
        <FormItem label="区域名称" prop="name">
          <i-input v-model="form.data.name" placeholder="请输入新的名称"></i-input>
        </FormItem>
      </Form>
    </Modal>
  </div>
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
      columns: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "name",
          key: "name"
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
      data: [],
      loading: false,
      // modal
      modal: {
        show: false,
        loading: true,
        title: "",
        type: null
      },
      // form
      form: {
        data: {},
        rules: {
          name: [
            {
              required: true,
              message: "请输入区域名称",
              trigger: "blur"
            }
          ]
        }
      }
    };
  },
  methods: {
    // 切换分页
    pageChange(page) {
      this.page = page;
      this.fetchPlanList();
      this.scrollbarPosition();
    },
    // 切换页码
    pageSizeChange(rows) {
      this.rows = rows;
      this.fetchPlanList();
      this.scrollbarPosition();
    },
    // 滚动条位置复原
    scrollbarPosition() {
      document.getElementById(
        "home-scrollbar"
      ).childNodes[0].style.marginTop = 0;
    },
    // 请求方案数据
    fetchPlanList() {
      this.loading = true;
      this.$http.post("index/d_area/treeList").then(res => {
        let data = res.data;
        if (data.status === "1") {
          this.data = data.data;
          this.total = ~~data.data.length;
        }
        this.loading = false;
      });
    },
    // 详情
    viewMore(row) {},
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
    this.fetchPlanList();
  },
  watch: {
    total() {
      this.show = this.total > 0 ? true : false;
    }
  }
};
</script>

<style scoped lang="less">
.card {
  &-header {
    padding: 0 20px;
    background: #fff;
    border-bottom: 1px solid #e8e8e8;
    height: 64px;
    line-height: 64px;
  }
  &-title {
    float: left;
    h3 {
      display: inline-block;
      margin-right: 10px;
    }
  }
  &-extra {
    float: right;
  }
}
</style>