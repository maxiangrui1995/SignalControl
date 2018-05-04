<template>
  <div>
    <div class="dh-datagrid-toolbar">
      <div class="handler-tools">
        <Button type="primary" icon="plus">新增</Button>
      </div>
      <div class="info-tools">
        <div class="toolsMSG">全部路口</div>
        <div class="toolsHSB">已加载加载,共
          <i>8</i> 个
        </div>
      </div>
    </div>
    <div class="dh-datagrid-wrapper">
      <Table :columns="columns" :data="data" :show-header='false'></Table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          title: "Name",
          key: "name"
        }
      ],
      data: [
        {
          name: "鼓楼区",
          id: 1
        },
        {
          name: "栖霞区",
          id: 2
        },
        {
          name: "新街口",
          id: 3
        },
        {
          name: "秦淮区",
          id: 4
        }
      ]
    };
  }
};
</script>

