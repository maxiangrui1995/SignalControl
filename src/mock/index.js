import Mock from "mockjs";
const Random = Mock.Random;


const d_user = {
    // 是否登录
    isLogin() {
        let r = Random.boolean();
        if (localStorage.getItem('login')) {
            r = true;
        }
        return {
            data: {
                username: "admin",
                permission: "666"
            },
            status: r ? "1" : ""
        }
    }
}

const d_member = {
    // 登录
    login(opt) {
        let query = JSON.parse(opt.body);
        let r = false;
        if (query.username === 'admin' && query.password === '123456') {
            r = true;
            if (query.is_remember === "1") {
                localStorage.setItem('login', true)
            }
        }
        return {
            message: r ? "登录成功" : "用户名或密码错误",
            status: r ? "1" : ""
        }
    }
}

const d_area = {
    // 路口数据
    treeList() {
        return Mock.mock({
            'data|5': [{
                "id|+1": 100,
                "pid": 0,
                "name|4": '@cword',
                "type": "area",
                "children|2": [{
                    "id|+1": 1000,
                    "pid|+1": 100,
                    "name|4": '@cword',
                    "type": "lane",
                    "children|2": [{
                        "id|+1": 10000,
                        "pid+1": 1000,
                        "name|4": '@cword',
                        "type": "crossing",
                        "lng": '119.' + '@integer(52413330078125, 78899230957031)',
                        "lat": '36.' + '@integer( 17391121745295, 41575699390088)',
                        "direction": "1357",
                        "road_data": []
                    }]
                }]
            }],
            message: "操作成功",
            status: "1"
        })
    }
}

const flow_check = {
    f_flow: {
        // 车流量
        dataStatistic() {
            return Mock.mock({
                'data|16': [{
                    "id|+1": 1000,
                    "flow|16": ["@natural(0,200)"]
                }],
                message: "操作成功",
                status: "1"
            })
        }
    }
}

//当post或get请求到/news路由时Mock会拦截请求并返回上面的数据
// 判断登录
Mock.mock("/api/index/d_user/isLogin", /post|get/i, d_user.isLogin);
// 登录
Mock.mock("/api/index/d_member/login", /post|get/i, d_member.login);
// 路口
Mock.mock("/api/index/d_area/treeList", /post|get/i, d_area.treeList);
// 车流量
Mock.mock("/api/flow_check/f_flow/dataStatistic", /post|get/i, flow_check.f_flow.dataStatistic);