<template>
  <div class="dh-table-wrapper">
    <div class="dh-table-wrapper-header">
      <Breadcrumb>
        <BreadcrumbItem to="/regionalManagement">区域管理</BreadcrumbItem>
        <BreadcrumbItem>{{name}}</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="dh-table-wrapper-toolbar">
      <Button type="primary" icon="plus" @click="createData">道路</Button>
    </div>
    <Table :columns="columns" :data="regionData" @on-row-click="tableRowClick" :loading="loading"></Table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
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
                      this.modifyData(params.row.id, params.row.name);
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
                    click: event => {
                      event.stopPropagation();
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
      id: this.$route.params.id,
      name: "",
      newValue: ""
    };
  },
  methods: {
    createData() {
      this.newValue = "";
      this.$Modal.confirm({
        render: h => {
          return h("Input", {
            props: {
              value: this.newValue,
              autofocus: true,
              placeholder: "请输入新增区域名称..."
            },
            on: {
              input: val => {
                this.newValue = val;
              }
            }
          });
        },
        loading: true,
        onOk() {
          setTimeout(() => {
            this.$Modal.remove();
            this.$Message.success("新增成功");
          }, 500);
        }
      });
    },
    modifyData(id, name) {
      this.newValue = name;
      this.$Modal.confirm({
        render: h => {
          return h("Input", {
            props: {
              value: this.newValue,
              autofocus: true,
              placeholder: "请输入新的区域名称..."
            },
            on: {
              input: val => {
                this.newValue = val;
              }
            }
          });
        },
        loading: true,
        onOk() {
          setTimeout(() => {
            this.$Modal.remove();
            this.$Message.success("修改成功");
          }, 500);
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
            this.$Message.success("删除成功！");
          }, 500);
        }
      });
    },
    tableRowClick(row, index) {
      this.$router.push({
        path: "/regionalManagement/" + this.id + "/" + row.id
      });
    }
  },
  computed: {
    regionData() {
      let data = this.$store.state.regionModule.data;
      let region = [];
      if (data) {
        data.forEach(element => {
          if (element.id === this.id) {
            region = element.children;
            this.name = element.name;
          }
        });
      }
      return region;
    },
    loading() {
      return this.$store.state.regionModule.loading;
    }
  },
  created() {
    if (!this.$store.state.regionModule.data.length) {
      this.$store.dispatch("regionModule/SET_DATA");
    }
  }
};
</script>

<style>

</style>
