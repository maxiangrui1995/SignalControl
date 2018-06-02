/* 灯组 */
import http from './public'
// 列表
export const dataList = params => {
    return http.$post("d_phaseinfo/dataList", params);
};
export const updateAll = params => {
    return http.$post("d_phaseinfo/updateAll", params);
};