<template>
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
              <Button :loading="submitLoading" @click="handleSubmit" type="primary" long>登录</Button>
            </FormItem>
          </Form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
        is_remember: true
      },
      rules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      },
      submitLoading: false
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.submitLoading = true;
          this.$http
            .post("d_member/login", {
              username: this.form.username,
              password: this.form.password,
              is_remember: this.form.is_remember ? "1" : "0"
            })
            .then(res => {
              let data = res.data;

              if (data.status) {
                this.$Message.success(data.message);
                this.$store.commit("setLogin", true);

                setTimeout(() => {
                  this.$router.push({
                    name: "indexPage"
                  });
                }, 800);
              } else {
                this.$Message.error(data.message);
              }

              setTimeout(() => {
                this.submitLoading = false;
              }, 800);
            });
        }
      });
    }
  }
};
</script>

<style scoped>
@keyframes fadeInRight {
  0% {
    opacity: 0;
    transform: translate3d(50px, -60%, 0);
  }
  50% {
    opacity: 0.5;
    transform: translate3d(-50px, -60%, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, -60%, 0);
  }
}
.login-wrapper {
  width: 100%;
  height: 100%;
}
.login-con {
  position: absolute;
  right: 160px;
  top: 50%;
  width: 300px;
  animation-duration: 0.5s;
  animation-fill-mode: both;
  animation-name: fadeInRight;
}
</style>
