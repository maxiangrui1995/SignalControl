<template>
    <div style="display:inline-block">
        <Poptip placement="bottom-end" width="300">
            <Badge dot :style="{'margin':'0 14px'}">
                <Icon type="ios-bell" size="20"></Icon>
            </Badge>
            <div slot="content">
                <Tabs value="signal">
                    <TabPane label="信号机" name="signal">标签一的内容</TabPane>
                    <TabPane label="备用电源" name="ups">标签二的内容</TabPane>
                </Tabs>
            </div>
        </Poptip>
    </div>
</template>

<script>
export default {};
</script>

<style scoped lang='less'>
.ivu-icon {
  vertical-align: middle;
  cursor: pointer;
  &:hover {
    color: #ccc;
  }
}
</style>
