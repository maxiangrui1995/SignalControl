
/* 绿波带详情 */
import http from './public'
// 列表
export const dataList = params => {
    return http.$post("d_green_wave_sub/dataList", params);
};
// 新增
export const dataAdd = params => {
    return http.$post("d_green_wave_sub/dataAdd", params);
};
// 删除
export const dataDelete = params => {
    return http.$post("d_green_wave_sub/dataDelete", params);
};
// 编辑
export const dataUpdate = params => {
    return http.$post("d_green_wave_sub/dataUpdate", params);
};
// 批量编辑
export const dataUpdateAll = params => {
    return http.$post("d_green_wave_sub/dataUpdateAll", params);
};
// 下载
export const downLoadSetting = params => {
    return http.$post("d_green_wave_sub/downLoadSetting", params);
};