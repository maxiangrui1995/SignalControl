/* 相位 */
import http from './public'
// 列表
export const dataList = params => {
    return http.$post("d_phasestatus/dataList", params);
};
export const dataUpdate = params => {
    return http.$post("d_phasestatus/dataUpdate", params);
};

export const dataDelete = params => {
    return http.$post("d_phasestatus/dataDelete", params);
};

export const dataAdd = params => {
    return http.$post("d_phasestatus/dataAdd", params);
};