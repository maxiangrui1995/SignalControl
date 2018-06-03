import Mock from "mockjs";
const Random = Mock.Random;

// 模拟特征参数-通行权
const produceData = function(opt) {
  return [
    {
      first_step: "1",
      first_step_time: "5",
      id: "1",
      lighttime: "9",
      plan_id: "1006",
      remark: "",
      sec_step: "1",
      sec_step_time: "4",
      third_step: "3",
      third_step_time: "0",
      time_interval: "9",
      type: "0"
    },
    {
      first_step: "1",
      first_step_time: "5",
      id: "2",
      lighttime: "9",
      plan_id: "1006",
      remark: "",
      sec_step: "1",
      sec_step_time: "4",
      third_step: "3",
      third_step_time: "0",
      time_interval: "9",
      type: "1"
    },
    {
      first_step: "1",
      first_step_time: "5",
      id: "3",
      lighttime: "9",
      plan_id: "1006",
      remark: "",
      sec_step: "1",
      sec_step_time: "4",
      third_step: "3",
      third_step_time: "0",
      time_interval: "9",
      type: "2"
    },
    {
      first_step: "1",
      first_step_time: "5",
      id: "4",
      lighttime: "9",
      plan_id: "1006",
      remark: "",
      sec_step: "1",
      sec_step_time: "4",
      third_step: "3",
      third_step_time: "0",
      time_interval: "9",
      type: "3"
    }
  ];
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
Mock.mock("/api/index/d_passage/dataList", /post|get/i, app.dataList);
Mock.mock(
  "/api/index/d_passage/dataUpdateList",
  /post|get/i,
  app.dataUpdateList
);
