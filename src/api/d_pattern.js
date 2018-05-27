
/* 方案 */
import http from './public'

// 列表
export const dataList = params => {
    return http.$post("d_pattern/dataList", params);
};
// 新增
export const dataAdd = params => {
    return http.$post("d_pattern/dataAdd", params);
};
// 删除
export const dataDelete = params => {
    return http.$post("d_pattern/dataDelete", params);
};
// 编辑
export const dataUpdate = params => {
    return http.$post("d_pattern/dataUpdate", params);
};