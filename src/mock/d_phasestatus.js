import Mock from "mockjs";
const Random = Mock.Random;

// 模拟特征参数-相位(阶段)
const produceData = function(opt) {
  let rows = [];
  for (let i = 0; i < 7; i++) {
    rows.push({
      id: 100 + i,
      light_list: "3333113133331131",
      phasename: "",
      plan_id: "1001",
      serialid: i
    });
  }

  return rows;
};

const app = {
  data: produceData(),
  dataList(opt) {
    let rows = app.data;

    return {
      data: {
        total: rows.length,
        list: rows
      },
      message: "操作成功",
      status: "1"
    };
  }
};

//当post或get请求到/news路由时Mock会拦截请求并返回上面的数据
Mock.mock("/api/index/d_phasestatus/dataList", /post|get/i, app.dataList);
