<template>
    <div class="tools-btn-con">
        <Tooltip :content="value > 0 ? '有' + value + '条未读消息' : '无未读消息'" placement="bottom">
            <Badge :count="value" dot>
                <Icon type="ios-bell" :size="24"></Icon>
            </Badge>
        </Tooltip>
    </div>
</template>

<script>
export default {
  data() {
    return {
      value: 0
    };
  }
};
</script>
