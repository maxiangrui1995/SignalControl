<template>
    <div class="users-con">
        <Dropdown @on-click="handleClickUserDropdown">
            <Icon type="ios-person" :size="23"></Icon>
            <DropdownMenu slot="list">
                <DropdownItem name="ownSpace">个人中心</DropdownItem>
                <DropdownItem name="loginout" divided>退出登录</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
</template>

<script>
export default {
  methods: {
    handleClickUserDropdown(name) {
      console.log(name);
    }
  }
};
</script>

<style>

</style>
