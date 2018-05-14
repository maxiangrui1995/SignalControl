/* 特征参数 */
import { getPlanView } from "@/api";
import { getDateType } from "@/api";

export default {
    namespaced: true,
    state: {
        baseData: {},
        weekData: [],
        loading: false
    },
    mutations: {
        SET_DATA(state, data) {
            state.baseData = data;
        },
        SET_WEEK(state, data) {
            state.weekData = data;
        },
        SET_LOADING(state, data) {
            state.loading = data;
        }
    },
    actions: {
        SET_DATA(context, id) {
            getPlanView({
                id: id
            }).then(res => {
                context.commit("SET_DATA", res.data || {});
            }).catch(res => {
                console.error(res);
            });
        },
        SET_WEEK(context, id) {
            context.commit("SET_LOADING", true);
            getDateType({
                plan_id: id,
                page: 1,
                rows: 20
            }).then(res => {
                context.commit("SET_WEEK", res.data.list || {});
                context.commit("SET_LOADING", false);
            }).catch(res => {
                console.error(res);
            });
        }
    },
    getters: {}
};
