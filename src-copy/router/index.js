import Vue from 'vue';
import iView from "iview";
import vueRouter from 'vue-router';
import store from "@/vuex";

import routes from './public';

Vue.use(vueRouter);

const router = new vueRouter({
    mode: "hash",
    routes: routes
});

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    if (to.meta.title) { document.title = to.meta.title }

    if (to.name === 'login') {
        next();
    } else {
        // 验证是否登录
        if (!store.state.isLogin) {
            store.dispatch('setLogin', next);
        } else {
            next()
        }
    }

});
router.afterEach((to) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

export default router;