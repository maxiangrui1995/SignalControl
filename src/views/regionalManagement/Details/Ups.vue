<template>
  <div>
    <!--  <div class="dh-table-wrapper-toolbar">
      <Button type="primary" icon="plus" @click="createData" :disabled="isDisabled">备用电源</Button>
    </div> -->
    <Table :columns="columns" :data="data"></Table>

    <Modal v-model="modal" :loading="true" :title="formTitle" @on-ok="formOk">
      <Form :model="formItem" :label-width="100">
        <FormItem label="备用电源IP">
          <Input v-model="formItem.ip" placeholder="请输入新的备用电源IP..." />
        </FormItem>
        <FormItem label="备用电源端口号">
          <Input v-model="formItem.port" placeholder="请输入新的备用电源端口号..." />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          title: "备用电源IP",
          key: "ip"
        }
        /* {
          title: "备用电源端口号",
          key: "port"
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
        } */
      ],
      modal: false,
      formTitle: "",
      formItem: {}
    };
  },
  props: {
    data: Array
  },
  computed: {
    isDisabled() {
      return this.data.length ? true : false;
    }
  },
  methods: {
    createData() {
      this.formItem = {
        ip: "",
        port: "5000"
      };
      this.modal = true;
      this.formTitle = "备用电源新增";
    },
    formOk() {},
    modifyData(id) {
      this.modal = true;
      this.formTitle = "备用电源编辑";
      this.data.forEach(item => {
        if (item.id === id) {
          this.formItem.ip = item.ip;
          this.formItem.port = item.port;
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
