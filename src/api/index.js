import Vue from "vue";
import axios from 'axios';
import iView from "iview";
/* 自定义拦截请求 */
import '@/mock';

axios.defaults.baseURL = "/api";
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

const ajax = (url, params) => {
    return new Promise((reslove, reject) => {
        axios
            .post(url, params)
            .then(res => {
                reslove(res.data);
            })
            .catch(error => {
                if (error.response) {
                    // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                    /* console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers); */
                    let status = error.response.status;
                    iView.Notice.error({
                        title: '服务器提示',
                        desc: `<h3>${status}</h3>`,
                        duration: 10
                    });
                } else {
                    // Something happened in setting up the request that triggered an Error
                    /* console.log('Error', error.message); */
                }
                /* console.log(error.config); */
                reject(error);
            });
    })
};

Vue.prototype.ajax = ajax;

export default ajax;
