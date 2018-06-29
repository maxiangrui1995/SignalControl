
const workplace = [{
    path: "workplace",
    name: "workplace",
    meta: {
        title: "工作台"
    },
    component: resolve => require(["@/views/workplace/workplace"], resolve)
}];

const greenBelt = [{
    path: "greenBelt",
    name: "greenBelt",
    meta: {
        title: "绿波带"
    },
    component: resolve => require(["@/views/green-belt/green-belt"], resolve)
}];

export default [
    {
        path: "/",
        name: "root",
        meta: {
            title: "道路交通信号机控制平台"
        },
        component: resolve => require(["@/views/main/Main"], resolve),
        redirect: {
            name: "greenBelt"
        },
        children: [...workplace, ...greenBelt]
    },
    {
        path: "/login",
        name: "login",
        meta: {
            title: "登录页"
        },
        component: resolve => require(["@/views/login/login"], resolve)
    }
]
