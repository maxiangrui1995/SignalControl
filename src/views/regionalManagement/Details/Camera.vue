<template>
  <div>
    <div class="dh-table-wrapper-toolbar">
      <Button type="primary" icon="plus" @click="createData">相机</Button>
    </div>
    <Table :columns="columns" :data="data"></Table>

    <Modal v-model="modal" :loading="true" :title="formTitle" @on-ok="formOk">
      <Form :model="formItem" :label-width="100">
        <FormItem label="相机IP">
          <Input v-model="formItem.ip" placeholder="请输入新的相机IP..." />
        </FormItem>
        <FormItem label="相机端口号">
          <Input v-model="formItem.port" placeholder="请输入新的相机端口号..." />
        </FormItem>
        <FormItem label="类型">
          <Select v-model="formItem.type" placeholder="请选择新的相机类型...">
            <Option value="1">车流量相机</Option>
            <Option value="2">电子警察</Option>
          </Select>
        </FormItem>
        <FormItem label="账号">
          <Input v-model="formItem.username" placeholder="请输入新的相机账号..." />
        </FormItem>
        <FormItem label="密码">
          <Input v-model="formItem.password" placeholder="请输入新的相机密码..." />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
const cameraType = {
  // "0": '普通相机',
  "1": "车流量相机",
  "2": "电子警察"
};

export default {
  data() {
    return {
      columns: [
        {
          title: "相机IP",
          key: "ip"
        },
        {
          title: "相机端口号",
          key: "port"
        },
        {
          title: "类型",
          key: "type",
          render: (h, params) => {
            return h("div", cameraType[params.row.type]);
          }
        },
        {
          title: "用户名",
          key: "username"
        },
        {
          title: "密码",
          key: "password"
        },
        {
          title: "操作",
          key: "active",
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
      modal: false,
      formTitle: "",
      formItem: {}
    };
  },
  props: {
    data: Array
  },
  methods: {
    createData() {
      this.formItem = {
        ip: "",
        port: "",
        type: "",
        username: "",
        password: ""
      };
      this.modal = true;
      this.formTitle = "相机新增";
    },
    formOk() {},
    modifyData(id) {
      this.modal = true;
      this.formTitle = "相机编辑";
      this.data.forEach(item => {
        if (item.id === id) {
          this.formItem.ip = item.ip;
          this.formItem.port = item.port;
          this.formItem.type = item.type;
          this.formItem.username = item.username;
          this.formItem.password = item.password;
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
    }
  }
};
</script>

<style>

</style>
