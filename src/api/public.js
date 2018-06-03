import axios from "axios";
import iView from "iview";
import "@/mock";

axios.defaults.baseURL = "/api/index";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

const $post = (url, params) => {
  return new Promise((reslove, reject) => {
    axios
      .post(url, params)
      .then(res => {
        reslove(res.data);
      })
      .catch(error => {
        if (error.response) {
          iView.Notice.error({
            title: "服务器连接错误！" + error.response.status,
            duration: 5
          });
        } else {
        }
        reject(error);
      });
  });
};

export default {
  $post
};
