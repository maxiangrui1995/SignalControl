<template>
    <div class="dh-filter-wrapper">
        <div class="dh-filter-wrapper-item">{{label}}：</div>
        <div class="dh-filter-wrapper-item dh-filter-wrapper-collapse">
            <p v-for="item in data" :key="item.id" class="item">{{item.name}}</p>
        </div>
        <div class="dh-filter-wrapper-item">更多
            <Icon type="arrow-down-b"></Icon>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    label: String,
    data: Array
  }
};
</script>

<style scoped lang="less">
.dh-filter-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  &-item {
    &:nth-child(1) {
      width: 54px;
    }
    &:nth-child(2) {
      flex: auto;
      display: flex;
      flex-wrap: wrap;
      > .item {
        padding: 0 10px;
        cursor: pointer;
      }
    }
    &:nth-child(3) {
      width: 84px;
      cursor: pointer;
      text-align: right;
    }
  }
  &-collapse {
    height: 20px;
    overflow: hidden;
  }
}
</style>