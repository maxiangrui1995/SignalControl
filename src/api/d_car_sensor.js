/* 车检器 */

import http from './public'

export const dataList = params => {
    return http.$post("d_car_sensor/dataList", params);
};
export const dataUpdate = params => {
    return http.$post("d_car_sensor/dataUpdate", params);
};