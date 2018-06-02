
/* 路口 */
import http from './public'
// 新增
export const dataAdd = params => {
    return http.$post("d_crossing/dataAdd", params);
};
// 删除
export const dataDelete = params => {
    return http.$post("d_crossing/dataDelete", params);
};
// 编辑
export const dataUpdate = params => {
    return http.$post("d_crossing/dataUpdate", params);
};
// 详情
export const dataView = params => {
    return http.$post("d_crossing/dataView", params);
};