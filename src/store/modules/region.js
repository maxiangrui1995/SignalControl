import { getRegion } from "@/api";


export default {
  state: {
    REGION: null,
    LOADING: false
  },
  mutations: {
    SET_REGION(state, data) {
      state.REGION = data;
    },
    SET_LOADING(state, data) {
      state.LOADING = data;
    }
  },
  actions: {
    SET_REGION(context) {
      context.commit("SET_LOADING", true);
      getRegion().then(res => {
        let region = res.data || [];
        context.commit("SET_REGION", region);
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
