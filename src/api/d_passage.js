/* 通行权 */
import http from "./public";

export const dataList = params => {
  return http.$post("d_passage/dataList", params);
};
export const dataUpdateList = params => {
  return http.$post("d_passage/dataUpdateList", params);
};
