
/* 测试页 */
const Test = {
    path: '/test',
    name: 'test',
    component: () => import('@/views/test')
}
/* 登录页 */
const Login = {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Index')
}
/* 综合查询 */
const Query = [
    {
        path: '/comprehensiveQuery',
        name: '综合查询',
        component: resolve => require(['@/views/comprehensiveQuery/Index'], resolve)
    }
]
/* 特征参数 */
const Parameter = [
    {
        path: '/characteristicParameter',
        name: '特征参数',
        component: resolve => require(['@/views/characteristicParameter/Index'], resolve)
    }
]
/* 首页 */
const IndexPage = {
    path: '/',
    name: 'IndexPage',
    component: () => import('@/views/IndexPage/Index'),
    children: [...Query, ...Parameter]
}

export default [
    IndexPage, Test, Login
    /* {
        path: '/',
        name: '首页',
        component: () => import('@/views/index/Index'),
        redirect: {
            path: "/comprehensiveQuery"
        },
        children: [
            {
                path: '/regionalManagement',
                name: '区域管理',
                component: resolve => require(['@/views/regionalManagement/Index'], resolve),
                redirect: {
                    path: ""
                },
                children: [
                    {
                        path: '',
                        name: '区域管理-区域',
                        component: resolve => require(['@/views/regionalManagement/Area'], resolve)
                    },
                    {
                        path: ':id',
                        name: '区域管理-道路',
                        component: resolve => require(['@/views/regionalManagement/Lane'], resolve)
                    },
                    {
                        path: ':id/:pid',
                        name: '区域管理-路口',
                        component: resolve => require(['@/views/regionalManagement/Crossing'], resolve)
                    },
                    {
                        path: ':id/:pid/:crossing_id',
                        name: '区域管理-设备',
                        component: resolve => require(['@/views/regionalManagement/Details'], resolve)
                    }
                ]
            },

            {
                path: '/characteristicParameter',
                name: '特征参数',
                component: resolve => require(['@/views/characteristicParameter/Index'], resolve)
            },
            {
                path: '/characteristicParameter/:id',
                name: '特征参数详情',
                component: resolve => require(['@/views/characteristicParameter/children/Index'], resolve),
                redirect: {
                    name: '特征参数详情-基本'
                },
                children: [
                    {
                        path: 'base',
                        name: '特征参数详情-基本',
                        component: resolve => require(['@/views/characteristicParameter/children/Base'], resolve)
                    }, {
                        path: 'wayleave',
                        name: '特征参数详情-通行权',
                        component: resolve => require(['@/views/characteristicParameter/children/Wayleave'], resolve)
                    }, {
                        path: 'lightgroup',
                        name: '特征参数详情-灯组',
                        component: resolve => require(['@/views/characteristicParameter/children/Lightgroup'], resolve)
                    }, {
                        path: 'phase',
                        name: '特征参数详情-相位',
                        component: resolve => require(['@/views/characteristicParameter/children/Phase'], resolve)
                    }, {
                        path: 'plan',
                        name: '特征参数详情-方案',
                        component: resolve => require(['@/views/characteristicParameter/children/Plan'], resolve)
                    }, {
                        path: 'datetype',
                        name: '特征参数详情-日期类型',
                        component: resolve => require(['@/views/characteristicParameter/children/Datetype'], resolve)
                    }, {
                        path: 'scheduling',
                        name: '特征参数详情-时间调度',
                        component: resolve => require(['@/views/characteristicParameter/children/Scheduling'], resolve)
                    }, {
                        path: 'vehicleInspection',
                        name: '特征参数详情-车检器',
                        component: resolve => require(['@/views/characteristicParameter/children/VehicleInspection'], resolve)
                    }, {
                        path: 'adaptive',
                        name: '特征参数详情-自适应方案',
                        component: resolve => require(['@/views/characteristicParameter/children/Adaptive'], resolve)
                    }
                ]
            },

            {
                path: '/greenBelt',
                name: '绿波带',
                component: resolve => require(['@/views/greenBelt/Index'], resolve),
                redirect: {
                    name: '绿波带列表'
                },
                children: [
                    {
                        path: 'index',
                        name: '绿波带列表',
                        component: resolve => require(['@/views/greenBelt/List'], resolve),
                    },
                    {
                        path: 'details',
                        name: '绿波带详情',
                        component: resolve => require(['@/views/greenBelt/Details'], resolve),
                    }
                ]
            },

            {
                path: '/privilege',
                name: '特勤联动',
                component: resolve => require(['@/views/privilege/Index'], resolve),
                redirect: {
                    path: ''
                },
                children: [
                    {
                        path: '',
                        name: '特勤联动列表',
                        component: resolve => require(['@/views/privilege/List'], resolve)
                    }
                ]
            },

            {
                path: '/comprehensiveQuery',
                name: '综合查询',
                component: resolve => require(['@/views/comprehensiveQuery/Index'], resolve)
            },
            {
                path: '/comprehensiveQuery/map',
                name: '综合查询-详情',
                component: resolve => require(['@/views/comprehensiveQuery/Details'], resolve)
            }
        ]
    },
    {
        path: '/login',
        name: '登录页',
        component: () => import('@/views/login/Index')
    }, */
]