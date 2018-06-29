export default {
    namespaced: true,
    state: {
        // 基本
        baseData: {}
    },
    mutations: {
        SetBase(state, data) {
            state.baseData = data;
        }
    },
    actions: {
        SetBase(context, data) {
            context.commit("SetBase", data);
        }
    },
    getters: {}
};