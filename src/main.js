import Vue from "vue";
import iView from "iview";
import App from "./App";
/* 路由 */
import router from './router';
/* 状态管理 */
import store from './vuex';
/* 请求 */
import axios from 'axios';
/* 图表 */
import echarts from 'echarts';
/* 自定义请求 */
import './mock';

import 'iview/dist/styles/iview.css';
import 'vue2-scrollbar/dist/style/vue2-scrollbar.css';
import './styles/common.less';

Vue.config.productionTip = false;

Vue.prototype.$http = axios;
Vue.prototype.$echarts = echarts;

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
