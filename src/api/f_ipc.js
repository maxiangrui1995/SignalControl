
import http from './public'

export const dataUpdate = params => {
    return http.$post("../flow_check/f_ipc/dataUpdate", params);
};
export const dataAdd = params => {
    return http.$post("../flow_check/f_ipc/dataAdd", params);
};
export const dataDelete = params => {
    return http.$post("../flow_check/f_ipc/dataDelete", params);
};