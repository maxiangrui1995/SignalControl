import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'IndexPage',
      component: resolve => require(["@/page/index/Index.vue"], resolve),
      children: [
        {
          path: '/comprehensiveQuery',
          name: 'comprehensiveQuery',
          component: resolve => require(["@/page/comprehensiveQuery/Index.vue"], resolve)
        },
        {
          path: '/regionalManagement',
          name: 'regionalManagement',
          component: resolve => require(["@/page/regionalManagement/Index.vue"], resolve)
        },
        {
          path: '/characteristicParameter',
          name: 'characteristicParameter',
          component: resolve => require(["@/page/characteristicParameter/Index.vue"], resolve)
        },
        {
          path: '/characteristicParameter/:id',
          name: 'characteristicParameterDetails',
          component: resolve => require(["@/page/characteristicParameter/children/Index.vue"], resolve),
          redirect: '/characteristicParameter/:id/base',
          children: [
            {
              path: '/characteristicParameter/:id/base',
              name: '特征参数-基本',
              component: resolve => require(["@/page/characteristicParameter/children/Base.vue"], resolve)
            }, {
              path: '/characteristicParameter/:id/wayleave',
              name: '特征参数-通行权',
              component: resolve => require(["@/page/characteristicParameter/children/Wayleave.vue"], resolve)
            }, {
              path: '/characteristicParameter/:id/lightgroup',
              name: '特征参数-灯组',
              component: resolve => require(["@/page/characteristicParameter/children/Lightgroup.vue"], resolve)
            }, {
              path: '/characteristicParameter/:id/phase',
              name: '特征参数-相位',
              component: resolve => require(["@/page/characteristicParameter/children/Phase.vue"], resolve)
            }, {
              path: '/characteristicParameter/:id/plan',
              name: '特征参数-方案',
              component: resolve => require(["@/page/characteristicParameter/children/Plan.vue"], resolve)
            }, {
              path: '/characteristicParameter/:id/datetype',
              name: '特征参数-日期类型',
              component: resolve => require(["@/page/characteristicParameter/children/Datetype.vue"], resolve)
            },
            {
              path: '/characteristicParameter/:id/scheduling',
              name: '特征参数-时间调度',
              component: resolve => require(["@/page/characteristicParameter/children/Scheduling.vue"], resolve)
            },
            {
              path: '/characteristicParameter/:id/vehicleInspection',
              name: '特征参数-车检器',
              component: resolve => require(["@/page/characteristicParameter/children/VehicleInspection.vue"], resolve)
            },
            {
              path: '/characteristicParameter/:id/adaptive',
              name: '特征参数-自适应方案',
              component: resolve => require(["@/page/characteristicParameter/children/Adaptive.vue"], resolve)
            }
          ]
        },

      ]
    }
  ]
})
