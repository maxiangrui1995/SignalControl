<template>
  <div class="container">
    <div class="breadWarpper">
      <Breadcrumb :style="{'font-size':'16px', padding:'20px'}">
        <BreadcrumbItem>特征参数</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="contentWrapper">
      <Button type="primary" icon="plus" @click="createData" :style="{'margin-bottom':'10px'}">新增</Button>
      <Table :columns="columns" :data="data" :loading="loading" border></Table>
      <div style="text-align:right; margin-top:10px;">
        <Page :total="total" :current="page" :page-size="rows" show-elevator @on-change="pageChange"></Page>
      </div>
    </div>
  </div>
</template>

<script>
import { Content, Table } from "iview";
import { getCharacteristic } from "@/api";
export default {
  components: {
    Content,
    Table
  },
  data() {
    return {
      loading: true,
      columns: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "方案名称",
          key: "name"
        },
        {
          title: "类型",
          key: "type",
          width: 120,
          render: (h, params) => {
            return h(
              "div",
              `${params.row.phase_count}阶段${params.row.light_count}相位`
            );
          }
        },
        {
          title: "相位差",
          key: "phase_difference",
          width: 80,
          align: "center"
        },
        {
          title: "最小绿范围",
          key: "min_green_range",
          width: 120,
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              `${params.row.min_green_down} ~ ${params.row.min_green_up}`
            );
          }
        },
        {
          title: "最大绿范围",
          key: "max_green_range",
          width: 120,
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              `${params.row.max_green_down} ~ ${params.row.max_green_up}`
            );
          }
        },
        {
          title: "绿延伸范围",
          key: "extends",
          width: 120,
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              `${params.row.extends_down} ~ ${params.row.extends_up}`
            );
          }
        },
        {
          title: "脉冲倒计时",
          key: "mc_countdown",
          width: 120,
          align: "center"
        },
        {
          title: "脉宽",
          key: "mc_width",
          width: 80,
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          width: 140,
          align: "center",
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
                      this.pathToDetails(params.row);
                    }
                  }
                },
                "详情"
              ),
              h(
                "Poptip",
                {
                  props: {
                    confirm: true,
                    title: "您确定要删除这条数据吗？",
                    placement: "top-end"
                  },
                  style: {
                    textAlign: "left",
                    marginLeft: "10px"
                  },
                  on: {
                    "on-ok": () => {
                      this.$Message.info("点击了ok");
                    }
                  }
                },
                [
                  h(
                    "Button",
                    {
                      props: {
                        type: "text",
                        size: "small"
                      }
                    },
                    "删除"
                  )
                ]
              )
            ]);
          }
        }
      ],
      data: [],
      page: 1,
      rows: 10,
      total: 0,
      newPlanName: ""
    };
  },
  methods: {
    pathToDetails(params) {
      this.$router.push({
        name: "characteristicParameterDetails",
        params: { id: params.id }
      });
    },
    pageChange(page) {
      this.page = page;
      this.getDatagrid();
    },
    getDatagrid() {
      this.loading = true;

      getCharacteristic({
        page: this.page,
        rows: this.rows
      }).then(res => {
        this.loading = false;
        let data = res.data;
        this.data = data.list;
        this.total = ~~data.total;
      });
    },
    createData() {
      this.newPlanName = "";
      this.$Modal.confirm({
        render: h => {
          return h("Input", {
            props: {
              value: this.newPlanName,
              autofocus: true,
              placeholder: "请输入方案名称..."
            },
            on: {
              input: val => {
                this.newPlanName = val;
              }
            }
          });
        },
        onOk: () => {
          console.log(this.newPlanName);
          this.$Message.info("Clicked ok");
        }
      });
    }
  },
  created() {
    this.getDatagrid();
  }
};
</script>

<style scoped>
.breadWarpper {
  background: #fff;
}
.contentWrapper {
  margin: 20px;
  min-height: 100%;
  background: #fff;
  padding: 10px;
}
</style>
