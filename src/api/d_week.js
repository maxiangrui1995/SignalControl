/* 日期类型 */
import http from './public'

export const dataList = params => {
    return http.$post("d_week/dataList", params);
};

export const dataUpdateList = params => {
    return http.$post("d_week/dataUpdateList", params);
};