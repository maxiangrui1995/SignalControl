import Vue from "vue";
import Vuex from "vuex";
import iView from "iview";
import axios from 'axios';

axios.defaults.baseURL = "/api/index";
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isLogin: false
    },
    mutations: {
        setLogin(state, data) {
            state.isLogin = data;
        }
    },
    actions: {
        setLogin(context, router) {
            axios.post('d_user/isLogin').then(res => {
                let data = res.data;

                if (data.status) {
                    context.commit("setLogin", true);
                    router();
                } else {
                    iView.Message.info('未检测到登录状态，请重新登录！');
                    router({
                        name: 'login'
                    });
                }
            })
        }
    }
});
