import Mock from "mockjs";
const Random = Mock.Random;

const d_user = {
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