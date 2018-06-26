export default [{
  path: "/",
  name: "indexPage",
  meta: {
    title: "道路交通信号机控制平台"
  },
  component: resolve => require(["@/page/indexPage/Index"], resolve),
  redirect: {
    name: "workplace"
  },
  children: [{
    path: "workplace",
    name: "workplace",
    meta: {
      title: "工作台"
    },
    component: resolve => require(["@/page/workplace/Index"], resolve)
  },
  {
    path: "comprehensiveQuery",
    name: "comprehensiveQuery",
    meta: {
      title: "综合查询"
    },
    component: resolve => require(["@/page/comprehensiveQuery/Index"], resolve)
  },
  {
    path: "region",
    name: "region",
    meta: {
      title: "区域管理"
    },
    component: resolve => require(["@/page/region/Index"], resolve)
  },
  {
    path: "region/:id1",
    name: "region-1",
    meta: {
      title: "区域管理"
    },
    component: resolve => require(["@/page/region/Child1"], resolve)
  },
  {
    path: "region/:id1/:id2",
    name: "region-2",
    meta: {
      title: "区域管理"
    },
    component: resolve => require(["@/page/region/Child2"], resolve)
  },
  {
    path: "region/:id1/:id2/:id3/map",
    name: "region-map",
    meta: {
      title: "区域管理"
    },
    component: resolve => require(["@/page/region/Map"], resolve)
  },
  {
    path: "region/:id1/:id2/:id3/devs",
    name: "region-devs",
    meta: {
      title: "区域管理-绑定设备"
    },
    component: resolve => require(["@/page/region/Devs"], resolve)
  },
  {
    path: "planList",
    name: "planList",
    meta: {
      title: "特征参数"
    },
    component: resolve => require(["@/page/planList/Index"], resolve)
  },
  {
    path: "planList/:id",
    name: "planList-details",
    meta: {
      title: "特征参数详情"
    },
    redirect: {
      name: "planList-details-base"
    },
    component: resolve => require(["@/page/planList/Child"], resolve),
    children: [
      {
        path: "base",
        name: "planList-details-base",
        meta: {
          title: "特征参数详情-基本"
        },
        component: resolve => require(["@/page/planList/Base"], resolve)
      },
      {
        path: "wayleave",
        name: "planList-details-wayleave",
        meta: {
          title: "特征参数详情-通行权"
        },
        component: resolve => require(["@/page/planList/Wayleave"], resolve)
      },
      {
        path: "lightgroup",
        name: "planList-details-lightgroup",
        meta: {
          title: "特征参数详情-灯组"
        },
        component: resolve => require(["@/page/planList/Lightgroup"], resolve)
      },
      {
        path: "phase",
        name: "planList-details-phase",
        meta: {
          title: "特征参数详情-相位"
        },
        component: resolve => require(["@/page/planList/Phase"], resolve)
      },
      {
        path: "plan",
        name: "planList-details-plan",
        meta: {
          title: "特征参数详情-方案"
        },
        component: resolve => require(["@/page/planList/Plan"], resolve)
      },
      {
        path: "datetype",
        name: "planList-details-datetype",
        meta: {
          title: "特征参数详情-日期类型"
        },
        component: resolve => require(["@/page/planList/Datetype"], resolve)
      },
      {
        path: "scheduling",
        name: "planList-details-scheduling",
        meta: {
          title: "特征参数详情-时间调度"
        },
        component: resolve => require(["@/page/planList/Scheduling"], resolve)
      },
      {
        path: "vehicleInspection",
        name: "planList-details-vehicleInspection",
        meta: {
          title: "特征参数详情-车检器"
        },
        component: resolve => require(["@/page/planList/VehicleInspection"], resolve)
      },
      {
        path: "adaptive",
        name: "planList-details-adaptive",
        meta: {
          title: "特征参数详情-自适应方案"
        },
        component: resolve => require(["@/page/planList/Adaptive"], resolve)
      }
    ]
  },
  {
    path: "greenBelt",
    name: "greenBelt",
    meta: {
      title: "绿波带"
    },
    component: resolve => require(["@/page/greenBelt/Index"], resolve)
  },
  {
    path: "greenBelt/:id",
    name: "greenBelt-child",
    meta: {
      title: "绿波带详情"
    },
    component: resolve => require(["@/page/greenBelt/Child"], resolve)
  },
  {
    path: "privilege",
    name: "privilege",
    meta: {
      title: "特勤联动"
    },
    component: resolve => require(["@/page/privilege/Index"], resolve)
  }
  ]
},
{
  path: "/login",
  name: "login",
  meta: {
    title: "登录页"
  },
  component: () =>
    import("@/page/login/Index")
},
{
  path: "/404",
  name: "404",
  meta: {
    title: "404"
  },
  component: () =>
    import("@/page/error/404"),
},
{
  path: "*",
  redirect: "/404"
}
]
