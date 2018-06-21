import Vue from "vue";
import iView from "iview";
import App from "./App";
/* 路由 */
import router from './router';
/* 状态管理 */
import store from './vuex';
/* 请求 */
import axios from 'axios';
/* 自定义请求 */
import './mock';

import 'iview/dist/styles/iview.css';
import './styles/common.css';

Vue.config.productionTip = false;

Vue.prototype.$http = axios;

axios.defaults.baseURL = "/api";
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

Vue.use(iView);

new Vue({
  el: "#app",
  router,
  store,
  components: {
    App
  },
  template: "<App/>"
});
