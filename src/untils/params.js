/* 时间调度 */
export const d_green_wave = {
  // 日期类型
  type: {
    "0": "每天",
    "1": "时间段"
  },
  // 协调相位
  coordinate_direction: {
    "1": "正向"
  }
};
/* 绿波带 */
export const d_green_wave_sub = {
  // 协调相位
  positive_phase: [
    {
      value: "0",
      title: "由东向西左转"
    },
    {
      value: "1",
      title: "由东向西直行"
    },
    {
      value: "2",
      title: "由东向西右转"
    },
    {
      value: "3",
      title: "由东向西行人"
    },
    {
      value: "4",
      title: "由南向北左转"
    },
    {
      value: "5",
      title: "由南向北直行"
    },
    {
      value: "6",
      title: "由南向北右转"
    },
    {
      value: "7",
      title: "由南向北行人"
    },
    {
      value: "8",
      title: "由西向东左转"
    },
    {
      value: "9",
      title: "由西向东直行"
    },
    {
      value: "10",
      title: "由西向东右转"
    },
    {
      value: "11",
      title: "由西向东行人"
    },
    {
      value: "12",
      title: "由北向南左转"
    },
    {
      value: "13",
      title: "由北向南直行"
    },
    {
      value: "14",
      title: "由北向南右转"
    },
    {
      value: "15",
      title: "由北向南行人"
    }
  ]
};

/* 路口 */
export const d_crossing = {
  direction: {
    "1357": "普通十字型路口"
  },
  road_data: [
    { direction: 1, roadnum: 3, target: [3, 2, 4] },
    { direction: 3, roadnum: 3, target: [3, 2, 4] },
    { direction: 5, roadnum: 3, target: [3, 2, 4] },
    { direction: 7, roadnum: 3, target: [3, 2, 4] }
  ]
};

/* 信号机控制状态 */
export const control_func = {
  "0": "定周期方式",
  "1": "待机黄闪",
  "2": "待机全红",
  "3": "无线缆协调",
  "4": "感应方式",
  "7": "关闭外灯",
  "8": "关闭外灯",
  "9": "时钟同步",
  "153": "锁相位特勤控制",
  "181": "锁阶段特勤控制，或手动控制和步进",
  "200": "自适应方案"
};
/* 时间调度功能 */
export const func_num = [
  {
    value: "0",
    label: "定周期方式"
  },
  {
    value: "1",
    label: "待机黄闪"
  },
  {
    value: "2",
    label: "待机全红"
  },
  {
    value: "3",
    label: "无线缆协调"
  },
  {
    value: "4",
    label: "感应方式"
  },
  {
    value: "9",
    label: "时钟同步"
  },
  {
    value: "200",
    label: "自适应方案"
  }
]

/* 信号机等待位置 */
export const position = {
  "1": "南",
  "2": "东",
  "3": "北",
  "4": "西"
};

/* 周几 */
export const week = {
  sunday: "周日",
  monday: "周一",
  tuesday: "周二",
  wednesday: "周三",
  thursday: "周四",
  friday: "周五",
  saturday: "周六"
}

/* 灯色 */
export const light_color = {
  "1": "红", "2": "黄", "3": "绿",
  "6": "红闪", "7": "黄闪", "8": "绿闪",
};
/* 灯序 */
export const lightorder = {
  "1": "行车",
  "2": "行人"
};
/* 灯型 */
export const lightsharp = {
  "0": "满屏",
  "1": "箭头",
  "2": "行人"
};
export const target = {
  "2": "直行",
  "3": "左转",
  "4": "右转",
  "11": "直行"
};
export const light_title = {
  "A": "A",
  "B": "B",
  "C": "C",
  "D": "D", "E": "E", "F": "F", "G": "G", "H": "H", "I": "I", "J": "J", "K": "K", "L": "L", "M": "M", "N": "N", "O": "O", "P": "P"
};


// 相机类型
export const camera_type = {
  "1": "车流量相机",
  "2": "电子警察"
}