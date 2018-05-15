<template>
  <div class="dh-table-wrapper">
    <div class="dh-table-wrapper-header">
      <Breadcrumb>
        <BreadcrumbItem>区域管理</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="dh-table-wrapper-toolbar">
      <Button type="primary" icon="plus" @click="createData">区域</Button>
    </div>
    <Table :columns="columns" :data="regionData" @on-row-click="tableRowClick" :loading="loading"></Table>
  </div>
</template>

<script>
import { updateArea, createArea, removeArea } from "@/api";
export default {
  name: "regionalManagement",
  data() {
    return {
      columns: [
        {
          title: "区域名称",
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
      ]
    };
  },
  methods: {
    createData() {
      let newValue = "";
      let self = this;
      this.$Modal.confirm({
        render: h => {
          return h("Input", {
            props: {
              value: newValue,
              autofocus: true,
              placeholder: "请输入新的区域名称..."
            },
            on: {
              input: val => {
                newValue = val;
              }
            }
          });
        },
        loading: true,
        onOk() {
          createArea({
            pid: 0,
            name: newValue
          }).then(res => {
            if (res.status) {
              this.$Message.success("添加成功");
            } else {
              this.$Message.error("添加失败");
            }
            this.$Modal.remove();
            self.$store.dispatch("regionModule/SET_DATA");
          });
        }
      });
    },
    modifyData(id, name) {
      let newValue = name;
      let self = this;
      this.$Modal.confirm({
        render: h => {
          return h("Input", {
            props: {
              value: newValue,
              autofocus: true,
              placeholder: "请输入新的区域名称..."
            },
            on: {
              input: val => {
                newValue = val;
              }
            }
          });
        },
        loading: true,
        onOk() {
          updateArea({
            id: id,
            name: newValue
          }).then(res => {
            if (res.status) {
              this.$Message.success("修改成功");
            } else {
              this.$Message.error("修改失败");
            }
            this.$Modal.remove();
            self.$store.dispatch("regionModule/SET_DATA");
          });
        }
      });
    },
    removeData(id) {
      let self = this;
      this.$Modal.confirm({
        content: "<p>确定删除？删除后无法恢复！</p>",
        loading: true,
        onOk: () => {
          removeArea({ id: id }).then(res => {
            if (res.status) {
              this.$Message.success("删除成功");
            } else {
              this.$Message.error("删除失败");
            }
            this.$Modal.remove();
            self.$store.dispatch("regionModule/SET_DATA");
          });
        }
      });
    },
    tableRowClick(row, index) {
      this.$router.push({
        path: "/regionalManagement/" + row.id
      });
    }
  },
  computed: {
    regionData() {
      return this.$store.state.regionModule.data;
    },
    loading() {
      return this.$store.state.regionModule.loading;
    }
  },
  created() {
    if (!this.$store.state.regionModule.data.length) {
      this.$store.dispatch("regionModule/SET_DATA");
    }
  },
  mounted() {}
};
</script>

<style>

</style>
