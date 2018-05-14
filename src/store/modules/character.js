/* 特征参数 */
import { getPlanView, getDateType, getPattern, getPhase } from "@/api";

export default {
    namespaced: true,
    state: {
        baseData: {},
        weekData: [],
        planData: {},
        phaseData: [],
        loading: false
    },
    mutations: {
        SET_DATA(state, data) {
            state.baseData = data;
        },
        SET_WEEK(state, data) {
            state.weekData = data;
        },
        SET_PLAN(state, data) {
            state.planData = data;
        },
        SET_PHASE(state, data) {
            state.phaseData = data;
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
        },
        SET_PHASE(context, id) {
            context.commit("SET_LOADING", true);
            getPhase({
                plan_id: id,
                page: 1,
                rows: 8
            }).then(res => {
                context.commit("SET_PHASE", res.data.list || {});
                context.commit("SET_LOADING", false);
            }).catch(res => {
                console.error(res);
            });
        },
        SET_PLAN(context, params) {
            context.commit("SET_LOADING", true);
            getPattern({
                plan_id: params.id,
                page: params.page,
                rows: params.rows
            }).then(res => {
                context.commit("SET_PLAN", res.data || {});
                context.commit("SET_LOADING", false);
            }).catch(res => {
                console.error(res);
            });
        }
    },
    getters: {}
};
