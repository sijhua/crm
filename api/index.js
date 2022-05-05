import axios from "axios";
import {
    Message
} from 'element-ui';
import router from "../router";
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if (sessionStorage.token) {
        config.headers.token = sessionStorage.token;
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if (response.data.code !== 200) {
        Message.error(response.data.msg);
        if (response.data.code === 401) {
            sessionStorage.removeItem("login");
            sessionStorage.removeItem("token");
            router.push("/login");
            location.reload();
        }
    }
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});


export default {
    get(url, paramsObj = {}) {
        return axios.get(url, {
            params: paramsObj
        });
    },
    post(url, paramsObj = {}) {
        return axios.post(url, paramsObj);
    },
    delete(url, paramsObj = {}) {
        return axios.delete(url, {
            params: paramsObj
        })
    },
    put(url, paramsObj = {}) {
        return axios.put(url, paramsObj);
    },
}