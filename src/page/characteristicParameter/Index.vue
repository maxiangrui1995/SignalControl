<template>
  <div>
    <div class="breadWarpper">
      <p style="font-size:16px;">特征参数</p>
    </div>
    <div class="contentWrapper">
      <div style="margin-bottom:10px;">
        <Button type="primary" icon="plus">新增</Button>
      </div>
      <div>
        <Table :columns="columns" :data="data" :loading="loading" border></Table>
      </div>
      <div style="text-align:right; margin-top:10px;">
        <Page :total="100" show-elevator></Page>
      </div>
    </div>
  </div>
</template>

<script>
import { Content, Table } from "iview";
export default {
  components: {
    Content,
    Table
  },
  data() {
    return {
      loading: false,
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
          key: "age"
        },
        {
          title: "相位差",
          key: "b"
        },
        {
          title: "最小绿范围",
          key: "b"
        },
        {
          title: "最大绿范围",
          key: "b"
        },
        {
          title: "绿延伸范围",
          key: "b"
        },
        {
          title: "脉冲倒计时",
          key: "b"
        },
        {
          title: "脉宽",
          key: "b"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
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
                      },
                      on: {
                        click: () => {
                          console.log(1);
                        }
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
      data: [
        {
          id: 1,
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          id: 2,
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01"
        },
        {
          id: 3,
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02"
        },
        {
          id: 4,
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04"
        }
      ]
    };
  },
  methods: {
    pathToDetails(params) {
      this.$router.push({
        name: "characteristicParameterDetails",
        params: { id: params.id }
      });
    }
  }
};
</script>

<style scoped>
.breadWarpper {
  padding: 20px;
  background: #fff;
}
.contentWrapper {
  margin: 20px;
  min-height: 400px;
  background: #fff;
  padding: 10px;
}
</style>
