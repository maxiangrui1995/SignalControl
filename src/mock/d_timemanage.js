import Mock from "mockjs";
const Random = Mock.Random;

// 模拟特征参数-时间调度
const produceData = function(opt) {
  let rows = [];
  for (let i = 0; i < 7; i++) {
    rows.push({
      datetype: "1",
      func_num: "0",
      id: "100" + i,
      patternid: "0",
      plan_id: "101",
      serialid: "0",
      start_day: "0",
      start_hour: "0",
      start_min: "5",
      start_mon: "0",
      stop_day: "0",
      stop_mon: "0"
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
Mock.mock("/api/index/d_timemanage/dataList", /post|get/i, app.dataList);
