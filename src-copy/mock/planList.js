/* 
 *   方案列表
 */
import Mock from "mockjs";

const plan = Mock.mock({
    'list|30': [{
        'id|+1': 100,
        'name': "@name",
        'min_green_down|5-255': 1,
        'min_green_up|5-255': 1,
        'max_green_down|5-255': 1,
        'max_green_up|5-255': 1,
        'extends_down|5-255': 1,
        'extends_up|5-255': 1,
        'light_count|2-8': 1,
        'phase_count|3-16': 1,
        'phase_difference|0-20': 1,
        'mc_countdown|0-20': 1,
        'mc_width|0-20': 1,
        'time_interval': 9
    }]
})

export const planList = (opt) => {
    let query = JSON.parse(opt.body);
    let page = query.page;
    let size = query.rows;
    let data = plan.list.slice((page - 1) * size, page * size);
    console.log(data);

    return Mock.mock({
        "data": {
            'list': data,
            total: 30
        },
        status: "1"
    });
}


// 方案
Mock.mock("/api/index/d_plan/dataList", /post|get/i, planList);
