<template>
  <div class="search-wrapper">
    <div class="search-wrapper-item">{{label}}：</div>
    <div class="search-wrapper-item" :class="{'collapse': collapse}">
      <p v-for="item in data" :key="item.id" @click="click(item)" :class="{'active': item.active}" class="item">{{item.name}}</p>
    </div>
    <div class="search-wrapper-item">
      <a href="javascript:;" @click="more">更多
        <Icon type="arrow-down-b"></Icon>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collapse: true //折叠
    };
  },
  props: {
    label: String,
    data: Array
  },
  methods: {
    click(item) {
      item.active = !item.active;
      this.$emit("listenActive", item);
    },
    more() {
      this.collapse = !this.collapse;
    }
  },
  created() {}
};
</script>

<style scoped lang="less">
.search-wrapper {
  position: relative;
  width: 100%;
  &-item {
    display: inline-block;
    vertical-align: top;
    line-height: 28px;
    &:nth-child(1) {
      position: absolute;
      top: 0;
      left: 0;
      width: 54px;
    }
    &:nth-child(2) {
      padding: 0 90px 0 54px;
      > .item {
        padding: 0 6px;
        margin: 0 6px 2px 0px;
        float: left;
        cursor: pointer;
        &:hover {
          cursor: pointer;
          color: #c0c4cc;
        }
      }
    }
    &:nth-child(3) {
      position: absolute;
      top: 0;
      right: 0;
      width: 90px;
      text-align: right;
    }
  }
  .collapse {
    height: 28px;
    overflow: hidden;
  }
  .active {
    color: #e6a23c;
    background-color: rgba(230, 162, 60, 0.1);
    border-color: rgba(230, 162, 60, 0.2);
    border-radius: 4px;
    height: 28px;
    line-height: 28px;
    &:hover {
      color: #cf9236;
      background-color: rgba(230, 162, 60, 0.3);
    }
  }
}
</style>