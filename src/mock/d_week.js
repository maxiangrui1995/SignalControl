import Mock from "mockjs";
const Random = Mock.Random;

// 模拟特征参数-日期类型
const produceData = function(opt) {
  let rows = [];
  for (let i = 0; i < 10; i++) {
    rows.push({
      id: 100 + i,
      plan_id: "101",
      sunday: Random.boolean() ? "1" : "0",
      monday: Random.boolean() ? "1" : "0",
      tuesday: Random.boolean() ? "1" : "0",
      wednesday: Random.boolean() ? "1" : "0",
      thursday: Random.boolean() ? "1" : "0",
      friday: Random.boolean() ? "1" : "0",
      saturday: Random.boolean() ? "1" : "0",
      num: i
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
  },
  dataUpdateList(opt) {
    let query = JSON.parse(opt.body);
    app.data.forEach((item, index) => {
      item = Object.assign(item, query.data[index]);
    });
    return {
      status: "1",
      message: "操作成功"
    };
  }
};

//当post或get请求到/news路由时Mock会拦截请求并返回上面的数据
Mock.mock("/api/index/d_week/dataList", /post|get/i, app.dataList);
Mock.mock("/api/index/d_week/dataUpdateList", /post|get/i, app.dataUpdateList);
