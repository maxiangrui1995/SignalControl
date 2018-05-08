<template>
  <div class="dh-table-wrapper">
    <div class="dh-table-wrapper-header">
      <Breadcrumb>
        <BreadcrumbItem to="/regionalManagement">区域管理</BreadcrumbItem>
        <BreadcrumbItem :to="breadcrumUrl">{{name}}</BreadcrumbItem>
        <BreadcrumbItem>{{name2}}</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="dh-table-wrapper-toolbar">
      <Button type="primary" icon="plus" @click="createData">路口</Button>
    </div>
    <Table :columns="columns" :data="regionData" @on-row-click="tableRowClick" :loading="loading"></Table>

    <Modal v-model="modal" :loading="true" :title="formTitle" @on-ok="formOk">
      <Form :model="formItem" :label-width="80">
        <FormItem label="路口名称">
          <Input v-model="formItem.name" placeholder="请输入新的路口名称..." />
        </FormItem>
        <FormItem label="路口类型">
          <Select v-model="formItem.direction">
            <Option value="1357">标准十字路口</Option>
            <Option value="135">T型路口1</Option>
            <Option value="137">T型路口2</Option>
            <Option value="157">T型路口3</Option>
            <Option value="357">T型路口4</Option>
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
const direction = {
  "1357": "普通十字路口",
  "135": "T字路口1",
  "137": "T字路口2",
  "157": "T字路口3",
  "357": "T字路口4"
};
export default {
  data() {
    return {
      columns: [
        {
          title: "路口名称",
          key: "name"
        },
        {
          title: "类型",
          key: "direction",
          render: (h, params) => {
            return h("div", direction[params.row.direction]);
          }
        },
        {
          title: "纬度",
          key: "lng"
        },
        {
          title: "经度",
          key: "lat"
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
      name: "",
      name2: "",
      id: this.$route.params.id,
      pid: this.$route.params.pid,
      breadcrumUrl: "/regionalManagement/" + this.$route.params.id,
      modal: false,
      formTitle: "",
      formItem: {}
    };
  },
  methods: {
    formOk() {
      setTimeout(() => {
        this.modal = false;
      }, 500);
      console.log(this.formItem.name);
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
    modifyData(id) {
      this.modal = true;
      this.formTitle = "路口信息编辑";
      this.regionData.forEach(item => {
        if (item.id === id) {
          this.formItem.name = item.name;
          this.formItem.lat = item.lat;
          this.formItem.lng = item.lng;
          this.formItem.direction = item.direction;
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
  computed: {
    regionData() {
      let data = this.$store.state.RegionModule.REGION;
      let region = [];
      if (data) {
        data.forEach(element => {
          if (element.id === this.id) {
            this.name = element.name;
            if (element.children) {
              element.children.forEach(element => {
                if (element.id === this.pid) {
                  this.name2 = element.name;
                  region = element.children;
                }
              });
            }
          }
        });
      }
      return region;
    },
    loading() {
      return this.$store.state.RegionModule.LOADING;
    }
  },
  created() {
    if (!this.$store.state.RegionModule.REGION) {
      this.$store.dispatch("SET_REGION");
    }
  }
};
</script>

<style>

</style>
