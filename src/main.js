import Vue from 'vue'
import iView from "iview"
import App from './App'
import router from './router'
import store from "./store"

// import Scrollbar from "smooth-scrollbar"
import VueVideoPlayer from 'vue-video-player'
import echarts from 'echarts'

import './styles/index.less'

Vue.config.productionTip = false

Vue.use(iView)
Vue.use(VueVideoPlayer)

// window.Scrollbar = Scrollbar
Vue.prototype.$echarts = echarts

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
