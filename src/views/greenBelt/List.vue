<template>
  <div>
    <Card :padding="0">
      <p slot="title">绿波带</p>
      <a href="javascript:;" slot="extra" @click.prevent="createData">
        <Icon type="plus"></Icon>
        新增
      </a>
      <Table :columns="columns" :data="tableData" :showHeader="false" :loading="loading" highlight-row></Table>
      <Page :current="page" :total="total" :page-size="rows" simple @on-change="pageChange" :style="{'margin':'10px','text-align':'right'}"></Page>
    </Card>

    <Modal v-model="modal" :loading="true" :title="formTitle" @on-ok="formOk">
      <Form :model="formItem" :label-width="80">
        <FormItem label="绿波带名称">
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
        <FormItem label="时间范围">
          <DatePicker type="datetimerange" v-model="formItem.time1" format="yyyy/MM/dd HH:mm" placeholder="请选择日期和时间范围..." v-if="seen" :style="{width:'100%'}"></DatePicker>
          <TimePicker type="timerange" v-model="formItem.time0" format="HH:mm" placeholder="请选择时间范围..." v-if="!seen" :style="{width:'100%'}"></TimePicker>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import GMap from "@/components/GMap";
import {
  getGreenBelt,
  createGreenBelt,
  modifyGreenBelt,
  removeGreenBelt
} from "@/api";
import { d_green_wave } from "@/untils/params.js";
export default {
  components: {
    GMap
  },
  data() {
    return {
      // table
      tableData: [],
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
                      "协调方向：" +
                        d_green_wave.coordinate_direction[
                          params.row.coordinate_direction
                        ]
                    ),
                    h("div", "绿波类型：" + d_green_wave.type[params.row.type]),
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
      loading: false,
      // page
      page: 1,
      rows: 5,
      total: 0,
      // modal,form
      modal: false,
      formTitle: "",
      formItem: {},
      seen: true
    };
  },
  methods: {
    /* ======== table ========= */
    /* 新增 */
    createData() {
      this.modal = true;
      this.formTitle = "绿波带新增";
      this.formItem = {};
      this.formItem.period = 80;
      this.formItem.coordinate_direction = "1";
      this.formItem.type = "1";
    },
    /* 编辑 */
    modifyData(row) {
      this.modal = true;
      this.formTitle = "绿波带编辑";
      this.formItem.name = row.name;
      this.formItem.period = ~~row.period;
      this.formItem.coordinate_direction = row.coordinate_direction;
      this.formItem.type = row.type;
      this.formItem["time" + row.type] = [row.mon_day_start, row.mon_day_end];
      this.formItem.id = row.id;
    },
    /* 删除 */
    removeData(id) {
      this.$Modal.confirm({
        content: "<p>确定删除？删除后无法恢复！</p>",
        loading: true,
        onOk: () => {
          removeGreenBelt({ id: id }).then(res => {
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
    },
    /* 加载数据 */
    loadData() {
      this.loading = true;
      getGreenBelt({
        page: this.page,
        rows: this.rows
      }).then(res => {
        this.tableData = res.data.list;
        this.total = ~~res.data.total;
        this.loading = false;
      });
    },
    /* 分页切换 */
    pageChange(page) {
      this.page = page;
      this.loadData();
    },
    /* 跳转至详情 */
    linkToDetails(row) {
      this.$router.push({
        path: "/greenBelt/details",
        query: {
          id: row.id,
          name: encodeURIComponent(row.name)
        }
      });
    },
    /* ======== from ========= */
    /* 绿波类型切换 */
    typeChange(value) {
      if (value === "1") {
        this.seen = true;
      } else {
        this.seen = false;
      }
    },
    /* 新增或编辑的确定 */
    formOk() {
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
        formData.mon_day_start = `${time1[0].getFullYear()}/${time1[0].getMonth() +
          1}/${time1[0].getDate()} ${time1[0].getHours()}:${time1[0].getMinutes()}`;
        formData.mon_day_end = `${time1[1].getFullYear()}/${time1[1].getMonth() +
          1}/${time1[1].getDate()} ${time1[1].getHours()}:${time1[1].getMinutes()}`;
      }

      if (this.formItem.id) {
        //编辑
        modifyGreenBelt({
          id,
          ...formData
        }).then(res => {
          if (res.status) {
            this.$Message.success("修改成功");
          } else {
            this.$Message.error("修改失败");
          }
          this.modal = false;
          this.loadData();
        });
      } else {
        // 新增
        createGreenBelt(formData).then(res => {
          if (res.status) {
            this.$Message.success("添加成功");
          } else {
            this.$Message.error("添加失败");
          }
          this.modal = false;
          this.loadData();
        });
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
