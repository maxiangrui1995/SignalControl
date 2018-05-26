/* ----------------------特勤联动--------------------------- */

export const $d_secret_service_plan = {
    // 列表
    planList(params) {
        return http.$post("d_secret_service_plan/planList", params);
    },
    // 线路
    getLine(params) {
        return http.$post("d_secret_service_plan/getLine", params);
    }
}