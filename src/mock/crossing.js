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
        "lng": '@float(119,119,20,80)',
        "direction": "1357",
        "road_data": []
      }]
    }]
  }],
  status: "1"
});

// 路口
Mock.mock("/api/index/d_area/treeList", /post|get/i, crossing);
