/* 自适应方案 */
import http from './public'

export const dataView = params => {
    return http.$post("d_pattern_adaptive/dataView", params);
};
export const dataUpdate = params => {
    return http.$post("d_pattern_adaptive/dataUpdate", params);
};