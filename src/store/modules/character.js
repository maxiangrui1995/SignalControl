/* 特征参数 */
import { getPlanView, getDateType, getPattern, getPhase, $d_phaseinfo } from "@/api";

export default {
    namespaced: true,
    state: {
        // 基本
        baseData: {},
        // 日期类型
        weekData: [],
        // 方案
        planData: {},
        // 阶段
        phaseData: [],
        loading: false,
        // 灯组信息
        phaseinfo: []
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
        },
        SET_PHASEINFO(state, data) {
            state.phaseinfo = data;
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
        },
        SET_PHASEINFO(context, id) {
            context.commit("SET_LOADING", true);
            $d_phaseinfo
                .dataList({
                    plan_id: id,
                    page: 1,
                    rows: 16
                }).then(res => {
                    context.commit("SET_PHASEINFO", res.data.list || []);
                    context.commit("SET_LOADING", false);
                }).catch(res => {
                    console.error(res);
                });
        },
    },
    getters: {}
};
