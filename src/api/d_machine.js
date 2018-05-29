/* 获取所有信号机 */
import http from './public'
// 列表
export const dataList = params => {
    return http.$post("d_machine/dataList", params);
};