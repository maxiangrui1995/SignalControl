export default [{
    path: "/",
    name: "indexPage",
    meta: {
      title: "道路交通信号机控制平台"
    },
    component: () =>
      import ("@/page/indexPage/Index"),
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
        path: "planList",
        name: "planList",
        meta: {
          title: "特征参数"
        },
        component: resolve => require(["@/page/planList/Index"], resolve)
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
      import ("@/page/login/Index")
  },
  {
    path: "/404",
    name: "404",
    meta: {
      title: "404"
    },
    component: () =>
      import ("@/page/error/404"),
  },
  {
    path: "*",
    redirect: "/404"
  }
]
