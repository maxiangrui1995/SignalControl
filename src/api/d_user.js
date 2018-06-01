import http from './public'

// 判断是否登录
export const isLogin = params => {
    return http.$post("d_user/isLogin", params);
};

export const updatePassword = params => {
    return http.$post("d_user/updatePassword", params);
};

export const logout = params => {
    return http.$post("d_user/logout", params);
};