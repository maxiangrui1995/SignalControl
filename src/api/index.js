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



/* -------------------------------------------------- 获取信号机信息 -------------------------------------------------------------------- */
export const $d_machine_control = {
  // 获取路口执行方案信息
  getMachinePlan(params) {
    return http.$post("d_machine_control/getMachinePlan", params);
  },
  // 获取websocket连接地址
  getVar(params) {
    return http.$post("d_machine_control/getVar", params);
  },
  // 开特勤、关特勤、全红、等等
  sendToMachine(params) {
    return http.$post("d_machine_control/sendToMachine", params);
  }
}


// 获取路口常量
export const getCrossingDefault = params => {
  return http.$post("d_crossing/getVar", params);
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
// 特征参数新增
export const createPlanList = params => {
  return http.$post("d_plan/dataInit", params);
};
// 特征参数删除
export const removePlanList = params => {
  return http.$post("d_plan/dataDelete", params);
};

// 特征参数-详情
export const getPlanView = params => {
  return http.$post("d_plan/dataView", params);
};
// 特征参数-详情编辑
export const updatePlanView = params => {
  return http.$post("d_plan/dataUpdate", params);
};

// 特征参数-通行权
export const getWayleave = params => {
  return http.$post("d_passage/dataList", params);
};
// 特征参数-通行权编辑
export const updateWayleave = params => {
  return http.$post("d_passage/dataUpdateList", params);
};

// 特征参数-方案
export const getPattern = params => {
  return http.$post("d_pattern/dataList", params);
};
// 特征参数-方案新增
export const createPattern = params => {
  return http.$post("d_pattern/dataAdd", params);
};
// 特征参数-方案修改
export const updatePattern = params => {
  return http.$post("d_pattern/dataUpdate", params);
};
// 特征参数-方案删除
export const removePattern = params => {
  return http.$post("d_pattern/dataDelete", params);
};

// 特征参数-日期类型
export const getDateType = params => {
  return http.$post("d_week/dataList", params);
};
// 特征参数-日期类型修改
export const updateDateType = params => {
  return http.$post("d_week/dataUpdateList", params);
};

// 特征参数-时间调度
export const getSchedule = params => {
  return http.$post("d_timemanage/dataList", params);
};
// 特征参数-时间调度修改
export const updateSchedule = params => {
  return http.$post("d_timemanage/dataUpdate", params);
};
// 特征参数-时间调度新增
export const createSchedule = params => {
  return http.$post("d_timemanage/dataAdd", params);
};
// 特征参数-时间调度删除
export const removeSchedule = params => {
  return http.$post("d_timemanage/dataDelete", params);
};

// 特征参数-灯组
export const $d_phaseinfo = {
  dataList(params) {
    return http.$post("d_phaseinfo/dataList", params);
  }
}


// 特征参数-相位
export const getPhase = params => {
  return http.$post("d_phasestatus/dataList", params);
};
// 特征参数-车检器
export const getVehicleInspection = params => {
  return http.$post("d_car_sensor/dataList", params);
};







