
import http from './public'

export const dataUpdate = params => {
    return http.$post("../flow_check/f_camera/dataUpdate", params);
};
export const dataAdd = params => {
    return http.$post("../flow_check/f_camera/dataAdd", params);
};
export const dataDelete = params => {
    return http.$post("../flow_check/f_camera/dataDelete", params);
};