<template>
    <div>
        <Row :style="{'margin-bottom':'20px'}">
            <i-col span="12">
                间隔总时间:
                <InputNumber :max="255" :min="0"></InputNumber>
            </i-col>
        </Row>
        <Row :gutter="16">
            <i-col :xs="24" :sm="12" :md="12" :lg="6" :style="{'margin-bottom':'20px'}">
                <Card>
                    <p slot="title">行车 - 获得通行权</p>
                    <y-wayleave/>
                </Card>
            </i-col>
            <i-col :xs="24" :sm="12" :md="12" :lg="6" :style="{'margin-bottom':'20px'}">
                <Card>
                    <p slot="title">行车 - 失去通行权</p>
                    <y-wayleave/>
                </Card>
            </i-col>
            <i-col :xs="24" :sm="12" :md="12" :lg="6" :style="{'margin-bottom':'20px'}">
                <Card>
                    <p slot="title">行人 - 获得通行权</p>
                    <y-wayleave/>
                </Card>
            </i-col>
            <i-col :xs="24" :sm="12" :md="12" :lg="6" :style="{'margin-bottom':'20px'}">
                <Card>
                    <p slot="title">行人 - 失去通行权</p>
                    <y-wayleave/>
                </Card>
            </i-col>
        </Row>
    </div>
</template>

<script>
import YWayleave from "./components/Wayleave";
export default {
  components: {
    YWayleave
  },
  data() {
    return {
      
    };
  }
};
</script>

<style>

</style>
