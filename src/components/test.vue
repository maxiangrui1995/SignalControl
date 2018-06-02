<template>
    <div>
        <vue-scrollbar classes="my-scrollbar" ref="Scrollbar">
            <div class="scroll-me">
                <div class="kolom"></div>
                <div class="kolom"></div>
                <div class="kolom"></div>
                <div class="kolom"></div>
                <div class="kolom"></div>
                <div class="kolom"></div>
                <div class="kolom"></div>
                <div class="kolom"></div>
                <div class="kolom"></div>
                <div class="kolom"></div>
                <div class="kolom"></div>
                <div class="kolom"></div>
                <div class="kolom"></div>
                <div class="kolom"></div>
                <div class="kolom"></div>
                <div class="kolom"></div>
                <div class="clearfix"></div>
            </div>
        </vue-scrollbar>
    </div>
</template>

<script>
import VueScrollbar from "vue2-scrollbar";
require("vue2-scrollbar/dist/style/vue2-scrollbar.css");

// It's required to set min height of the scrollbar wrapper
// require("./your/custom/style/app.css");

export default {
  components: { VueScrollbar }
};
</script>

<style>
body {
  background: #f9f9f9;
  height: 1000px;
}

p {
  margin-top: 0;
}

.my-scrollbar {
  width: 35%;
  min-width: 300px;
  max-height: 450px;
}

.scroll-me {
  background: #eee;
  min-width: 750px;
}

.kolom {
  background: #2196f3;
  width: 150px;
  height: 150px;
  float: left;
  display: inline-block;
  margin: 15px;
}

.clearfix {
  clear: both;
}
</style>
