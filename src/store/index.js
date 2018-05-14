import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import regionModule from './modules/region';
import characterModule from './modules/character';

export default new Vuex.Store({
  state: {
    isLogin: false
  },
  mutations: {
    login(state, data) {
      state.isLogin = data;
    }
  },
  actions: {
    login(context, data) {
      context.commit("login", data);
    }
  },
  modules: {
    regionModule, characterModule
  }
});
