/* 
 *   区域路口
 */
import Mock from "mockjs";

export const crossing = Mock.mock({
  "data|10": [{
    "id|+1": 100,
    "pid": 0,
    "name": "@name",
    type: "0",
    "children|3": [{
      "id|+1": 1000,
      "pid|+1": 100,
      "name": "@name",
      type: "1",
      "children|10": [{
        "id|+1": 10000,
        "pid|+1": 1000,
        "name": "@name",
        "type": "2",
        "lat": "@float(36,36,20,80)",
        "lng": '@float(119,119,50,80)',
        "direction": "1357",
        "road_data": []
      }]
    }]
  }],
  status: "1"
});

export const devs = Mock.mock({
  "data": {
    "camera|4": [{
      "id|+1": 10,
      "ip": "@ip",
      "port": "2555",
      "type": "@integer(1,2)",
      "username": "@first",
      "password": "@first" + "@integer(1000,999999)"
    }],
    "ipc|4": [{
      "id|+1": 10,
      "ip": "@ip",
      "name": "@name"
    }],
    "machine": {
      "id|+1": 10,
      "ip": "@ip",
      "port": "4001"
    },
    "ups": {
      "id|+1": 10,
      "ip": "@ip",
      "port": "5000"
    }
  },
  status: "1"
})

// 路口
Mock.mock("/api/index/d_area/treeList", /post|get/i, crossing);
// 路口下的设备
Mock.mock("/api/index/d_crossing/dataView", /post|get/i, devs);
