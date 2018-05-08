<template>
    <div>
        <div class="dh-table-wrapper-toolbar">
            <Button type="primary" icon="plus" @click="createData">车检器</Button>
        </div>
        <Table :columns="columns" :data="data"></Table>

        <Modal v-model="modal" :loading="true" :title="formTitle" @on-ok="formOk">
            <Form :model="formItem" :label-width="100">
                <FormItem label="车检器IP">
                    <Input v-model="formItem.ip" placeholder="请输入新的车检器IP..." />
                </FormItem>
                <FormItem label="车检器别名">
                    <Input v-model="formItem.name" placeholder="请输入新的车检器别名..." />
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
          title: "车检器IP",
          key: "ip"
        },
        {
          title: "车检器别名",
          key: "name"
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
        name: ""
      };
      this.modal = true;
      this.formTitle = "车检器新增";
    },
    formOk() {},
    modifyData(id) {
      this.modal = true;
      this.formTitle = "车检器编辑";
      this.data.forEach(item => {
        if (item.id === id) {
          this.formItem.ip = item.ip;
          this.formItem.name = item.name;
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
