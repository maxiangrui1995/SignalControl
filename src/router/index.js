import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 区域管理路由
const regionalManagement = [
	{
		path: '/regionalManagement',
		name: '区域管理',
		component: () => import('@/views/regionalManagement/Index')
	},
	{
		path: '/regionalManagement/:id',
		name: '区域管理-道路',
		component: () => import('@/views/regionalManagement/Lane')
	},
	{
		path: '/regionalManagement/:id/:pid',
		name: '区域管理-路口',
		component: () => import('@/views/regionalManagement/Crossing')
	},
	{
		path: '/regionalManagement/:id/:pid/:crossing_id',
		name: '区域管理-详情',
		component: () => import('@/views/regionalManagement/Details')
	},
];

// 特征参数
const characteristicParameter = [
	{
		path: '/characteristicParameter',
		name: '特征参数',
		component: () =>
			import('@/views/characteristicParameter/Index')
	},
	{
		path: '/characteristicParameter/:id',
		name: '特征参数详情',
		component: () => import('@/views/characteristicParameter/children/Index'),
		redirect: {
			name: '特征参数详情-基本'
		},
		children: [
			{
				path: 'base',
				name: '特征参数详情-基本',
				component: () => import('@/views/characteristicParameter/children/Base')
			}, {
				path: 'wayleave',
				name: '特征参数详情-通行权',
				component: () => import('@/views/characteristicParameter/children/Wayleave')
			}, {
				path: 'lightgroup',
				name: '特征参数详情-灯组',
				component: () => import('@/views/characteristicParameter/children/Lightgroup')
			}, {
				path: 'phase',
				name: '特征参数详情-相位',
				component: () => import('@/views/characteristicParameter/children/Phase')
			}, {
				path: 'plan',
				name: '特征参数详情-方案',
				component: () => import('@/views/characteristicParameter/children/Plan')
			}, {
				path: 'datetype',
				name: '特征参数详情-日期类型',
				component: () => import('@/views/characteristicParameter/children/Datetype')
			}, {
				path: 'scheduling',
				name: '特征参数详情-时间调度',
				component: () => import('@/views/characteristicParameter/children/Scheduling')
			}, {
				path: 'vehicleInspection',
				name: '特征参数详情-车检器',
				component: () => import('@/views/characteristicParameter/children/VehicleInspection')
			}, {
				path: 'adaptive',
				name: '特征参数详情-自适应方案',
				component: () => import('@/views/characteristicParameter/children/Adaptive')
			}
		]
	}
]

export default new Router({
	mode: 'history',
	routes: [{
		path: '/',
		name: '首页',
		component: () => import('@/views/index/Index'),
		children: [
			...regionalManagement,
			...characteristicParameter,
			{
				path: '/comprehensiveQuery',
				name: '综合查询',
				component: () =>
					import('@/views/comprehensiveQuery/Index')
			}
		]
	}]
})
