/* 自适应方案 */
import http from './public'

export const dataList = params => {
    return http.$post("d_pattern_adaptive_sub/dataList", params);
};

export const dataUpdate = params => {
    return http.$post("d_pattern_adaptive_sub/dataUpdate", params);
};
export const dataDelete = params => {
    return http.$post("d_pattern_adaptive_sub/dataDelete", params);
};
export const dataAdd = params => {
    return http.$post("d_pattern_adaptive_sub/dataAdd", params);
};