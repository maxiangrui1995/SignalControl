import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import store from "@/store";
import routers from './public';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "hash",
    routes: routers
});

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    if (to.meta.title) { document.title = to.meta.title }
    if (to.name === 'login') {
        next();
    } else {
        // 验证是否登录
        if (!store.state.isLogin) {
            store.dispatch('checkoutIsLogin', next);
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