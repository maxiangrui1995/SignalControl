/* ----------------------特勤联动--------------------------- */

import http from './public'

export const planList = params => {
    return http.$post("d_secret_service_plan/planList", params);
}

export const getLine = params => {
    return http.$post("d_secret_service_plan/getLine", params);
}