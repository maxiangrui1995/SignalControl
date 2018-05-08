import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import RegionModule from './modules/region';

export default new Vuex.Store({
  modules: {
    RegionModule
  }
});
