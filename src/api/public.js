import axios from "axios";

axios.defaults.baseURL = "/api/";
axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";

const $post = (url, params) => {
    return new Promise((reslove, reject) => {
        axios
            .post(url, params)
            .then(res => {
                reslove(res.data);
            })
            .catch(res => {
                if (error.response) {
                    // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);

                reject(res.data);
            });
    });
};

export default { $post };
