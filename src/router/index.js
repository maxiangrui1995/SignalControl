import Vue from 'vue';
import iView from "iview";
import vueRouter from 'vue-router';
import store from "@/vuex";

Vue.use(vueRouter);

const router = new vueRouter({
    mode: "hash",
    routes: [
        {
            path: "/",
            name: "indexPage",
            meta: { title: "道路交通信号机控制平台" },
            component: () => import("@/page/indexPage/Index"),
            redirect: {
                name: "workplace"
            },
            children: [
                {
                    path: "workplace",
                    name: "workplace",
                    meta: { title: "工作台" },
                    component: resolve => require(["@/page/workplace/Index"], resolve)
                },
                {
                    path: "comprehensiveQuery",
                    name: "comprehensiveQuery",
                    meta: { title: "综合查询" },
                    component: resolve => require(["@/page/comprehensiveQuery/Index"], resolve)
                },
                {
                    path: "region",
                    name: "region",
                    meta: { title: "区域管理" },
                    component: resolve => require(["@/page/region/Index"], resolve)
                },
                {
                    path: "planList",
                    name: "planList",
                    meta: { title: "特征参数" },
                    component: resolve => require(["@/page/planList/Index"], resolve)
                },
                {
                    path: "greenBelt",
                    name: "greenBelt",
                    meta: { title: "绿波带" },
                    component: resolve => require(["@/page/greenBelt/Index"], resolve)
                },
                {
                    path: "privilege",
                    name: "privilege",
                    meta: { title: "特勤联动" },
                    component: resolve => require(["@/page/privilege/Index"], resolve)
                }
            ]
        },
        {
            path: "/login",
            name: "login",
            meta: { title: "登录页" },
            component: () => import("@/page/login/Index")
        }
    ]
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