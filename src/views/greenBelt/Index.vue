<template>
  <div>
    <Card :style="{'width':'300px','position':'absolute','top':'20px','left':'20px'}" :padding="0">
      <p slot="title">绿波带</p>
      <a href="javascript:;" slot="extra" @click.prevent="createData">
        <Icon type="plus"></Icon>
        新增
      </a>
      <Table :columns="columns" :data="data" :showHeader="false" :loading="loading"></Table>
      <Page :current="page" :total="total" :page-size="rows" simple :style="{'margin':'10px','text-align':'right'}"></Page>
    </Card>

    <Modal v-model="modal" :loading="true" :title="formTitle" @on-ok="formOk">
      <Form :model="formItem" :label-width="80">
        <FormItem label="子区名称">
          <Input v-model="formItem.name" placeholder="请输入新的子区名称..." />
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
        <FormItem label="时间范围">
          <DatePicker type="datetimerange" v-model="formItem.time" format="yyyy/MM/dd HH:mm" placeholder="请选择日期和时间范围..." v-if="seen" :style="{width:'100%'}"></DatePicker>
          <TimePicker type="timerange" v-model="formItem.time" format="HH:mm" placeholder="请选择时间范围..." v-if="!seen" :style="{width:'100%'}"></TimePicker>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { getGreenBelt } from "@/api";

const type = {
  "0": "每天",
  "1": "时间段"
};
const direction = {
  "1": "正向"
};
export default {
  data() {
    return {
      columns: [
        {
          title: "名称",
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
                h(
                  "Tag",
                  { props: { color: params.row.type === "0" ? "green" : "" } },
                  params.row.name
                ),
                h(
                  "div",
                  {
                    slot: "content"
                  },
                  [
                    h("div", "公共周期：" + params.row.period),
                    h(
                      "div",
                      "协调方向：" + direction[params.row.coordinate_direction]
                    ),
                    h("div", "绿波类型：" + type[params.row.type]),
                    h(
                      "div",
                      "时间范围：" +
                        params.row.mon_day_start +
                        " - " +
                        params.row.mon_day_end
                    )
                  ]
                )
              ]
            );
          }
        },
        {
          title: "操作",
          key: "active",
          width: 80,
          align: "center",
          render: (h, params) => {
            return h(
              "Dropdown",
              {
                props: { trigger: "click" },
                on: {
                  "on-click": name => {
                    if (name === "details") {
                      this.detailData();
                    } else if (name === "modify") {
                      this.modifyData(params.row);
                    } else if (name === "remove") {
                      this.removeData();
                    }
                  }
                }
              },
              [
                h("Icon", { props: { type: "ios-more" } }),
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
      page: 1,
      rows: 5,
      total: 0,
      loading: false,
      modal: false,
      formTitle: "",
      formItem: {},
      seen: true
    };
  },
  methods: {
    loadData() {
      this.loading = true;
      getGreenBelt({
        page: this.page,
        rows: this.rows
      }).then(res => {
        this.data = res.data.list;
        this.total = ~~res.data.total;
        this.loading = false;
      });
    },
    createData() {
      this.modal = true;
      this.formTitle = "绿波带新增";
      this.formItem.period = 80;
      this.formItem.coordinate_direction = "1";
      this.formItem.type = "1";
      this.seen = true;
    },
    modifyData(row) {
      this.modal = true;
      this.formTitle = "绿波带编辑";
      this.formItem.name = row.name;
      this.formItem.period = ~~row.period;
      this.formItem.coordinate_direction = row.coordinate_direction;
      this.formItem.type = row.type;
      this.formItem.time = [row.mon_day_start, row.mon_day_end];
    },
    removeData() {
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
    detailData() {},
    formOk() {},
    typeChange(value) {
      if (value === "1") {
        this.seen = true;
      } else {
        this.seen = false;
      }
    }
  },
  created() {
    this.loadData();
  }
};
</script>

<style>

</style>
