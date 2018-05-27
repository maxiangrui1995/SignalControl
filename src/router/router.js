// /* 登录页 */
// const Login = {
//   path: "/login",
//   name: "login",
//   component: () => import("@/page/login/Index")
// };
// /* 综合查询 */
// const Query = [
//   {
//     path: "/comprehensiveQuery",
//     name: "综合查询",
//     component: resolve => require(["@/page/comprehensiveQuery/Index"], resolve)
//   }
// ];
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
  }
];
/* 绿波带 */
const GreenBelt = [
  {
    path: "/greenBelt",
    name: "greenBelt",
    component: resolve => require(["@/page/greenBelt/Index"], resolve)
  }
];
/* 特勤 */
const Privilege = [
  {
    path: "/privilege",
    name: "privilege",
    component: resolve => require(["@/page/privilege/Index"], resolve)
  }
];
/* 首页 */
const IndexPage = {
  path: "/",
  name: "IndexPage",
  component: () => import("@/page/indexPage/Index"),
  children: [...PlanList, ...Region, ...GreenBelt, ...Privilege]
};

export default [IndexPage];
