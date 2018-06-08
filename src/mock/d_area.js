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
      ],
      type: "area",
      expand: "true",
      children: [
        {
          id: "101",
          name: "道路-A",
          type: "lane",
          expand: "true",
          latlngs: [
            { lat: "119.76702690124512", lng: "36.37561662195014" },
            { lat: "119.7960376739502", lng: "36.36013527984108" }
          ],
          children: [
            {
              id: "1001",
              name: "路口-Aa",
              lat: "119.78127479553223",
              lng: "36.36822190085111",
              img: Random.dataImage('250x250', '路口图片-Aa'),
              type: "crossing",
              expand: "true"
            },
            {
              id: "1002",
              name: "路口-Ab",
              lat: "119.78985786437988",
              lng: "36.3635220866413",
              img: Random.dataImage('250x250', '路口图片-Ab'),
              type: "crossing",
              expand: "true"
            }
          ]
        }
      ]
    },
    {
      id: "12",
      name: "区域-02",
      latlngs: [
        { lat: "119.65922355651855", lng: "36.3637294373714" },
        { lat: "119.64394569396973", lng: "36.337391474500556" },
        { lat: "119.69587326049805", lng: "36.3368383509056" },
        { lat: "119.68883514404297", lng: "36.36269267819594" },
      ],
      type: "area",
      expand: "true",
      children: [
        {
          id: "102",
          name: "道路-B",
          type: "lane",
          expand: "true",
          latlngs: [
            { lat: "119.68188285827637", lng: "36.36075735744602" },
            { lat: "119.66042518615723", lng: "36.33988048207114" }
          ],
          children: [
            {
              id: "1003",
              name: "路口-Ba",
              lat: "119.66754913330078",
              lng: "36.348245730105724",
              img: Random.dataImage('250x250', '路口图片-Ba'),
              type: "crossing",
              expand: "true"
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
