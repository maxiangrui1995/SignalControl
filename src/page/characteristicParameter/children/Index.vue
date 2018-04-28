<template>
    <div>
        <div class="breadWarpper">
            <p style="font-size:16px; padding:20px 20px 14px">特征参数 / 方案一</p>
            <Tabs value="1">
                <TabPane label="基本" name="1"></TabPane>
                <TabPane label="通行权" name="2"></TabPane>
                <TabPane label="灯组" name="3"></TabPane>
                <TabPane label="相位" name="4"></TabPane>
                <TabPane label="方案" name="5"></TabPane>
                <TabPane label="日期类型" name="6"></TabPane>
                <TabPane label="时间调度" name="7"></TabPane>
                <TabPane label="车检器" name="8"></TabPane>
                <TabPane label="自适应方案" name="9"></TabPane>
            </Tabs>
        </div>
        <div class="contentWrapper">
            contentWrapper
        </div>

    </div>
</template>

<script>
export default {};
</script>

<style scoped>
.breadWarpper {
  background: #fff;
}
.contentWrapper {
  margin: 20px;
  min-height: 400px;
  background: #fff;
  padding: 10px;
}
</style>
