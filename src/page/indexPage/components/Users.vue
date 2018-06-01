<template>
    <div style="display:inline-block;">
        <Dropdown :style="{'padding':'0 20px'}" @on-click="dropdownClick">
            <Icon type="person" size="20" :style="{'vertical-align':'middle'}"></Icon>
            {{user}}
            <Icon type="arrow-down-b"></Icon>
            <DropdownMenu slot="list">
                <DropdownItem name="pwd">
                    <Icon type="ios-locked" :style="{'margin-right':'3px'}"></Icon>修改密码</DropdownItem>
                <DropdownItem name="logout" divided>
                    <Icon type="log-out" :style="{'margin-right':'3px'}"></Icon>退出登录</DropdownItem>
            </DropdownMenu>
        </Dropdown>

        <Modal v-model="modal" title="修改密码">
            <Form :model="formItem" ref="form" :rules="ruleCustom" :label-width="80">
                <FormItem label="旧密码" prop="password_origin">
                    <Input v-model="formItem.password_origin" />
                </FormItem>
                <FormItem label="新密码" prop="password">
                    <Input v-model="formItem.password" />
                </FormItem>
                <FormItem label="确认密码" prop="password_re">
                    <Input v-model="formItem.password_re" />
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" @click="modal = false">取消</Button>
                <Button type="primary" :loading="modal_loading" @click="formOk">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import { updatePassword, logout } from "@/api/d_user";
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.formItem.password_re !== "") {
          // 对第二个密码框单独验证
          this.$refs.form.validateField("password_re");
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新的密码"));
      } else if (value !== this.formItem.password) {
        callback(new Error("两次输入不一致"));
      } else {
        callback();
      }
    };
    return {
      modal: false,
      formItem: {},
      modal_loading: false,
      ruleCustom: {
        password_origin: [
          {
            required: true,
            message: "请输入原始密码",
            trigger: "blur"
          }
        ],
        password: [{ validator: validatePass, trigger: "blur" }],
        password_re: [{ validator: validatePassCheck, trigger: "blur" }]
      }
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    dropdownClick(name) {
      if (name === "pwd") {
        this.modifyPassword();
      }
      if (name === "logout") {
        this.logout();
      }
    },
    modifyPassword() {
      this.modal = true;
    },
    logout() {
      this.$Modal.confirm({
        content: "<p>确定退出？",
        loading: true,
        onOk: () => {
          logout().then(res => {
            if (res.status) {
              this.$Message.success(res.message);
              setTimeout(() => {
                this.$router.push({
                  path: "/login"
                });
              }, 1000);
            } else {
              this.$Message.error(res.message);
            }
            this.$Modal.remove();
          });
        }
      });
    },
    formOk() {
      this.modal_loading = true;
      this.$refs["form"].validate(valid => {
        if (valid) {
          updatePassword(this.formItem).then(res => {
            if (res.status) {
              this.modal = false;
              this.$Modal.success({
                content: "修改成功,即将跳转至登录界面！"
              });
              setTimeout(() => {
                this.$router.push({
                  path: "/login"
                });
                this.$Modal.remove();
              }, 2000);
            } else {
              this.$Message.error(res.message);
            }
            this.modal_loading = false;
          });
        } else {
          this.$Message.error("请确认输入是否正确！");
          this.modal_loading = false;
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.ivu-dropdown {
  cursor: pointer;
  &:hover {
    background: #679ab1;
  }
}
</style>
