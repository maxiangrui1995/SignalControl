import Mock from "mockjs";
const Random = Mock.Random;

// 模拟区域管理
const produceData = function (opt) {
  let rows = [
    {
      id: "11",
      name: "区域-01",
      latlngs: [
        { lat: "119.75998878479004", lng: "36.379210064373034" },
        { lat: "119.75913047790527", lng: "36.35605709240176" },
        { lat: "119.80522155761719", lng: "36.35529672873754" },
        { lat: "119.80565071105957", lng: "36.37893365161938" },
        { lat: "119.75998878479004", lng: "36.379210064373034" }
      ],
      type: "area",
      expand: "true",
      children: [
        {
          id: "101",
          name: "道路-01",
          type: "lane",
          expand: "true",
          latlngs: [
            { lat: "119.76702690124512", lng: "36.37561662195014" },
            { lat: "119.7960376739502", lng: "36.36013527984108" }
          ],
          children: [
            {
              id: "1001",
              name: "路口-01",
              lat: "119.78127479553223",
              lng: "36.36822190085111",
              type: "crossing",
              expand: "true",
            }
          ]
        }
      ]
    }
  ];

  return rows;
};

const app = {
  data: produceData(),
  treeList(opt) {
    let rows = app.data;

    return {
      data: rows,
      message: "操作成功",
      status: "1"
    };
  }
};

//当post或get请求到/news路由时Mock会拦截请求并返回上面的数据
Mock.mock("/api/index/d_area/treeList", /post|get/i, app.treeList);
