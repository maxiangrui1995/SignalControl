<template>
  <div class="dh-table-wrapper">
    <div class="dh-table-wrapper-header">
      <Breadcrumb>
        <BreadcrumbItem>特征参数</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="dh-table-wrapper-toolbar">
      <Button type="primary" icon="plus" @click="createData">新增</Button>
    </div>
    <Table :columns="columns1" :data="data1"></Table>
    <div class="dh-table-wrapper-page">
      <Page :total="40" show-elevator show-sizer></Page>
    </div>
  </div>
</template>

<script>
export default {
  name: "characteristicParameter",
  data() {
    return {
      columns1: [
        {
          title: "Name",
          key: "name"
        },
        {
          title: "Age",
          key: "age"
        },
        {
          title: "Address",
          key: "address"
        },
        {
          title: "Action",
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
                      this.pathToDetails(params.row.id);
                    }
                  }
                },
                "详情"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.removeData(params.row.id);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data1: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03",
          id: 1
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01",
          id: 1
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02",
          id: 1
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04",
          id: 1
        }
      ]
    };
  },
  methods: {
    createData() {
      this.$Modal.confirm({
        render: h => {
          return h("Input", {
            props: {
              value: this.value,
              autofocus: true,
              placeholder: "请输入新增特征参数名称..."
            },
            on: {
              input: val => {
                this.value = val;
              }
            }
          });
        }
      });
    },
    pathToDetails(id) {
      this.$router.push({
        path: "/characteristicParameter/" + id
      });
    },
    removeData(id) {
      this.$Modal.confirm({
        content: "<p>确定删除？删除后无法恢复！</p>",
        loading: true,
        onOk: () => {
          setTimeout(() => {
            this.$Modal.remove();
            this.$Message.info("Asynchronously close the dialog box");
          }, 2000);
        }
      });
    }
  },
  created() {}
};
</script>

<style>

</style>
