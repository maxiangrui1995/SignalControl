import Vue from "vue";
import iView from "iview";
import App from "./App";
/* 图表 */
import echarts from 'echarts';
/* 路由 */
import router from './router';
/* 状态管理 */
import store from './vuex';

import 'iview/dist/styles/iview.css';
import 'vue2-scrollbar/dist/style/vue2-scrollbar.css';
import './styles/common.less';


Vue.config.productionTip = false;

Vue.prototype.$echarts = echarts;
Vue.prototype.resetScrollbarPosition = ()=>{
  document.getElementById(
    "home-scrollbar"
  ).childNodes[0].style.marginTop = 0;
}


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
