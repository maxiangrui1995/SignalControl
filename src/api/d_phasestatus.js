/* 相位 */
import http from './public'
// 列表
export const dataList = params => {
    return http.$post("d_phasestatus/dataList", params);
};