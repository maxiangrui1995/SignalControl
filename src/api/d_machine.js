/* 获取所有信号机 */
import http from './public'
// 列表
export const dataList = params => {
    return http.$post("d_machine/dataList", params);
};
export const dataUpdate = params => {
    return http.$post("d_machine/dataUpdate", params);
};
export const dataAdd = params => {
    return http.$post("d_machine/dataAdd", params);
};

export const dataDelete = params => {
    return http.$post("d_machine/dataDelete", params);
};