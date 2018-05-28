/* 时间调度 */
import http from './public'
export const dataList = params => {
    return http.$post("d_timemanage/dataList", params);
};

export const dataUpdate = params => {
    return http.$post("d_timemanage/dataUpdate", params);
};

export const dataAdd = params => {
    return http.$post("d_timemanage/dataAdd", params);
};

export const dataDelete = params => {
    return http.$post("d_timemanage/dataDelete", params);
};