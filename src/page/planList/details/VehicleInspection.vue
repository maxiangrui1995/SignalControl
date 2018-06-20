<template>
  <div>
    <Table :columns="columns" :data="data" :loading="loading" class="ivu-table-noborder"></Table>

    <Modal v-model="modal" :title="modalTitle">
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
      <div slot="footer">
        <Button type="text" @click="modal = false">取消</Button>
        <Button type="primary" :loading="modal_loading" @click="formOk">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { dataList, dataUpdate } from "@/api/d_car_sensor";
export default {
  data() {
    return {
      id: this.$route.params.id,
      // table
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
                  on: {
                    click: () => {
                      this.modifyData(params.row);
                    }
                  }
                },
                [h("a", "编辑")]
              )
            ]);
          }
        }
      ],
      data: [],
      loading: false,
      // page
      page: 1,
      rows: 10,
      // modal
      modal: false,
      modalTitle: "",
      modal_loading: false,
      // form
      formItem: {}
    };
  },
  methods: {
    loadData() {
      this.loading = true;
      dataList({
        plan_id: this.id,
        page: 1,
        rows: 10
      }).then(res => {
        if (res.status) {
          this.data = res.data.list;
        }
        this.loading = false;
      });
    },
    modifyData(row) {
      this.modal = true;
      this.modalTitle = "车检器信息编辑";
      this.formItem = {
        id: row.id,
        plan_id: row.plan_id,
        serial_number: row.serial_number,
        channel_1: ~~row.channel_1,
        channel_2: ~~row.channel_2,
        channel_3: ~~row.channel_3,
        channel_4: ~~row.channel_4,
        channel_5: ~~row.channel_5,
        channel_6: ~~row.channel_6,
        channel_7: ~~row.channel_7,
        channel_8: ~~row.channel_8,
        min_green: ~~row.min_green,
        max_green: ~~row.max_green
      };
    },
    formOk() {
      dataUpdate(this.formItem).then(res => {
        if (res.status) {
          this.$Message.success("编辑成功");
          this.modal = false;
          this.loadData();
        } else {
          this.$Message.error(res.message);
        }
        this.modal_loading = false;
      });
    }
  },
  created() {
    this.loadData();
  }
};
</script>

<style>
</style>
