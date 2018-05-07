<template>
    <div class="dh-table-wrapper">
        <div class="dh-table-wrapper-header">
            <Breadcrumb>
                <BreadcrumbItem to="/regionalManagement">区域管理</BreadcrumbItem>
                <BreadcrumbItem :to="breadcrumUrl">栖霞区</BreadcrumbItem>
                <BreadcrumbItem :to="breadcrumUrl2">恒园路</BreadcrumbItem>
                <BreadcrumbItem>路口1</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="dh-table-wrapper-toolbar">
            <Button type="primary" icon="plus" @click="createData">信号机</Button>
            <Button type="primary" icon="plus" @click="createData">备用电源</Button>
            <Button type="primary" icon="plus" @click="createData">相机</Button>
            <Button type="primary" icon="plus" @click="createData">车检服务器</Button>
        </div>
        <Table :columns="columns1" :data="data1" :style="{'margin-bottom':'20px'}"></Table>
        <Table :columns="columns2" :data="data1" :style="{'margin-bottom':'20px'}"></Table>
        <Table :columns="columns3" :data="data1" :style="{'margin-bottom':'20px'}"></Table>
        <Table :columns="columns4" :data="data1"></Table>
    </div>
</template>

<script>
export default {
  name: "regionalManagement",
  data() {
    return {
      columns1: [
        {
          title: "信号机IP",
          key: "name"
        }
      ],
      data1: [],
      columns2: [
        {
          title: "备用电源IP",
          key: "name"
        }
      ],
      columns3: [
        {
          title: "相机IP",
          key: "name"
        }
      ],
      columns4: [
        {
          title: "车检服务器IP",
          key: "name"
        }
      ],
      breadcrumUrl: "/regionalManagement/" + this.$route.params.pid,
      breadcrumUrl2:
        "/regionalManagement/" +
        this.$route.params.pid +
        "/" +
        this.$route.params.crossing_id
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
    }
  },
  created() {}
};
</script>

<style>

</style>
