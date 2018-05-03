import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isCollapsed: localStorage.getItem("isCollapsed") === "true" ? true : false
  },
  mutations: {
    SET_COLLAPSED(state) {
      state.isCollapsed = state.isCollapsed === true ? false : true;
      localStorage.setItem("isCollapsed", state.isCollapsed);
    }
  },
  actions: {},
  modules: {}
});

export default store;
