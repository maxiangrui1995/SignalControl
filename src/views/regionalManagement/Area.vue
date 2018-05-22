<template>
  <div style="width:300px">
    <Card :padding="0">
      <p slot="title">区域管理</p>
      <a href="javascript:;" slot="extra" @click.prevent="createData">
        <Icon type="plus"></Icon>
        新增
      </a>
      <Table :columns="columns" :data="data" :showHeader="false" :loading="loading" highlight-row></Table>
      <Page :current="page" :total="total" :page-size="rows" simple @on-change="pageChange" :style="{'margin':'10px','text-align':'right'}"></Page>
    </Card>
  </div>
</template>

<script>
import { $d_area } from "@/api";
export default {
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
          width: 80,
          render: (h, params) => {
            return h(
              "Dropdown",
              {
                // props: { trigger: "click" }
                on: {
                  "on-click": name => {
                    switch (true) {
                      case name === "details":
                        this.linkToDetails(params.row);
                        break;
                      case name === "modify":
                        this.modifyData(params.row.id, params.row.name);
                        break;
                      case name === "remove":
                        this.removeData(params.row.id);
                        break;
                      default:
                        break;
                    }
                  }
                }
              },
              [
                h("Icon", { props: { type: "ios-more", size: 20 } }),
                h(
                  "DropdownMenu",
                  {
                    slot: "list"
                  },
                  [
                    h("DropdownItem", { props: { name: "details" } }, "下一级"),
                    h("DropdownItem", { props: { name: "modify" } }, "编辑"),
                    h("DropdownItem", { props: { name: "remove" } }, "删除")
                  ]
                )
              ]
            );
          }
        }
      ],
      data: [],
      loading: false,
      page: 1,
      rows: 5,
      total: 0
    };
  },
  methods: {
    pageChange(page) {
      this.page = page;
      this.loadData();
    },
    loadData() {
      this.data = [];
      this.loading = true;
      this.tableData.forEach((item, i) => {
        if (i >= (this.page - 1) * this.rows && i < this.page * this.rows) {
          this.data.push(item);
        }
      });
      this.total = this.tableData.length;
      this.loading = false;
    },
    linkToDetails(row) {
      this.$router.push({
        path: "/regionalManagement/" + row.id
      });
    },
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
          $d_area
            .dataAdd({
              pid: 0,
              name: newValue
            })
            .then(res => {
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
          $d_area
            .dataUpdate({
              id: id,
              name: newValue
            })
            .then(res => {
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
          $d_area.dataDelete({ id: id }).then(res => {
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
    }
  },
  computed: {
    tableData() {
      return this.$store.state.regionModule.data;
    }
  },
  watch: {
    tableData() {
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
