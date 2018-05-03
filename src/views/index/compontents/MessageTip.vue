<template>
    <div @click="showMessage" class="message-con">
        <Tooltip :content="value > 0 ? '有' + value + '条报警信息' : '无报警信息'" placement="bottom">
            <Badge :count="value" dot>
                <Icon type="ios-bell" :size="23"></Icon>
            </Badge>
        </Tooltip>
    </div>
</template>

<script>
export default {
  name: "messageTip",
  data() {
    return {
      value: 10
    };
  },
  methods: {
    showMessage() {}
  }
};
</script>

<style>

</style>
