import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import regionModule from './modules/region';
import characterModule from './modules/character';

export default new Vuex.Store({
  modules: {
    regionModule, characterModule
  }
});
