/* 绿波带 */
import http from './public'
// 列表
export const dataList = params => {
    return http.$post("d_green_wave/dataList", params);
};
// 新增
export const dataAdd = params => {
    return http.$post("d_green_wave/dataAdd", params);
};
// 删除
export const dataDelete = params => {
    return http.$post("d_green_wave/dataDelete", params);
};
// 编辑
export const dataUpdate = params => {
    return http.$post("d_green_wave/dataUpdate", params);
};