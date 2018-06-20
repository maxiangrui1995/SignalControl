import Mock from "mockjs";
const Random = Mock.Random;

// 模拟区域管理
const produceData = function (opt) {
  let rows = [
    {
      id: "11",
      name: "区域-01",
      type: "area",
      expand: "true",
      children: [
        {
          id: "101",
          name: "道路-A",
          type: "lane",
          expand: "true",
          children: [
            {
              id: "1001",
              pid: "11",
              name: "路口-Aa",
              lat: "119.78127479553223",
              lng: "36.36822190085111",
              img: Random.dataImage('250x250', '路口图片-Aa'),
              type: "crossing",
              expand: "true"
            },
            {
              id: "1002",
              pid: "11",
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
      type: "area",
      expand: "true",
      children: [
        {
          id: "102",
          name: "道路-B",
          type: "lane",
          expand: "true",
          children: [
            {
              id: "1003",
              pid: "11",
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

const dataUpdate = () => {
  return {
    data: [],
    status: "1",
    message: "操作成功"
  }
}
const dataAdd = () => {
  return {
    data: [],
    status: "1",
    message: "操作成功"
  }
}

//当post或get请求到/news路由时Mock会拦截请求并返回上面的数据
Mock.mock("/api/index/d_area/treeList", /post|get/i, app.treeList);

Mock.mock("/api/index/d_area/dataUpdate", /post|get/i, dataUpdate);
Mock.mock("/api/index/d_area/dataAdd", /post|get/i, dataAdd);