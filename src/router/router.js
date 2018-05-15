



export default [
    {
        path: '/',
        name: '首页',
        component: () => import('@/views/index/Index'),
        children: [
            {
                path: '/regionalManagement',
                name: '区域管理',
                component: resolve => require(['@/views/regionalManagement/Index'], resolve)
            },
            {
                path: '/regionalManagement/:id',
                name: '区域管理-道路',
                component: resolve => require(['@/views/regionalManagement/Lane'], resolve)
            },
            {
                path: '/regionalManagement/:id/:pid',
                name: '区域管理-路口',
                component: resolve => require(['@/views/regionalManagement/Crossing'], resolve)
            },
            {
                path: '/regionalManagement/:id/:pid/:crossing_id',
                name: '区域管理-详情',
                component: resolve => require(['@/views/regionalManagement/Details'], resolve)
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
                component: resolve => require(['@/views/greenBelt/Index'], resolve)
            },

            {
                path: '/privilege',
                name: '特勤联动',
                component: resolve => require(['@/views/privilege/Index'], resolve)
            },

            {
                path: '/comprehensiveQuery',
                name: '综合查询',
                component: () =>
                    import('@/views/comprehensiveQuery/Index')
            }
        ]
    },
    {
        path: '/login',
        name: '登录页',
        component: () => import('@/views/login/Index')
    }
]