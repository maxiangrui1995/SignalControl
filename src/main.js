// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import iView from "iview";
import App from "./App";
import router from "./router";
import store from "./store";
import "iview/dist/styles/iview.css";

Vue.config.productionTip = false;

Vue.use(iView);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
});

router.afterEach(to => {
  iView.LoadingBar.finish();
});
