import Mock from "mockjs";
const Random = Mock.Random;

// 模拟特征参数-自适应方案-子
const produceData = function (opt) {
    let rows = [];
    for (let i = 0; i < 4; i++) {
        rows.push({
            id: 100 + i,
            pattern_id: "0",
            pid: "0",
            proportion_east_west: "1",
            proportion_south_north: "1"
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
    dataUpdate(opt) {
        let query = JSON.parse(opt.body);
        app.data.forEach(item => {
            if (item.id === query.id) {
                item = Object.assign(item, query)
            }
        })
        return {
            message: "操作成功",
            status: "1"
        }
    },
    dataAdd(opt) {
        let query = JSON.parse(opt.body);
        app.data.push(query)
        return {
            message: "操作成功",
            status: "1"
        }
    },
    dataDelete(opt) {
        let query = JSON.parse(opt.body);
        let rows = [];
        app.data.forEach(item => {
            if (item.id !== query.id) {
                rows.push(item)
            }
        })
        app.data = rows;
        return {
            message: "操作成功",
            status: "1"
        }
    }
};

//当post或get请求到/news路由时Mock会拦截请求并返回上面的数据
Mock.mock("/api/index/d_pattern_adaptive_sub/dataList", /post|get/i, app.dataList);
Mock.mock("/api/index/d_pattern_adaptive_sub/dataUpdate", /post|get/i, app.dataUpdate);
Mock.mock("/api/index/d_pattern_adaptive_sub/dataDelete", /post|get/i, app.dataDelete);
Mock.mock("/api/index/d_pattern_adaptive_sub/dataAdd", /post|get/i, app.dataAdd);
