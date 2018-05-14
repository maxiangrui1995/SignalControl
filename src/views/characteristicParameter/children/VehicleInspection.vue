<template>
  <div>
    <Table :columns="columns" :data="data" :loading="loading"></Table>

    <Modal v-model="modal" :loading="true" :title="formTitle" @on-ok="formOk">
      <Form :model="formItem" :label-width="80">
        <FormItem label="车道1">
          <InputNumber v-model="formItem.channel_1" :max="255" :min="0" :style="{width:'100%'}"></InputNumber>
        </FormItem>
        <FormItem label="车道2">
          <InputNumber v-model="formItem.channel_2" :max="255" :min="0" :style="{width:'100%'}"></InputNumber>
        </FormItem>
        <FormItem label="车道3">
          <InputNumber v-model="formItem.channel_3" :max="255" :min="0" :style="{width:'100%'}"></InputNumber>
        </FormItem>
        <FormItem label="车道4">
          <InputNumber v-model="formItem.channel_4" :max="255" :min="0" :style="{width:'100%'}"></InputNumber>
        </FormItem>
        <FormItem label="车道5">
          <InputNumber v-model="formItem.channel_5" :max="255" :min="0" :style="{width:'100%'}"></InputNumber>
        </FormItem>
        <FormItem label="车道6">
          <InputNumber v-model="formItem.channel_6" :max="255" :min="0" :style="{width:'100%'}"></InputNumber>
        </FormItem>
        <FormItem label="车道7">
          <InputNumber v-model="formItem.channel_7" :max="255" :min="0" :style="{width:'100%'}"></InputNumber>
        </FormItem>
        <FormItem label="车道8">
          <InputNumber v-model="formItem.channel_8" :max="255" :min="0" :style="{width:'100%'}"></InputNumber>
        </FormItem>
        <FormItem label="最小绿">
          <InputNumber v-model="formItem.min_green" :max="255" :min="0" :style="{width:'100%'}"></InputNumber>
        </FormItem>
        <FormItem label="最大绿">
          <InputNumber v-model="formItem.max_green" :max="255" :min="0" :style="{width:'100%'}"></InputNumber>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { getVehicleInspection } from "@/api";
export default {
  data() {
    return {
      columns: [
        {
          title: "阶段号",
          key: "serial_number",
          render: (h, params) => {
            return h("div", `阶段${~~params.row.serial_number + 1}`);
          }
        },
        {
          title: "车道1",
          key: "channel_1"
        },
        {
          title: "车道2",
          key: "channel_2"
        },
        {
          title: "车道3",
          key: "channel_3"
        },
        {
          title: "车道4",
          key: "channel_4"
        },
        {
          title: "车道5",
          key: "channel_5"
        },
        {
          title: "车道6",
          key: "channel_6"
        },
        {
          title: "车道7",
          key: "channel_7"
        },
        {
          title: "车道8",
          key: "channel_8"
        },
        {
          title: "最小绿",
          key: "min_green"
        },
        {
          title: "最大绿",
          key: "max_green"
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
                  class: {
                    "dh-btn": true
                  },
                  on: {
                    click: () => {
                      this.modifyData(params.row);
                    }
                  }
                },
                "编辑"
              )
            ]);
          }
        }
      ],
      data: [],
      id: this.$route.params.id,
      page: 1,
      rows: 10,
      loading: false,
      modal: false,
      formTitle: "",
      formItem: {}
    };
  },
  methods: {
    loadData() {
      this.loading = true;
      getVehicleInspection({
        plan_id: this.id,
        page: 1,
        rows: 10
      }).then(res => {
        this.data = res.data.list;
        this.loading = false;
      });
    },
    removeData() {
      this.$Modal.confirm({
        content: "<p>The dialog box will be closed after 2 seconds</p>",
        loading: true,
        onOk: () => {
          setTimeout(() => {
            this.$Modal.remove();
            this.$Message.info("Asynchronously close the dialog box");
          }, 2000);
        }
      });
    },
    modifyData(row) {
      this.modal = true;
      this.formTitle = "车检器信息编辑";
      for (let i in row) {
        row[i] = ~~row[i];
      }
      this.formItem = row;
    },
    formOk() {}
  },
  created() {
    this.loadData();
  }
};
</script>

<style>

</style>
