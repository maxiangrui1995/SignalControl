import http from './public'

/* ----------------------登录--------------------------- */
// 登录
export const login = params => {
  return http.$post("d_member/login", params);
};
// 判断是否登录
export const isLogin = params => {
  return http.$post("d_user/isLogin", params);
};


/* ----------------------区域--------------------------- */
// 获取所有区域/道路/路口
export const getRegion = params => {
  return http.$post("d_area/treeList", params);
};
// 修改区域
export const updateRegion = params => {
  return http.$post("d_area/dataUpdate", params);
};

// 获取路口下的设备信息
export const getCrossingDev = params => {
  return http.$post("d_crossing/dataView", params);
};
// 获取路口执行方案信息
export const getCrossingPlan = params => {
  return http.$post("d_machine_control/getMachinePlan", params);
};
// 获取websocket连接地址
export const getWebsocketUrl = params => {
  return http.$post("d_machine_control/getVar", params);
};


/* ----------------------信号机--------------------------- */
// 获取信号机信息
export const getSignal = params => {
  return http.$post("d_machine/dataList", params);
};

/* ----------------------特征参数--------------------------- */
// 特征参数
export const getPlanList = params => {
  return http.$post("d_plan/dataList", params);
};
// 特征参数-详情
export const getPlanView = params => {
  return http.$post("d_plan/dataView", params);
};
// 特征参数-通行权
export const getWayleave = params => {
  return http.$post("d_passage/dataList", params);
};
// 特征参数-方案
export const getPattern = params => {
  return http.$post("d_pattern/dataList", params);
};
// 特征参数-日期类型
export const getDateType = params => {
  return http.$post("d_week/dataList", params);
};
// 特征参数-时间调度
export const geSchedule = params => {
  return http.$post("d_timemanage/dataList", params);
};
// 特征参数-相位
export const getPhase = params => {
  return http.$post("d_phasestatus/dataList", params);
};
// 特征参数-车检器
export const getVehicleInspection = params => {
  return http.$post("d_car_sensor/dataList", params);
};

/* ----------------------绿波带--------------------------- */
// 获取绿波带信息
export const getGreenBelt = params => {
  return http.$post("d_green_wave/dataList", params);
};