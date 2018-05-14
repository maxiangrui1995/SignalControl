import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview'
import routers from './router'
import store from "@/store";
import { isLogin } from '@/api'


Vue.use(Router)

const router = new Router({
	mode: "history",
	routes: routers
});

router.beforeEach((to, from, next) => {
	iView.LoadingBar.start();

	if (to.name === '登录页') {
		next();
	} else {
		if (!store.state.isLogin) {
			isLogin().then(res => {
				if (!res.status) {
					iView.Message.info('未检测到登录状态，请重新登录！');
					next({
						name: '登录页'
					});
				} else {
					store.dispatch("login", true);
					next();
				}
			})
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

