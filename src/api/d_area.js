
/* 区域 */
import http from './public'
// 列表
export const dataList = params => {
    return http.$post("d_area/treeList", params);
};
// 新增
export const dataAdd = params => {
    return http.$post("d_area/dataAdd", params);
};
// 删除
export const dataDelete = params => {
    return http.$post("d_area/dataDelete", params);
};
// 编辑
export const dataUpdate = params => {
    return http.$post("d_area/dataUpdate", params);
};