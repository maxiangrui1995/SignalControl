import Mock from "mockjs";
// 方案列表
export const planList = Mock.mock({
  data: {
    'list|10': [{
      'id|+1': 100,
      'name': "@name",
      'min_green_down|5-255': 1,
      'min_green_up|5-255': 1,
      'max_green_down|5-255': 1,
      'max_green_up|5-255': 1,
      'extends_down|5-255': 1,
      'extends_up|5-255': 1,
      'light_count|2-8': 1,
      'phase_count|3-16': 1,
      'phase_difference|0-20': 1,
      'mc_countdown|0-20': 1,
      'mc_width|0-20': 1
    }]
  },
  status: "1"
});

