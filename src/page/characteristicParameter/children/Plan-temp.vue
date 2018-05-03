<template>
    <div class="container">
        <Row :gutter="16">
            <i-col span="4" v-for="item in ~~row.step" :key="item" :style="{'margin-bottom':'10px'}">
                <Card :style="{height:'150px'}">
                    <p slot="title">步号{{item}}</p>
                    <a href="javascript:;" slot="extra">编辑&nbsp;</a>
                    <a href="javascript:;" slot="extra">&nbsp;删除</a>
                    <p>阶段：{{~~row['phase'+item]+1}}</p>
                    <p>时长：{{~~row['time'+item]}}s</p>
                    <p>间隔：{{row['time_interval']}}s</p>
                </Card>
            </i-col>
            <i-col span="4" :style="{'margin-bottom':'10px'}">
                <Card :style="{height:'150px'}">
                    <Button type="text" icon="plus" :style="{height:'120px', width:'100%'}">新增</Button>
                </Card>
            </i-col>
        </Row>
    </div>
</template>

<script>
export default {
  props: {
    row: Object
  },
  data() {
    return {};
  },
  computed: {
    period() {
      return "1";
    }
  }
};
</script>

<style scoped>
.container {
  margin: -10px -40px 0;
}
</style>
