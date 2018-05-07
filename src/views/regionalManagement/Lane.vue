<template>
    <div class="dh-table-wrapper">
        <div class="dh-table-wrapper-header">
            <Breadcrumb>
                <BreadcrumbItem to="/regionalManagement">区域管理</BreadcrumbItem>
                <BreadcrumbItem>栖霞区</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="dh-table-wrapper-toolbar">
            <Button type="primary" icon="plus" @click="createData">道路</Button>
        </div>
        <Table :columns="columns1" :data="data1" @on-row-click="tableRowClick"></Table>
    </div>
</template>

<script>
export default {
  data() {
    return {
      columns1: [
        {
          title: "道路名称",
          key: "name"
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
                      this.modifyData(params.row.id);
                    }
                  }
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.removeData(params.row.id);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data1: [
        {
          name: "恒源路",
          id: 11
        },
        {
          name: "恒广路",
          id: 12
        },
        {
          name: "恒通路",
          id: 13
        },
        {
          name: "恒天路",
          id: 14
        }
      ]
    };
  },
  methods: {
    createData() {
      this.$Modal.confirm({
        render: h => {
          return h("Input", {
            props: {
              value: this.value,
              autofocus: true,
              placeholder: "请输入新增特征参数名称..."
            },
            on: {
              input: val => {
                this.value = val;
              }
            }
          });
        }
      });
    },
    modifyData(id) {
      this.$Modal.confirm({
        render: h => {
          return h("Input", {
            props: {
              value: this.value,
              autofocus: true,
              placeholder: "请输入新的区域名称..."
            },
            on: {
              input: val => {
                this.value = val;
              }
            }
          });
        }
      });
    },
    removeData(id) {
      this.$Modal.confirm({
        content: "<p>确定删除？删除后无法恢复！</p>",
        loading: true,
        onOk: () => {
          setTimeout(() => {
            this.$Modal.remove();
            this.$Message.info("Asynchronously close the dialog box");
          }, 2000);
        }
      });
    },
    tableRowClick(row, index) {
      this.$router.push({
        path: "/regionalManagement/" + this.$route.params.id + "/" + row.id
      });
    }
  },
  created() {}
};
</script>

<style>

</style>
