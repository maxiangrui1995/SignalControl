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
  created() {}
};
</script>

<style scoped lang="less">

</style>
