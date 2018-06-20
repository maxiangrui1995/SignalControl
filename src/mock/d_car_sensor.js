import Mock from "mockjs";
const Random = Mock.Random;

// 模拟特征参数-车检器
const produceData = function (opt) {
    let rows = [];
    for (let i = 0; i < 7; i++) {
        rows.push({
            id: "100" + i,
            plan_id: "101",
            serial_number: '' + i,
            channel_1: "0",
            channel_2: "0",
            channel_3: "0",
            channel_4: "0",
            channel_5: "0",
            channel_6: "0",
            channel_7: "0",
            channel_8: "0",
            min_green: "0",
            max_green: "0"
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
    }
};

//当post或get请求到/news路由时Mock会拦截请求并返回上面的数据
Mock.mock("/api/index/d_car_sensor/dataList", /post|get/i, app.dataList);
Mock.mock("/api/index/d_car_sensor/dataUpdate", /post|get/i, app.dataUpdate);
