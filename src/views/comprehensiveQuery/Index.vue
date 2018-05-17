<template>
  <div>
    <div class="dh-table-wrapper">
      <div class="dh-table-wrapper-toolbar">
        <y-filterWrapper label="区域" :data="regionData" />
      </div>
      <div class="dh-table-wrapper-toolbar">
        <y-filterWrapper label="道路" :data="regionData2" />
      </div>
      <div class="dh-table-wrapper-toolbar">
        <y-filterWrapper label="路口" :data="regionData3" />
      </div>
      <div>
        <Button type="text" @click="btnClick">按钮 100001,100002</Button>
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
      regionData2: [],
      regionData3: []
    };
  },
  computed: {
    regionData() {
      return this.$store.state.regionModule.data;
    }
  },
  methods: {
    formatterData() {
      let data = this.regionData;
      console.log(data);
      data.forEach(element => {
        if (element.children) {
          this.regionData2.push(...element.children);
          element.children.forEach(element => {
            if (element.children) {
              this.regionData3.push(...element.children);
            }
          });
        }
      });
    },
    btnClick() {
      this.$router.push({
        path: "/comprehensiveQuery/" + 100001
      });
    }
  },
  watch: {
    regionData() {
      /* */
      this.formatterData();
    }
  },
  created() {
    if (!this.$store.state.regionModule.data.length) {
      this.$store.dispatch("regionModule/SET_DATA");
    }
    this.formatterData();
  }
};
</script>

<style scoped lang="less">
</style>
