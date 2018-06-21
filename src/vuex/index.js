import Vue from "vue";
import Vuex from "vuex";
import iView from "iview";
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // 是否登录
        isLogin: false,
        // 登录用户
        user: "",
        // 地图
        gmap: null,
    },
    mutations: {
        setLogin(state, data) {
            state.isLogin = data;
        },
        setUser(state, data) {
            state.user = data;
        },
        setGMap(state, data) {
            state.gmap = data;
        },
    },
    actions: {
        setLogin(context, router) {
            axios.post('index/d_user/isLogin').then(res => {
                let data = res.data;
                if (data.status) {
                    context.commit("setLogin", true);
                    context.commit("setUser", data.data.username);
                    router();
                } else {
                    iView.Message.info('未检测到登录状态，请重新登录！');
                    router({
                        name: 'login'
                    });
                }
            })
        },
        setGMap(context, data) {
            context.commit("setGMap", data);
        }
    }
});
