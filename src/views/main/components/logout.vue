<template>
    <div class="tools-btn-con">
        <Tooltip content="退出" placement="bottom">
            <Icon :size="20" type="log-out" @click="logout"></Icon>
        </Tooltip>
    </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$Modal.confirm({
        content: "<h3>确定退出？</h3>",
        onOk: () => {
          this.$http("index/d_user/logout").then(res => {
            if (res.status) {
              window.location.reload();
            } else {
              this.$Message.error(res.message);
            }
          });
        }
      });
    }
  }
};
</script>


