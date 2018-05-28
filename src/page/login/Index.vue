<template>
    <Button type="primary" @click="login">LOGIN</Button>
</template>

<script>
import { login } from "@/api";
export default {
  data() {
    return {};
  },
  methods: {
    login() {
      login({
        username: "admin",
        password: "123456",
        is_remember: "1"
      }).then(res => {
        if (res.status === "1") {
          this.$Message.info({
            content: "登录成功！",
            duration: 1
          });
          this.$store.dispatch("login", true);
          setTimeout(() => {
            this.$router.push({
              path: "/"
            });
          }, 1000);
        }
      });
    }
  }
};
</script>

<style>
</style>
