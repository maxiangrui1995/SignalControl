/* 信号机控制 */
import http from './public'

export const getMachinePlan = params => {
    return http.$post("d_machine_control/getMachinePlan", params);
};
export const getVar = params => {
    return http.$post("d_machine_control/getVar", params);
};

export const sendToMachine = params => {
    return http.$post("d_machine_control/sendToMachine", params);
};

export const downLoadSetting = params => {
    return http.$post("d_machine_control/downLoadSetting", params);
};

export const uploadSetting = params => {
    return http.$post("d_machine_control/uploadSetting", params);
};