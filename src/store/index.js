import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import regionModule from './modules/region';
import characterModule from './modules/character';

export default new Vuex.Store({
  state: {
    isLogin: false,
    gmap: null
  },
  mutations: {
    login(state, data) {
      state.isLogin = data;
    },
    gmap(state, data) {
      state.gmap = data;
    }
  },
  actions: {
    login(context, data) {
      context.commit("login", data);
    },
    gmap(context, data) {
      context.commit("gmap", data);
    }
  },
  modules: {
    regionModule, characterModule
  }
});
