import Mock from "mockjs";
const Random = Mock.Random;

// 模拟特征参数
const params = {
  min_green_down: "5",
  min_green_up: "255",
  max_green_down: "5",
  max_green_up: "255",
  extends_down: "5",
  extends_up: "255",
  light_count: "4",
  phase_count: "16",
  phase_difference: "0",
  mc_countdown: "0",
  mc_width: "20"
};

const produceData = function(opt) {
  let rows = [];
  for (let i = 0; i < 30; i++) {
    let obj = Object.assign(
      {
        id: 100 + i,
        name: "方案" + Random.cword(3, 6)
      },
      params
    );
    rows.push(obj);
  }

  return rows;
};

const app = {
  data: produceData(),
  page: 1,
  rows: 10,
  dataList(opt) {
    let query = JSON.parse(opt.body);
    let page = (app.page = query.page);
    let size = (app.rows = query.rows);
    let rows = app.data;
    let data = rows.slice((page - 1) * size, page * size);

    return {
      data: {
        total: rows.length,
        list: data
      },
      message: "操作成功",
      status: "1"
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
  },
  dataInit(opt) {
    let query = JSON.parse(opt.body);
    let name = query.name;
    let page = app.page;
    let size = app.rows;
    let rows = app.data;
    rows.unshift(
      Object.assign(
        {
          id: rows.length + 1,
          name: name
        },
        params
      )
    );

    return {
      status: "1",
      message: "操作成功"
    };
  },
  dataView(opt) {
    let query = JSON.parse(opt.body);
    let id = query.id;
    let rows = {};
    app.data.forEach(item => {
      if (item.id == id) {
        rows = item;
      }
    });

    return {
      status: "1",
      data: rows
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
  }
};

//当post或get请求到/news路由时Mock会拦截请求并返回上面的数据
Mock.mock("/api/index/d_plan/dataList", /post|get/i, app.dataList);
Mock.mock("/api/index/d_plan/dataInit", /post|get/i, app.dataInit);
Mock.mock("/api/index/d_plan/dataDelete", /post|get/i, app.dataDelete);
Mock.mock("/api/index/d_plan/dataView", /post|get/i, app.dataView);
Mock.mock("/api/index/d_plan/dataUpdate", /post|get/i, app.dataUpdate);
