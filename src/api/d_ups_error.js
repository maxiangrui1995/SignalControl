import http from './public'

export const dataListRedis = params => {
    return http.$post("d_ups_error/dataListRedis", params);
};