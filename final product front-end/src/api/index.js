import axios from "axios";
import {
    Message
} from 'element-ui';
import router from "../router";
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // What to do before sending the request
    if (sessionStorage.token) {
        config.headers.token = sessionStorage.token;
    }
    return config;
}, function (error) {
    // What to do about the request error
    return Promise.reject(error);
});
// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // What do you do with the response data
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
    // What do you do about the response error
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