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

// 路口信息
export const crossing = Mock.mock({
  'data': [{
    "id": 100,
    "pid": 0,
    "name": '市中心',
    "type": "0",
    "children": [
      {
        "id": 1000,
        "pid": 100,
        "name": '市中心',
        "type": "1",
        "children": [{
          "id": 10000,
          "pid": 1000,
          "name": '人民大街与永安路',
          "type": "2",
          "lng": '119.75574016571045',
          "lat": '36.38228508999894',
          "direction": "1357",
          "road_data": []
        }, {
          "id": 10001,
          "pid": 1000,
          "name": '人民大街与顺河路',
          "type": "2",
          "lng": '119.75788593292236',
          "lat": '36.382250539824625',
          "direction": "1357",
          "road_data": []
        }]
      }
    ]
  },
  {
    "id": 101,
    "pid": 0,
    "name": '夏庄镇',
    "type": "0",
    "children": [
      {
        "id": 1001,
        "pid": 101,
        "name": '高家店村',
        "type": "1",
        "children": [{
          "id": 10002,
          "pid": 1001,
          "name": '泽安大道与夏庄大道',
          "type": "2",
          "lng": '119.84109878540039',
          "lat": '36.43409306755671',
          "direction": "1357",
          "road_data": []
        }]
      }
    ]
  }],
  message: "操作成功",
  status: "1"
})
