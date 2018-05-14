import { getRegion } from "@/api";


export default {
  namespaced: true,
  state: {
    data: [],
    loading: false
  },
  mutations: {
    SET_DATA(state, data) {
      state.data = data;
    },
    SET_LOADING(state, data) {
      state.loading = data;
    }
  },
  actions: {
    SET_DATA(context) {
      context.commit("SET_LOADING", true);
      getRegion().then(res => {
        let region = res.data || [];
        context.commit("SET_DATA", region);
        context.commit("SET_LOADING", false);
      }).catch(res => {
        console.error(res);

      });
    }
  },
  getters: {
    GET_REGION(state, getters, rootState) {
    }
  }
};
