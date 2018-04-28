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
          component: resolve => require(["@/page/characteristicParameter/children/Index.vue"], resolve)
        }
      ]
    }
  ]
})
