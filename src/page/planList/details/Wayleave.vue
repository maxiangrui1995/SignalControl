<template>
    <div>

        <Button type="primary" :loading="loading" @click="handleSubmit">确定</Button>
    </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      data1: {},
      data2: {},
      data3: {},
      data4: {},
      lighttime: 0,
      loading: false
    };
  },
  methods: {
    loadData() {},
    handleSubmit() {}
  },
  created() {}
};
</script>

<style>
</style>
