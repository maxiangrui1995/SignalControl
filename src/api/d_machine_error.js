import http from './public'

export const dataListRedis = params => {
    return http.$post("d_machine_error/dataListRedis", params);
};