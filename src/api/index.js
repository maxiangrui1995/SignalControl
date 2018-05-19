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
export const updateArea = params => {
  return http.$post("d_area/dataUpdate", params);
};
// 新增区域
export const createArea = params => {
  return http.$post("d_area/dataAdd", params);
};
// 删除区域
export const removeArea = params => {
  return http.$post("d_area/dataDelete", params);
};

// 新增路口
export const createCrossing = params => {
  return http.$post("d_crossing/dataAdd", params);
};
// 修改路口
export const updateCrossing = params => {
  return http.$post("d_crossing/dataUpdate", params);
};
// 删除路口
export const removeCrossing = params => {
  return http.$post("d_crossing/dataDelete", params);
};

// 获取路口常量
export const getCrossingDefault = params => {
  return http.$post("d_crossing/getVar", params);
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
export const getLightgroup = params => {
  return http.$post("d_phaseinfo/dataList", params);
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
// 绿波带新增
export const createGreenBelt = params => {
  return http.$post("d_green_wave/dataAdd", params);
};
// 绿波带编辑
export const modifyGreenBelt = params => {
  return http.$post("d_green_wave/dataUpdate", params);
};
// 绿波带删除
export const removeGreenBelt = params => {
  return http.$post("d_green_wave/dataDelete", params);
};

/* 绿波带详情 */
export const $d_green_wave_sub = {
  // 列表
  dataList(params) {
    return http.$post("d_green_wave_sub/dataList", params);
  },
  // 新增
  dataAdd(params) {
    return http.$post("d_green_wave_sub/dataAdd", params);
  },
  // 修改
  dataUpdate(params) {
    return http.$post("d_green_wave_sub/dataUpdate", params);
  },
  // 批量修改
  dataUpdateAll(params) {
    return http.$post("d_green_wave_sub/dataUpdateAll", params);
  },
  // 删除
  dataDelete(params) {
    return http.$post("d_green_wave_sub/dataDelete", params);
  },
  // 给信号机下载绿波配置
  downLoadSetting(params) {
    return http.$post("d_green_wave_sub/downLoadSetting", params);
  }
};

/* ----------------------特勤联动--------------------------- */

export const d_secret_service_plan = {
  // 列表
  planList(params) {
    return http.$post("d_secret_service_plan/planList", params);
  },
  // 线路
  getLine(params) {
    return http.$post("d_secret_service_plan/getLine", params);
  }
}