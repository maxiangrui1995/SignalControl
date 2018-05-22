<template>
  <div>
    <Table :columns="columns" :data="data"></Table>

    <Modal v-model="modal" :loading="true" :title="formTitle" @on-ok="formOk">
      <Form :model="formItem" :label-width="100">
        <FormItem label="信号机IP">
          <Input v-model="formItem.ip" placeholder="请输入新的信号机IP..." />
        </FormItem>
        <FormItem label="信号机端口号">
          <Input v-model="formItem.port" placeholder="请输入新的信号机端口号..." />
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
          title: "IP",
          key: "ip"
        }
      ],
      id: this.$route.params.crossing_id,
      modal: false,
      formTitle: "",
      formItem: {}
    };
  },
  props: {
    data: Array
  },
  computed: {
    disabled() {
      return this.data.length > 0 ? true : false;
    }
  },
  methods: {
    createData() {
      this.formItem = {
        ip: "",
        port: "4001"
      };
      this.modal = true;
      this.formTitle = "信号机新增";
    },
    formOk() {},
    modifyData(id) {
      this.modal = true;
      this.formTitle = "信号机编辑";
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
  },
  created() {
    console.log(this.data);
  }
};
</script>

<style>
</style>
