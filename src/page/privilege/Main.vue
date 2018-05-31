<template>
  <div style="position:absolute;top:20px;left:20px;width:300px;">
    <Card :bordered="false" :padding="10">
      <p slot="title">特勤联动</p>
      <a href="javascript:;" slot="extra" @click.prevent="createData">
        <Icon type="plus"></Icon>
        新增
      </a>
      <div class="ivu-article">
        <blockquote>
          <p>当前已激活
            <i class="ivu-total">{{data_active.length}}</i> / 3条。
            <a href="javascript:;" v-if="data_active.length">立即查看</a>
          </p>
          <Tag closable v-for="item in data_active" :key="item.sch_id">{{item.sch_name}}</Tag>
        </blockquote>
      </div>
      <Table :columns="columns" :data="data" :showHeader="false" :loading="loading"></Table>
      <Page :current="page" :total="total" :page-size="rows" simple @on-change="pageChange" :style="{'margin':'10px','text-align':'right'}"></Page>
    </Card>

    <Modal v-model="modal" :title="modalTitle" :width="900">
      <Form ref="form" :model="formItem" :rules="formRules" :label-width="60">
        <Row :gutter="1">
          <i-col span="8">
            <FormItem label="预案号" prop="sch_id">
              <InputNumber v-model="formItem.sch_id" :disabled="sch_id_disabled" :min="0" :style="{width:'100%'}"></InputNumber>
            </FormItem>
          </i-col>
          <i-col span="8">
            <FormItem label="预案名" prop="sch_name">
              <Input v-model="formItem.sch_name" placeholder="请输入预案名" />
            </FormItem>
          </i-col>
          <i-col span="8">
            <FormItem label="警车号" prop="boundPlate">
              <Input v-model="formItem.boundPlate" placeholder="请输入车牌号" />
            </FormItem>
          </i-col>
        </Row>
        <Row :gutter="1" v-for="(item,index) in formItem.children" :key="index">
          <i-col span="3">
            <FormItem label="序号">
              <Input :value="index+1" readonly/>
            </FormItem>
          </i-col>
          <i-col span="5">
            <FormItem label="信号机" prop="id">
              <Select v-model="item.id">
                <Option v-for="value in data_machine" :key="value.id+item.id" :value="''+value.id">{{value.name}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="3">
            <FormItem label="由" prop="dir_from">
              <Select v-model="item.dir_from">
                <Option v-for="(value,key,index) in position" :key="index" :value="''+key">{{value}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="3">
            <FormItem label="向" prop="dir_to">
              <Select v-model="item.dir_to">
                <Option v-for="(value,key,index) in position" :key="index" :value="''+key">{{value}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="4">
            <FormItem label="距离" prop="distance">
              <InputNumber v-model="item.distance" :min="0" :formatter="value => `${value} 米`" :parser="value => value.replace(' 米', '')" :style="{width:'100%'}"></InputNumber>
            </FormItem>
          </i-col>
          <i-col span="4">
            <FormItem label="延时" prop="delay">
              <InputNumber v-model="item.delay" :min="0" :formatter="value => `${value} 秒`" :parser="value => value.replace(' 秒', '')" :style="{width:'100%'}"></InputNumber>
            </FormItem>
          </i-col>
          <i-col span="2">
            <Button type="text">
              <a href="javascript:;" @click="removeSignalStep(index)">
                删除
              </a>
            </Button>
          </i-col>
        </Row>
        <Row>
          <i-col>
            <Button type="dashed" long icon="plus-round" @click="addSignalStep">新增信号机</Button>
          </i-col>
        </Row>
      </Form>

      <div slot="footer">
        <Button type="text" @click="modal = false">取消</Button>
        <Button type="primary" :loading="modal_loading" @click="formOk">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import {
  planList,
  activation,
  planDel,
  planEdit,
  planAdd
} from "@/api/d_secret_service_plan";
import { dataList } from "@/api/d_machine";
import { position } from "@/untils/params";
export default {
  name: "greenBelt",
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
          type: "selection",
          width: 30,
          align: "center"
        },
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
                h("Tag", row.sch_name),
                h(
                  "div",
                  {
                    slot: "content"
                  },
                  [
                    h(
                      "div",
                      { style: { "margin-bottom": "10px" } },
                      "预案号：" + row.sch_id
                    ),
                    h(
                      "div",
                      { style: { "margin-bottom": "10px" } },
                      "预案名：" + row.sch_name
                    ),
                    h(
                      "div",
                      { style: { "margin-bottom": "10px" } },
                      "车牌号：" + row.boundPlate
                    ),
                    h(
                      "div",
                      "是否激活：" + (row.enabled === "1" ? "已激活" : "未激活")
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
                    console.log(this);

                    switch (true) {
                      case name === "modify":
                        this.modifyData(params.row);
                        break;
                      case name === "remove":
                        this.removeData(params.row);
                        break;
                      case name === "active":
                        this.active(params.row);
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
                    h("DropdownItem", { props: { name: "modify" } }, "编辑"),
                    h("DropdownItem", { props: { name: "remove" } }, "删除"),
                    h(
                      "DropdownItem",
                      {
                        props: {
                          name: "active",
                          disabled:
                            params.row.enabled === "0" &&
                            this.data_active.length >= 3
                              ? true
                              : false
                        }
                      },
                      params.row.enabled === "0" ? "激活" : "注销"
                    )
                  ]
                )
              ]
            );
          }
        }
      ],
      data: [],
      data_active: [],
      data_machine: [],
      modal: false,
      modal_loading: false,
      modalTitle: "",
      formItem: {
        sch_name: "",
        sch_id: 0,
        boundPlate: "",
        children: []
      },
      formRules: {
        sch_id: [{ required: true, message: "请输入预案号" }],
        sch_name: [{ required: true, message: "请输入预案名" }],
        boundPlate: [{ required: true, message: "请输入车牌号" }]
      },
      position: position,
      sch_id_disabled: false
    };
  },
  methods: {
    dropClick(name) {
      console.log(name);
    },
    pageChange(page) {
      this.page = page;
      this.loadData();
    },
    loadData() {
      this.loading = true;
      planList({
        page: this.page,
        rows: this.rows
      }).then(res => {
        if (res.status) {
          res.data.list.forEach(item => {
            if (item.enabled === "1") {
              item._checked = true;
              item._disabled = true;
            }
          });
          this.data = res.data.list;
          this.total = ~~res.data.total;
          this.loading = false;
        }
      });
    },
    loadData_active() {
      planList({
        status: 1
      }).then(res => {
        if (res.status) {
          this.data_active = res.data.list;
        }
      });
    },
    loadData_machine() {
      dataList({ page: 1, rows: 9999 }).then(res => {
        if (res.status === "1") {
          this.data_machine = res.data.list;
        }
      });
    },
    active(row) {
      this.$Modal.confirm({
        content:
          "<p>确定" +
          (row.enabled === "1" ? "注销" : "激活") +
          "这条方案？</p>",
        loading: true,
        onOk: () => {
          activation({
            id: row.sch_id,
            status: row.enabled === "1" ? "0" : "1"
          }).then(res => {
            if (res.data.status === "1") {
              this.$Message.success("操作成功！");
            } else {
              this.$Message.error(res.data.msg);
            }
            this.$Modal.remove();
            this.loadData();
            this.loadData_active();
          });
        }
      });
    },
    modifyData(row) {
      if (row.enabled === "1") {
        this.$Modal.warning({
          content: "当前方案正在执行特勤！请稍后再试"
        });
      } else {
        this.modal = true;
        this.modalTitle = "特勤方案编辑";
        this.formItem.sch_id = ~~row.sch_id;
        this.formItem.sch_name = row.sch_name;
        this.formItem.boundPlate = row.boundPlate;
        this.formItem.children = [];
        row.children.forEach(item => {
          let distance = ~~item.distance;
          let delay = ~~item.delay;
          let id = item.id;
          let dir_from = item.dir_from;
          let dir_to = item.dir_to;
          this.formItem.children.push({
            distance,
            delay,
            id,
            dir_from,
            dir_to
          });
        });
        this.sch_id_disabled = true;
      }
    },
    removeData(row) {
      if (row.enabled === "1") {
        this.$Modal.warning({
          content: "当前方案正在执行特勤！请稍后再试"
        });
      } else {
        this.$Modal.confirm({
          content: "<p>确定删除这条方案？</p>",
          loading: true,
          onOk: () => {
            planDel({
              id: row.sch_id
            }).then(res => {
              if (res.data.status === "1") {
                this.$Message.success("操作成功！");
              } else {
                this.$Message.error(res.data.msg);
                this.$Modal.remove();
                this.loadData();
              }
            });
          }
        });
      }
    },
    formOk() {
      this.modal_loading = true;
      this.$refs["form"].validate(valid => {
        if (!valid) {
          return;
        }
        let sch_id = this.formItem.sch_id;
        let sch_name = this.formItem.sch_name;
        let boundPlate = this.formItem.boundPlate;
        let arr = [];
        this.formItem.children.forEach((item, index) => {
          arr.push(
            `(${sch_id},'${sch_name}','${boundPlate}',${index + 1},${item.id},${
              item.dir_from
            },${item.dir_to},${item.distance},${item.delay})`
          );
        });
        if (this.formItem.type_ === "create") {
          planAdd({
            data: arr.join(",")
          }).then(res => {
            if (res.data.status === "1") {
              this.$Message.success("操作成功");
            } else {
              this.$Message.error(res.data.msg);
            }
            this.modal = false;
            this.loadData();
            this.modal_loading = false;
          });
        } else {
          planEdit({
            data: arr.join(",")
          }).then(res => {
            if (res.data.status === "1") {
              this.$Message.success("操作成功");
            } else {
              this.$Message.error(res.data.msg);
            }
            this.modal = false;
            this.loadData();
            this.modal_loading = false;
          });
        }
      });
    },
    removeSignalStep(index) {
      if (this.formItem.children.length <= 2) {
        return this.$Modal.warning({
          content: "至少保留2条信号机序号!"
        });
      }
      this.formItem.children.splice(index, 1);
    },
    addSignalStep() {
      this.formItem.children.push({
        id: this.data_machine[0].id,
        dir_from: "2",
        dir_to: "4",
        distance: 500,
        delay: 120
      });
    },
    createData() {
      this.modal = true;
      this.modalTitle = "特勤方案新增";
      this.formItem = {
        sch_name: "",
        sch_id: 0,
        boundPlate: "",
        children: [
          {
            id: this.data_machine[0].id,
            dir_from: "2",
            dir_to: "4",
            distance: 500,
            delay: 120
          },
          {
            id: this.data_machine[0].id,
            dir_from: "2",
            dir_to: "4",
            distance: 500,
            delay: 120
          }
        ],
        type_: "create"
      };
    }
  },
  created() {
    this.loadData();
    this.loadData_active();
    this.loadData_machine();
  }
};
</script>

<style>
</style>
