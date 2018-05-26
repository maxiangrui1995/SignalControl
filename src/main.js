import Vue from 'vue'
import iView from "iview"
import Scrollbar from "smooth-scrollbar"
import App from './App'
import router from './router'
import store from "./store"

import './styles/index.less'

Vue.config.productionTip = false
Vue.use(iView)
window.Scrollbar = Scrollbar

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
