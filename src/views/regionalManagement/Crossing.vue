<template>
    <div class="dh-table-wrapper">
        <div class="dh-table-wrapper-header">
            <Breadcrumb>
                <BreadcrumbItem to="/regionalManagement">区域管理</BreadcrumbItem>
                <BreadcrumbItem :to="breadcrumUrl">栖霞区</BreadcrumbItem>
                <BreadcrumbItem>恒园路</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="dh-table-wrapper-toolbar">
            <Button type="primary" icon="plus" @click="createData">路口</Button>
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
          title: "路口名称",
          key: "name"
        },
        {
          title: "纬度",
          key: "lat",
          align: "right"
        },
        {
          title: "经度",
          key: "lng",
          align: "right"
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
          name: "路口11",
          id: 111,
          lat: "119",
          lng: "36"
        },
        {
          name: "路口12",
          id: 112
        },
        {
          name: "路口13",
          id: 1113
        },
        {
          name: "路口14",
          id: 1114
        }
      ],
      breadcrumUrl: "/regionalManagement/" + this.$route.params.pid
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
        path:
          "/regionalManagement/" +
          this.$route.params.id +
          "/" +
          this.$route.params.pid +
          "/" +
          row.id
      });
    }
  },
  created() {
    console.log(this.$route);
  }
};
</script>

<style>

</style>
