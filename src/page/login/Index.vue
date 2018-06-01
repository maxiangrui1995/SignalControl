<template>
  <!-- <Button type="primary" @click="login">LOGIN</Button> -->
  <div class="login-wrapper" @keydown.enter="handleSubmit">
    <div class="login-con">
      <Card :bordered="false">
        <p slot="title">
          <Icon type="log-in"></Icon>
          欢迎登录
        </p>
        <div class="form-con">
          <Form ref="loginForm" :model="form" :rules="rules">
            <FormItem prop="username">
              <i-input v-model="form.username" placeholder="请输入用户名">
                <span slot="prepend">
                  <Icon :size="16" type="person"></Icon>
                </span>
              </i-input>
            </FormItem>
            <FormItem prop="password">
              <i-input type="password" v-model="form.password" placeholder="请输入密码">
                <span slot="prepend">
                  <Icon :size="14" type="locked"></Icon>
                </span>
              </i-input>
            </FormItem>
            <FormItem>
              <Checkbox v-model="form.is_remember">保持登录</Checkbox>
            </FormItem>
            <FormItem>
              <Button @click="handleSubmit" type="primary" long>登录</Button>
            </FormItem>
          </Form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/d_member";
export default {
  data() {
    return {
      form: {},
      rules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
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
    },
    handleSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          login({
            username: this.form.username,
            password: this.form.password,
            is_remember: this.form.is_remember ? "1" : "0"
          }).then(res => {
            if (res.status) {
              this.$Message.success(res.message);
              this.$store.commit("login", true);
              this.$store.commit("user", this.form.username);
              this.$router.push({
                name: "IndexPage"
              });
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

<style scoped>
.login-wrapper {
  background: url("~@/assets/login_background.svg") no-repeat #f0f2f5 center;
  width: 100%;
  height: 100%;
}
.login-con {
  position: absolute;
  right: 160px;
  top: 50%;
  transform: translateY(-60%);
  width: 300px;
}
</style>
