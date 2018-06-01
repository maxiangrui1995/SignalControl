import http from './public'

export const login = params => {
    return http.$post("d_member/login", params);
};