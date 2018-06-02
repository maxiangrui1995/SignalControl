<template>
    <!-- <div id="myChart" :style="{width: '300px', height: '300px'}"></div> -->
    <div style="margin:24px 24px 0 24px">
        <Row :gutter="20">
            <i-col span="24">
                <Card dis-hover class="">
                    <h3 slot="title">车流量统计</h3>
                    <div slot="extra">
                        <a href="javascript:;" class="item" :class="{active:search_type==='0'}" @click="changeType('0')" style="margin-right:8px;">按时</a>
                        <a href="javascript:;" class="item" :class="{active:search_type==='1'}" @click="changeType('1')" style="margin-right:18px;">按天</a>
                        <DatePicker type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="请选择时间范围" style="width: 300px"></DatePicker>
                    </div>
                    <Tabs value="name1">
                        <TabPane label="车流量统计" name="name1">标签一的内容</TabPane>
                        <TabPane label="车流量统计" name="name2">标签二的内容</TabPane>
                        <TabPane label="车流量统计" name="name3">标签三的内容</TabPane>
                    </Tabs>
                </Card>
            </i-col>
        </Row>
    </div>
</template>

<script>
export default {
  name: "workplace",
  data() {
    return {
      // 车流量搜索类型
      search_type: "1"
    };
  },
  mounted() {},
  methods: {
    changeType(value) {
      this.search_type = value;
    }
  }
};
</script>

<style lang="less" scoped>
.item {
  color: #495060;
  &:hover {
    color: #2d8cf0;
  }
}
.item.active {
  color: #2d8cf0;
}
.ivu-card-extra {
  top: 7px;
}
</style>
