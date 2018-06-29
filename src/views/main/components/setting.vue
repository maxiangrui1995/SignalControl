<template>
    <div class="tools-btn-con">
        <Tooltip content="设置" placement="bottom">
            <Icon type="gear-b" :size="24"></Icon>
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
