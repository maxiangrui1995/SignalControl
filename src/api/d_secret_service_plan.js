/* ----------------------特勤联动--------------------------- */

import http from './public'

export const planList = params => {
    return http.$post("d_secret_service_plan/planList", params);
}

export const getLine = params => {
    return http.$post("d_secret_service_plan/getLine", params);
}

export const activation = params => {
    return http.$post("d_secret_service_plan/activation", params);
}

export const planDel = params => {
    return http.$post("d_secret_service_plan/planDel", params);
}

export const planEdit = params => {
    return http.$post("d_secret_service_plan/planEdit", params);
}

export const planAdd = params => {
    return http.$post("d_secret_service_plan/planAdd", params);
}