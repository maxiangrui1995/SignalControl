<template>
    <Layout>
        <Header :style="{background: '#fff', padding: '0 20px', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
            <Breadcrumb :style="{display: 'inline-block'}">
                <BreadcrumbItem>绿波带</BreadcrumbItem>
            </Breadcrumb>
            <div style="float:right;">
                <Button type="primary" @click="createData">
                    <Icon type="plus" :style="{marginRight:'10px'}"></Icon>新增
                </Button>
                <i-input icon="ios-search" placeholder="请输入名称进行检索" style="width: 200px"></i-input>
            </div>
        </Header>
        <Content :style="{padding: '20px'}">
            <Card dis-hover>
                <Table highlight-row :columns="columns" :data="data" :loading="loading" class="table-noborder"></Table>
                <Page show-sizer show-elevator show-total :current="page" :total="total" :page-size="rows" @on-page-size-change="pageSizeChange" @on-change="pageChange" v-if="show" :style="{'margin':'10px','text-align':'right'}"></Page>
            </Card>
        </Content>

        <Modal :mask-closable="false" v-model="visible" :title="activeType==='modify' ? '绿波带编辑' : '绿波带新增'" :loading="true" @on-ok="submitForm">
            <Form ref="form" :model="formData" :rules="formRules" :label-width="90">
                <FormItem label="绿波带名称" prop="name">
                    <Input v-model="formData.name" placeholder="请输入新的绿波带名称..." :style="{ width: '260px' }" />
                </FormItem>
                <FormItem label="公共周期">
                    <InputNumber v-model="formData.period" :max="255" :min="0"></InputNumber>
                </FormItem>
                <FormItem label="协调方向">
                    <RadioGroup v-model="formData.coordinate_direction">
                        <Radio label="1">正向</Radio>
                        <Radio label="0" disabled>反向</Radio>
                        <Radio label="2" disabled>双向</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="绿波类型">
                    <RadioGroup v-model="formData.type">
                        <Radio label="0">每天</Radio>
                        <Radio label="1">时间段</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="时间范围" prop="datetime" v-if="timeVisible">
                    <DatePicker type="datetimerange" v-model="formData.datetime" format="yyyy/MM/dd HH:mm" placeholder="请选择日期和时间范围..." :style="{ width: '260px' }"></DatePicker>
                </FormItem>
                <FormItem label="时间范围" prop="time" v-else>
                    <TimePicker type="timerange" v-model="formData.time" format="HH:mm" placeholder="请选择时间范围..." :style="{ width: '260px' }"></TimePicker>
                </FormItem>
            </Form>
        </Modal>

    </Layout>
</template>

<script>
export default {
  data() {
    // 自定义验证时间
    const validateTime = (rule, value, callback) => {
      console.log(value);
      if (!Array.from(new Set(value))) {
        callback(new Error("请选择时间"));
      } else {
        callback();
      }
    };
    return {
      // page
      page: 1,
      rows: 20,
      total: 0,
      show: false,
      // tabs
      data: [],
      columns: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "子区名称",
          key: "name"
        },
        {
          title: "周期",
          key: "period",
          width: 100,
          sortable: true
        },
        {
          title: "协调方向",
          key: "coordinate_direction",
          width: 120,
          render: (h, params) => {
            return h(
              "div",
              { "1": "正向协调相位" }[params.row.coordinate_direction]
            );
          }
        },
        {
          title: "绿波类型",
          key: "type",
          width: 100,
          filters: [
            {
              label: "每天",
              value: "0"
            },
            {
              label: "时间段",
              value: "1"
            }
          ],
          filterMultiple: false,
          filterMethod(value, row) {
            if (value === "1") {
              return row.type === "1";
            } else if (value === "0") {
              return row.type === "0";
            }
          },
          render: (h, params) => {
            return h("div", { "0": "每天", "1": "时间段" }[params.row.type]);
          }
        },
        {
          title: "时间范围",
          key: "time_range",
          render: (h, params) => {
            return h(
              "div",
              params.row.mon_day_start + " - " + params.row.mon_day_end
            );
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 200,
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
                      this.viewDetails(params.row);
                    }
                  }
                },
                [h("a", "详情")]
              ),
              h("em", { class: ["divider"] }),
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
              ),
              h("em", { class: ["divider"] }),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.removeData(params.row);
                    }
                  }
                },
                [h("a", "删除")]
              )
            ]);
          }
        }
      ],
      loading: false,
      // modal
      visible: false,
      // form
      timeVisible: true,
      formData: {
        name: "",
        period: 0,
        coordinate_direction: "1",
        type: "0",
        datetime: "",
        time: ""
      },
      formRules: {
        name: [
          {
            required: true,
            message: "请填写绿波带名称"
          }
        ],
        time: [
          //   { validator: validateTime, trigger: "change" },
          {
            required: true,
            message: "请选择时间"
          }
        ],
        datetime: [
          //   { validator: validateTime, trigger: "change" },
          {
            required: true,
            message: "请选择时间"
          }
        ]
      },
      // 当前操作类型 ['modify','create']
      activeType: ""
    };
  },
  methods: {
    // 请求数据
    fetchData() {
      this.loading = true;
      this.$http("index/d_green_wave/dataList", {
        page: this.page,
        rows: this.rows
      }).then(res => {
        let data = res.data;
        if (res.status === "1") {
          this.data = data.list;
          this.total = ~~data.total;
        }
        this.loading = false;
      });
    },
    // 新增数据
    createData() {},
    // 切换分页
    pageChange(page) {
      this.page = page;
      this.fetchData();
    },
    // 切换页码
    pageSizeChange(rows) {
      if (this.rows !== rows) {
        this.rows = rows;
        this.fetchData();
      }
    },
    // 详情
    viewDetails(row) {
      this.$router.push({
        path: "/greenBelt/" + row.id
      });
    },
    // 新增
    createData(row) {
      this.visible = true;
      this.activeType = "modify";
      this.$refs["form"].resetFields();
      this.formData = {
        name: "",
        period: 0,
        coordinate_direction: "1",
        type: "0",
        datetime: "",
        time: ""
      };
    },
    // 编辑
    modifyData(row) {
      this.visible = true;
      this.activeType = "modify";
      let timeRange = [row.mon_day_start, row.mon_day_end];
      this.formData = {
        id: row.id,
        name: row.name,
        period: ~~row.period,
        coordinate_direction: row.coordinate_direction,
        type: row.type,
        datetime: row.type === "0" ? timeRange : "",
        time: row.type === "1" ? timeRange : ""
      };
    },
    // 删除
    removeData(row) {
      this.$Modal.confirm({
        content: `<h3>是否要确定删除 "${row.name}" ？删除后无法恢复！</h3>`,
        loading: true,
        onOk: () => {}
      });
    },
    // 提交表单
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
          setTimeout(() => {
            this.visible = false;
          }, 2000);
        } else {
          this.$Message.error("Fail!");
        }
        console.log(this.formData);
      });
    }
  },
  watch: {
    total() {
      this.show = this.total > 0 ? true : false;
    },
    // 绿波类型改变
    "formData.type"(newValue) {
      if (newValue === "1") {
        this.timeVisible = false;
      } else if (newValue === "0") {
        this.timeVisible = true;
      }
    }
  },
  created() {
    this.fetchData();
  }
};
</script>

<style lang="less">
</style>