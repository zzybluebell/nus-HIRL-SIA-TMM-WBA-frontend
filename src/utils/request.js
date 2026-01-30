import axios from "axios";
import { baseURL } from '../config'

// 创建实列
const instance = axios.create({
    baseURL: baseURL,
    timeout: 10000, // 请求超时时间
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const token = sessionStorage?.getItem('token') || '';
    if (token) {
        config.headers.Authorization = token
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});


// 这个模块封装各种请求方式（如：get，post等等）
export function get(url, params) {
    let querystr = "";
    for (let key in params) {
        if (params[key]) {
            // url encode
            querystr += `${key}=${encodeURIComponent(params[key])}&`;
        }

    }
    if (querystr) {
        querystr = querystr.substring(0, querystr.length - 1);
    }

    return new Promise(function (resovle, reject) {
        instance.get(url + "?" + querystr)
            .then(res => {
                if (!res.data) {
                    resovle(res);
                }
                resovle(res.data);
            }, err => {
                reject(err);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function post(url, params) {
    return new Promise(function (resovle, reject) {
        instance.post(url, params, { withCredentials: true})
            .then(res => {
                if (!res.data) {
                    resovle(res);
                }
                resovle(res.data);
            }, err => {
                reject(err);
            })
            .catch(err => {
                reject(err);
            });
    });
}


export default instance