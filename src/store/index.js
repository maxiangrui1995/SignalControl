import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

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
    GMAP(context, data) {
      context.commit("gmap", data);
    }
  },
  modules: {
    characterModule
  }
});
