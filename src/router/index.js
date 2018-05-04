import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '首页',
      component: () => import('@/views/index/Main'),
      meta: { required: true },
      children: [
        {
          path: '/regionalManagement',
          name: '区域管理',
          component: () => import('@/views/regionalManagement/Main')
        },
        {
          path: '/comprehensiveQuery',
          name: '综合查询',
          component: () => import('@/views/comprehensiveQuery/Main')
        },
        {
          path: '/characteristicParameter',
          name: '特征参数',
          component: () => import('@/views/characteristicParameter/Main')
        },
        {
          path: '/characteristicParameter/:id',
          name: '特征参数详情',
          component: () => import('@/views/characteristicParameter/children/Main'),
          redirect: {
            name: '特征参数详情-基本'
          },
          children: [
            {
              path: 'base',
              name: '特征参数详情-基本',
              component: () => import('@/views/characteristicParameter/children/Base')
            },
            {
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
            },
            {
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
        },
        {
          path: '/login',
          name: '登录',
          component: () => import('@/views/login/Main')
        }
      ]
    }
  ]
})
