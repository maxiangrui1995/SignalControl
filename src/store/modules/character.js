/* 特征参数 */

export default {
    namespaced: true,
    state: {
        // 基本
        baseData: {}
    },
    mutations: {
        DATA(state, data) {
            state.baseData = data;
        }
    },
    actions: {
        DATA(context, data) {
            context.commit("DATA", data);
        }
    },
    getters: {}
};
