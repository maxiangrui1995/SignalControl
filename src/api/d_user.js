import http from './public'

// 判断是否登录
export const isLogin = params => {
    return http.$post("d_user/isLogin", params);
};
