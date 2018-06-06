import Mock from "mockjs";
const Random = Mock.Random;

// 模拟特征参数-自适应方案
const produceData = function (opt) {

	return {
		id: "100",
		plan_id: "101",
		do_minutes: "1",
		flow_total: "1",
		lane_east_west: "1,2,3,4,5,6,7,8",
		lane_south_north: "9,10,11,12,13,14,15,16",
		statistic_minutes: "1",
	};
};

const app = {
	data: produceData(),
	dataView(opt) {
		let rows = app.data;

		return {
			data: rows,
			message: "操作成功",
			status: "1"
		};
	},
	dataUpdate(opt) {
		let query = JSON.parse(opt.body);
		app.data = Object.assign(app.data, query);
		return {
			message: "操作成功",
			status: "1"
		}
	}
};

//当post或get请求到/news路由时Mock会拦截请求并返回上面的数据
Mock.mock("/api/index/d_pattern_adaptive/dataView", /post|get/i, app.dataView);
Mock.mock("/api/index/d_pattern_adaptive/dataUpdate", /post|get/i, app.dataUpdate);
