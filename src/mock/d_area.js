import Mock from "mockjs";
const Random = Mock.Random;

// 模拟区域管理
const produceData = function(opt) {
  let rows = [];
  for (let i = 0; i < 7; i++) {
    rows.push({
      id: "100" + i,
      name: "区域-" + Random.cword(2, 3),
      children: [
        {
          id: "101" + i,
          name: "道路-" + Random.cword(2, 3),
          children: [
            {
              id: "1001" + i,
              name: "路口-" + Random.cword(2, 3)
            },
            {
              id: "1002" + i,
              name: "路口-" + Random.cword(2, 3)
            }
          ]
        },
        {
          id: "102" + i,
          name: "道路-" + Random.cword(2, 3)
        }
      ]
    });
  }

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
