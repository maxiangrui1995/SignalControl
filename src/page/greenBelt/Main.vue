<template>
  <div>
    <div style="position:absolute;top:20px;left:20px;width:300px;">
      <Card :bordered="false" :padding="10">
        <p slot="title">绿波带</p>
        <a href="javascript:;" slot="extra" @click.prevent="createData">
          <Icon type="plus"></Icon>
          新增
        </a>
        <Table :columns="columns" :data="data" :showHeader="false" :loading="loading"></Table>
        <Page :current="page" :total="total" :page-size="rows" simple @on-change="pageChange" :style="{'margin':'10px','text-align':'right'}"></Page>
      </Card>
    </div>

    <Modal v-model="modal" :title="modalTitle">
      <Form ref="form" :model="formItem" :rules="formRules" :label-width="90">
        <FormItem label="绿波带名称" prop="name">
          <Input v-model="formItem.name" placeholder="请输入新的绿波带名称..." />
        </FormItem>
        <FormItem label="公共周期">
          <InputNumber v-model="formItem.period" :max="255" :min="0" :style="{width:'100%'}"></InputNumber>
        </FormItem>
        <FormItem label="协调方向">
          <Select v-model="formItem.coordinate_direction">
            <Option value="1">正向</Option>
          </Select>
        </FormItem>
        <FormItem label="绿波类型">
          <Select v-model="formItem.type" @on-change="typeChange">
            <Option value="0">每天</Option>
            <Option value="1">时间段</Option>
          </Select>
        </FormItem>
        <FormItem label="时间范围" prop="time1">
          <DatePicker type="datetimerange" v-model="formItem.time1" format="yyyy/MM/dd HH:mm" placeholder="请选择日期和时间范围..." v-if="seen" :style="{width:'100%'}"></DatePicker>
        </FormItem>
        <FormItem label="时间范围" prop="time2" v-if="!seen">
          <TimePicker type="timerange" v-model="formItem.time0" format="HH:mm" placeholder="请选择时间范围..." :style="{width:'100%'}"></TimePicker>
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
import { dataList, dataDelete, dataAdd, dataUpdate } from "@/api/d_green_wave";
import { d_green_wave } from "@/untils/params";
import formatterTime from "@/untils/formatterTime";
export default {
  name: "greenBelt-main",
  data() {
    return {
      // page
      rows: 5,
      page: 1,
      total: 0,
      // table
      loading: false,
      columns: [
        {
          key: "name",
          title: "name",
          render: (h, params) => {
            let row = params.row;
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
                h("Tag", row.name),
                h(
                  "div",
                  {
                    slot: "content"
                  },
                  [
                    h(
                      "div",
                      { style: { "margin-bottom": "10px" } },
                      "公共周期：" + row.period
                    ),
                    h(
                      "div",
                      { style: { "margin-bottom": "10px" } },
                      "协调方向：" +
                        d_green_wave.coordinate_direction[
                          row.coordinate_direction
                        ]
                    ),
                    h(
                      "div",
                      { style: { "margin-bottom": "10px" } },
                      "绿波类型：" + d_green_wave.type[row.type]
                    ),
                    h(
                      "div",
                      "时间范围：" + row.mon_day_start + " - " + row.mon_day_end
                    )
                  ]
                )
              ]
            );
          }
        },
        {
          title: "active",
          key: "active",
          width: 80,
          align: "center",
          render: (h, params) => {
            return h(
              "Dropdown",
              {
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
                    h("DropdownItem", { props: { name: "details" } }, "详情"),
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
      // modal
      modal: false,
      modal_loading: false,
      modalTitle: "",
      formItem: {},
      seen: true,
      formRules: {
        name: [
          {
            required: true,
            message: "请填写绿波带名称"
          }
        ],
        time0: [
          {
            required: true,
            message: "请选择时间"
          }
        ],
        time1: [
          {
            required: true,
            message: "请选择时间"
          }
        ]
      }
    };
  },
  methods: {
    pageChange(page) {
      this.page = page;
      this.loadData();
    },
    loadData() {
      this.loading = true;
      dataList({
        page: this.page,
        rows: this.rows
      }).then(res => {
        this.loading = false;
        if (res.status === "1") {
          this.data = res.data.list;
          this.total = ~~res.data.total;
        }
      });
    },
    formOk() {
      this.modal_loading = true;
      this.$refs["form"].validate(valid => {
        if (!valid) {
          this.modal_loading = false;
          return;
        }
        let {
          id,
          name,
          type,
          coordinate_direction,
          period,
          time0,
          time1
        } = this.formItem;
        let formData = { name, type, coordinate_direction, period };
        if (type === "0") {
          formData.mon_day_start = time0[0];
          formData.mon_day_end = time0[1];
        } else if (type === "1") {
          formData.mon_day_start = formatterTime(time1[0]);
          formData.mon_day_end = formatterTime(time1[1]);
        }
        if (this.formItem.id) {
          dataUpdate({
            id,
            ...formData
          }).then(res => {
            if (res.status) {
              this.$Message.success("修改成功");
              this.modal = false;
              this.loadData();
            } else {
              this.$Message.error("修改失败");
            }
            this.modal_loading = false;
          });
        } else {
          dataAdd(formData).then(res => {
            if (res.status) {
              this.$Message.success("添加成功");
              this.modal = false;
              this.loadData();
            } else {
              this.$Message.error("添加失败");
            }
            this.modal_loading = false;
          });
        }
      });
    },
    typeChange() {},
    createData() {
      this.modal = true;
      this.modalTitle = "绿波带新增";
      this.formItem = {};
      this.formItem.period = 80;
      this.formItem.coordinate_direction = "1";
      this.formItem.type = "1";
    },
    linkToDetails(row) {
      this.$router.push({
        path: "/greenBelt/details",
        query: {
          id: row.id,
          name: encodeURIComponent(row.name)
        }
      });
    },
    modifyData(row) {
      this.modal = true;
      this.modalTitle = "绿波带编辑";
      this.formItem.name = row.name;
      this.formItem.period = ~~row.period;
      this.formItem.coordinate_direction = row.coordinate_direction;
      this.formItem.type = row.type;
      this.formItem["time" + row.type] = [row.mon_day_start, row.mon_day_end];
      this.formItem.id = row.id;
    },
    removeData(id) {
      this.$Modal.confirm({
        content: "<p>确定删除？删除后无法恢复！</p>",
        loading: true,
        onOk: () => {
          dataDelete({ id: id }).then(res => {
            if (res.status) {
              this.$Message.success("删除成功");
            } else {
              this.$Message.error("删除失败");
            }
            this.$Modal.remove();
            this.loadData();
          });
        }
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
