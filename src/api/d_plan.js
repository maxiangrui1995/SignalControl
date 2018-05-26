import http from './public'
/* 特征参数 */
// 列表
export const dataList = params => {
    return http.$post("d_plan/dataList", params);
};
// 新增
export const dataInit = params => {
    return http.$post("d_plan/dataInit", params);
};
// 删除
export const dataDelete = params => {
    return http.$post("d_plan/dataDelete", params);
};

// 详情
export const dataView = params => {
    return http.$post("d_plan/dataView", params);
};
// 编辑
export const dataUpdate = params => {
    return http.$post("d_plan/dataUpdate", params);
};