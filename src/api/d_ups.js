import http from './public'

export const dataUpdate = params => {
    return http.$post("d_ups/dataUpdate", params);
};
export const dataAdd = params => {
    return http.$post("d_ups/dataAdd", params);
};
export const dataDelete = params => {
    return http.$post("d_ups/dataDelete", params);
};
