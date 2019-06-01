import Vue from "vue";
import Vuex from "vuex";
import iView from "iview";
/* 后台请求 */
import ajax from '@/api';
/* 模块 */
import planModule from './modules/plan';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 是否登录
    isLogin: false,
    // 登录用户
    user: "",
    // 地图
    gmap: null,
    // 路口
    crossing: []
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
    setCrossing(state, data) {
      state.crossing = data;
    }
  },
  actions: {
    setLogin(context, router) {
      ajax('index/d_user/isLogin').then(res => {
        if (res.status) {
          context.commit("setLogin", true);
          context.commit("setUser", res.data.username);
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
    },
    setCrossing(context, data) {
      ajax("index/d_area/treeList").then(res => {
        if (res.status === "1") {
          context.commit("setCrossing", res.data);
        }
      });
    },
  },
  modules: {
    planModule
  }
});
