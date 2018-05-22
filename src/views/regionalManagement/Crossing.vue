<template>
  <div style="width:300px">
    <Card :padding="0">
      <p slot="title">
        <Breadcrumb>
          <BreadcrumbItem :to="'/regionalManagement/'+id">上一级</BreadcrumbItem>
          <BreadcrumbItem>{{name}}</BreadcrumbItem>
        </Breadcrumb>
      </p>
      <a href="javascript:;" slot="extra" @click.prevent="createData">
        <Icon type="plus"></Icon>
        新增
      </a>
      <Table :columns="columns" :data="data" :showHeader="false" :loading="loading" highlight-row></Table>
      <Page :current="page" :total="total" :page-size="rows" simple @on-change="pageChange" :style="{'margin':'10px','text-align':'right'}"></Page>
    </Card>

    <Modal v-model="modal" :loading="true" :title="formTitle" @on-ok="formOk">
      <Form :model="formItem" :label-width="80">
        <FormItem label="路口名称">
          <Input v-model="formItem.name" placeholder="请输入新的路口名称..." />
        </FormItem>
        <FormItem label="路口类型">
          <Select v-model="formItem.direction">
            <Option value="1357">标准十字路口</Option>
          </Select>
        </FormItem>
        <FormItem label="纬度">
          <Input v-model="formItem.lng" placeholder="请输入新的纬度坐标..." />
        </FormItem>
        <FormItem label="经度">
          <Input v-model="formItem.lat" placeholder="请输入新的经度坐标..." />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { $d_crossing } from "@/api";
import { d_crossing } from "@/untils/params";
export default {
  data() {
    return {
      name: "",
      id: this.$route.params.id,
      pid: this.$route.params.pid,
      columns: [
        {
          title: "路口名称",
          key: "name",
          render: (h, params) => {
            return h(
              "Poptip",
              {
                props: {
                  trigger: "hover",
                  title: "详细信息",
                  placement: "right"
                }
              },
              [
                h("Tag", params.row.name),
                h(
                  "div",
                  {
                    slot: "content"
                  },
                  [
                    h(
                      "div",
                      "路口类型：" +
                        d_crossing["direction"][params.row.direction]
                    ),
                    h("div", "经度：" + params.row.lng),
                    h("div", "纬度：" + params.row.lat)
                  ]
                )
              ]
            );
          }
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
                        this.modifyData(params.row);
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
      total: 0,
      modal: false,
      formTitle: "",
      formItem: {}
    };
  },
  methods: {
    loadData() {
      this.data = [];
      this.loading = true;
      this.regionData.forEach((item, i) => {
        if (i >= (this.page - 1) * this.rows && i < this.page * this.rows) {
          this.data.push(item);
        }
      });
      this.total = this.regionData.length;
      this.loading = false;
    },
    pageChange(page) {
      this.page = page;
      this.loadData();
    },
    linkToDetails(row) {
      this.$router.push({
        path: "/regionalManagement/" + this.id + "/" + this.pid + "/" + row.id
      });
    },
    createData() {
      this.formItem = {
        name: "",
        lat: "",
        lng: "",
        direction: "1357"
      };
      this.modal = true;
      this.formTitle = "路口信息新增";
    },
    modifyData(row) {
      this.modal = true;
      this.formTitle = "路口信息编辑";
      this.formItem.name = row.name;
      this.formItem.lat = row.lat;
      this.formItem.lng = row.lng;
      this.formItem.direction = row.direction;
      this.formItem.id = row.id;
    },
    removeData(id) {
      this.$Modal.confirm({
        content: "<p>确定删除？删除后无法恢复！</p>",
        loading: true,
        onOk: () => {
          $d_crossing.dataDelete({ id: id }).then(res => {
            if (res.status) {
              this.$Message.success("删除成功");
            } else {
              this.$Message.error("删除失败");
            }
            this.$Modal.remove();
            this.$store.dispatch("regionModule/SET_DATA");
          });
        }
      });
    },
    formOk() {
      if (this.formItem.id) {
        //编辑
        $d_crossing
          .dataUpdate({
            area_id: this.pid,
            ...this.formItem,
            road_data: d_crossing.road_data
          })
          .then(res => {
            if (res.status) {
              this.$Message.success("修改成功");
            } else {
              this.$Message.error("修改失败");
            }
            this.modal = false;
            this.$store.dispatch("regionModule/SET_DATA");
          });
      } else {
        //新增
        $d_crossing
          .dataAdd({
            area_id: this.pid,
            ...this.formItem,
            road_data: d_crossing.road_data
          })
          .then(res => {
            if (res.status) {
              this.$Message.success("添加成功");
            } else {
              this.$Message.error("添加失败");
            }
            this.modal = false;
            this.$store.dispatch("regionModule/SET_DATA");
          });
      }
    }
  },
  computed: {
    regionData() {
      let data = this.$store.state.regionModule.data;
      let region = [];
      if (data) {
        data.forEach(element => {
          if (element.id === this.id) {
            if (element.children) {
              element.children.forEach(element => {
                if (element.id === this.pid) {
                  this.name = element.name;
                  region = element.children;
                }
              });
            }
          }
        });
      }
      return region;
    }
  },
  watch: {
    regionData() {
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
