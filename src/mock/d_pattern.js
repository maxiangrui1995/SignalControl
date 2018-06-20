import Mock from "mockjs";
const Random = Mock.Random;

// 模拟特征参数-方案
let params = {
  period: "41",
  phase1: "0",
  phase2: "1",
  phase3: "255",
  phase4: "255",
  phase5: "255",
  phase6: "255",
  phase7: "255",
  phase8: "255",
  phase9: "255",
  phase10: "255",
  phase11: "255",
  phase12: "255",
  phase13: "255",
  phase14: "255",
  phase15: "255",
  phase16: "255",
  time1: "14",
  time2: "9",
  time3: "0",
  time4: "0",
  time5: "0",
  time6: "0",
  time7: "0",
  time8: "0",
  time9: "0",
  time10: "0",
  time11: "0",
  time12: "0",
  time13: "0",
  time14: "0",
  time15: "0",
  time16: "0",
  plan_id: "0",
  step: "2",
  time_interval: "9"
};
const produceData = function(opt) {
  let rows = [];
  for (let i = 0; i < 5; i++) {
    rows.push(
      Object.assign(
        {
          id: 100 + i,
          patternid: i
        },
        params
      )
    );
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
  dataAdd(opt) {
    let rows = app.data;
    rows.push(
      Object.assign(
        {
          id: rows.length + 1,
          patternid: rows.length
        },
        params
      )
    );

    return {
      status: "1",
      message: "操作成功"
    };
  },
  dataUpdate(opt) {
    let query = JSON.parse(opt.body);
    app.data.forEach(item => {
      if (item.id == query.id) {
        item = Object.assign(item, query);
      }
    });
    return {
      status: "1",
      message: "操作成功"
    };
  },
  dataDelete(opt) {
    let query = JSON.parse(opt.body);
    let id = query.id;
    let page = app.page;
    let size = app.rows;
    let rows = app.data;
    let data = [];

    rows.forEach(item => {
      if (item.id !== id) {
        data.push(item);
      }
    });
    app.data = data;
    return {
      status: "1",
      message: "操作成功"
    };
  }
};

//当post或get请求到/news路由时Mock会拦截请求并返回上面的数据
Mock.mock("/api/index/d_pattern/dataList", /post|get/i, app.dataList);
Mock.mock("/api/index/d_pattern/dataAdd", /post|get/i, app.dataAdd);
Mock.mock("/api/index/d_pattern/dataDelete", /post|get/i, app.dataDelete);
Mock.mock("/api/index/d_pattern/dataUpdate", /post|get/i, app.dataUpdate);
