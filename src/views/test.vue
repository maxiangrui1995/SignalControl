<template>
    <div>
        <ul id="my-scrollbar">
            <li v-for="i in 100" :key='i'>{{i}}</li>
        </ul>
    </div>
</template>

<script>
import Scrollbar from "smooth-scrollbar";

export default {
  data() {
    return {};
  },
  mounted() {
    Scrollbar.init(document.querySelector("#my-scrollbar"), {});
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#my-scrollbar {
  width: 500px;
  height: 500px;
  overflow: auto;
}
</style>