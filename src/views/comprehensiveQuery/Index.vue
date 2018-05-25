<template>
  <div>
    <div class="dh-wrapper dh-wrapper-search">
      <div class="dh-wrapper-toolbar">
        <y-filterWrapper label="区域" :data="regionData1" @listenActive="listenActive" />
      </div>
      <div class="dh-wrapper-toolbar">
        <y-filterWrapper label="道路" :data="regionData2" @listenActive="listenActive" />
      </div>
      <div class="dh-wrapper-toolbar">
        <y-filterWrapper label="路口" :data="regionData3" />
      </div>
    </div>
    <div class="dh-wrapper">
      <div class="dh-wrapper-toolheader">
        <Icon type="social-buffer"></Icon>
        <span>共有
          <i>{{total}}</i>&nbsp;条数据</span>
        <a href="javascript:;" @click="reset">重置</a>
      </div>
      <div class="dh-wrapper-content">
        <Row :gutter="16">
          <i-col :xs="24" :sm="12" :md="6" :lg="4" v-for="item in regionData3" :key="item.id" :style="{'margin-bottom':'10px'}">
            <Card dis-hover :padding="0" :style="{'font-size':'12px'}">
              <img src="@/assets/imgs/a.jpg" style="width:100%;">
              <div style="padding:4px">
                <div class="title">{{item.name_.join(' / ')}}</div>
                <Button type="text" @click="btnClick(item)">
                  <a href="javascript:;">按钮</a>
                </Button>
              </div>
            </Card>
          </i-col>
        </Row>
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
      regionData1: [],
      regionData2: [],
      regionData3: [],
      total: 0
    };
  },
  methods: {
    formatterData() {
      this.regionData1 = [];
      this.regionData2 = [];
      this.regionData3 = [];
      for (let item of this.regionData) {
        this.$set(item, "active", false);
        item.type_ = "area";
        this.regionData1.push(item);
        if (item.children) {
          for (let item2 of item.children) {
            this.$set(item2, "active", false);
            item2.type_ = "lane";
            this.regionData2.push(item2);
            if (item2.children) {
              for (let item3 of item2.children) {
                this.$set(item3, "active", false);
                item3.name_ = [item.name, item2.name, item3.name];
                item3.type_ = "crossing";
                this.regionData3.push(item3);
                this.total++;
              }
            }
          }
        }
      }
    },
    btnClick(item) {
      this.$router.push({
        path: "/comprehensiveQuery/map",
        query: {
          crossing_id: item.id
        }
      });
    },
    listenActive(item) {
      console.log(item);
      if (item.type_ === "crossing") {
      }
    },
    /* 重置条件 */
    reset() {
      this.regionData1.forEach(item => {
        this.$set(item, "active", false);
      });
      this.regionData2.forEach(item => {
        this.$set(item, "active", false);
      });
      this.regionData3.forEach(item => {
        this.$set(item, "active", false);
      });
    }
  },
  computed: {
    regionData() {
      return this.$store.state.regionModule.data;
    }
  },
  watch: {
    regionData() {
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
@background-color-base : #115198;
@border-color-split : #2169b9;
@border-color-base : #2169b9;
@table-thead-bg : #195aa2;
@warning-color : #ff9900;
.dh-wrapper {
  margin: 20px;
  background: @background-color-base;
  &-search {
    border-top: 2px solid @border-color-split;
    padding: 10px 20px;
  }
  &-toolheader {
    background: @table-thead-bg;
    padding: 10px;
    > span {
      i {
        color: @warning-color;
      }
    }
    a {
      margin-left: 20px;
    }
  }
  &-content {
    padding: 10px;
  }
  &-toolbar {
    margin: 3px 0;
  }
}
.title {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
