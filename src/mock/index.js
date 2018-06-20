import Mock from "mockjs";
const Random = Mock.Random;

// 路口
const _crossing = Mock.mock({
    'data|2': [{
        "id|+1": 100,
        "name|4": '@cword',
        "type": "area",
        "children|2": [{
            "id|+1": 1000,
            "name|4": '@cword',
            "type": "lane",
            "children|2": [{
                "id|+1": 10000,
                "name|4": '@cword',
                "type": "crossing",
                "lat|119.2-9": 1,
                "lng|36.2-9": 1,
            }]
        }]
    }]
})
console.log(_crossing);


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

//当post或get请求到/news路由时Mock会拦截请求并返回上面的数据
Mock.mock("/api/index/d_user/isLogin", /post|get/i, d_user.isLogin);
Mock.mock("/api/index/d_member/login", /post|get/i, d_member.login);