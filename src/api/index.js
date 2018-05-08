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
