<template>
    <div>
        <div class="dh-table-wrapper">
            <div class="dh-table-wrapper-toolbar">
                <y-filterWrapper label="区域" :data="region1" />
            </div>
            <div class="dh-table-wrapper-toolbar">
                <y-filterWrapper label="道路" :data="region1" />
            </div>
            <div class="dh-table-wrapper-toolbar">
                <y-filterWrapper label="路口" :data="region1" />
            </div>
        </div>
    </div>
</template>

<script>
import YFilterWrapper from "./compontents/FilterWrapper";
export default {
  components: {
    YFilterWrapper
  },
  data() {
    return {
      region1: [
        { name: "栖霞区1", id: "1" },
        { name: "栖霞区2", id: "2" },
        { name: "栖霞区3", id: "3" },
        { name: "栖霞区4", id: "4" },
        { name: "栖霞区5", id: "5" },
        { name: "栖霞区6", id: "6" }
      ]
    };
  },
  methods: {},
  created() {
    let a = {
      "360": 5500.01,
      suning: 13000 - 10302.16,
      shengbei: 3491.18,
      fenqile: 14800 - 16.59,
      zhao: 9524.52,
      hua: 2846,
      jie: 10000 - 959
    };
    let all = 0;
    for (let item in a) {
      all += a[item];
    }
    console.log(all);
  }
};
</script>

<style scoped lang="less">

</style>
