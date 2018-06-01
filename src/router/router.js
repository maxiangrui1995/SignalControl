/* 综合查询 */
const Query = [
  {
    path: "/comprehensiveQuery",
    name: "comprehensiveQuery",
    component: resolve => require(["@/page/comprehensiveQuery/Index"], resolve)
  },
  {
    path: "/comprehensiveQuery/:id",
    name: "comprehensiveQuery-details",
    component: resolve => require(["@/page/comprehensiveQuery/Details"], resolve)
  },
  {
    path: "/comprehensiveQuery/:id/monitoring",
    name: "comprehensiveQuery-monitoring",
    component: resolve => require(["@/page/comprehensiveQuery/components/RealtimeMonitoring"], resolve)
  }
];
/* 登录页 */
const Login = {
  path: "/login",
  name: "login",
  component: () => import("@/page/login/Index")
};
/* 特征参数 */
const PlanList = [
  {
    path: "/planList",
    name: "planList",
    component: resolve => require(["@/page/planList/Index"], resolve)
  },
  {
    path: "/planList/:id",
    name: "planLists",
    component: resolve => require(["@/page/planList/details/Index"], resolve),
    redirect: {
      name: "planLists-base"
    },
    children: [
      {
        path: "base",
        name: "planLists-base",
        component: resolve => require(["@/page/planList/details/Base"], resolve)
      },
      {
        path: "plan",
        name: "planLists-plan",
        component: resolve => require(["@/page/planList/details/Plan"], resolve)
      },
      {
        path: "datetype",
        name: "planLists-datetype",
        component: resolve =>
          require(["@/page/planList/details/Datetype"], resolve)
      },
      {
        path: "scheduling",
        name: "planLists-scheduling",
        component: resolve =>
          require(["@/page/planList/details/Scheduling"], resolve)
      },
      {
        path: "vehicleInspection",
        name: "planLists-vehicleInspection",
        component: resolve =>
          require(["@/page/planList/details/VehicleInspection"], resolve)
      },
      {
        path: "adaptive",
        name: "planLists-adaptive",
        component: resolve =>
          require(["@/page/planList/details/Adaptive"], resolve)
      },
      {
        path: "wayleave",
        name: "planLists-wayleave",
        component: resolve =>
          require(["@/page/planList/details/Wayleave"], resolve)
      },
      {
        path: "lightgroup",
        name: "planLists-lightgroup",
        component: resolve =>
          require(["@/page/planList/details/Lightgroup"], resolve)
      },
      {
        path: "phase",
        name: "planLists-phase",
        component: resolve =>
          require(["@/page/planList/details/Phase"], resolve)
      }
    ]
  }
];
/* 区域管理 */
const Region = [
  {
    path: "/region",
    name: "region",
    component: resolve => require(["@/page/region/Index"], resolve)
  },
  {
    path: "/region/:id",
    name: "region-dev",
    component: resolve => require(["@/page/region/Dev"], resolve)
  }
];
/* 绿波带 */
const GreenBelt = [
  {
    path: "/greenBelt",
    name: "greenBelt",
    component: resolve => require(["@/page/greenBelt/Index"], resolve),
    redirect: {
      name: "greenBelt-main"
    },
    children: [
      {
        path: "",
        name: "greenBelt-main",
        component: resolve => require(["@/page/greenBelt/Main"], resolve)
      },
      {
        path: "details",
        name: "greenBelt-details",
        component: resolve => require(["@/page/greenBelt/Details"], resolve)
      }
    ]
  }
];
/* 特勤 */
const Privilege = [
  {
    path: "/privilege",
    name: "privilege",
    component: resolve => require(["@/page/privilege/Index"], resolve),
    redirect: {
      name: "privilege-main"
    },
    children: [
      {
        path: "",
        name: "privilege-main",
        component: resolve => require(["@/page/privilege/Main"], resolve)
      },
      {
        path: "view",
        name: "privilege-view",
        component: resolve => require(["@/page/privilege/View"], resolve)
      }
    ]
  }
];
/* 首页 */
const IndexPage = {
  path: "/",
  name: "IndexPage",
  component: () => import("@/page/indexPage/Index"),
  redirect: {
    name: "comprehensiveQuery"
  },
  children: [...PlanList, ...Region, ...GreenBelt, ...Privilege, ...Query]
};

export default [IndexPage, Login];
