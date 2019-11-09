// 做数据请求封装

import axios from 'axios'

// axios 默认配置

axios.defaults.baseURL = "http://localhost:3000";
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// axios.create({
//     timeout: 1000
// });

// 开始封装
const request = ({
    // axios 选项
    url,
    method = 'GET',
    headers,
    params,
    data,
    withCredentials = false
}) => {
    return new Promise((resolve,reject) => {
        // 数据请求处理
        switch (method) {
            case 'POST':
                axios({
                    url,
                    method,
                    data,
                    headers,
                    withCredentials
                }).then( res => resolve( res ))
                  .catch( err => reject( err ))
                break;
            default:
                /*get put delete 请求 */
                axios({
                    url,
                    method,
                    headers,
                    params,
                    withCredentials
                }).then( res => resolve( res ))
                  .catch( err => reject( err ))
                break;
        }
        // 拦截器
        // 添加请求拦截器
        axios.interceptors.request.use(function (config) {
            // 在发送请求之前做什么
            return config
        }, function (error) {
            // 对请求错误做什么
            return Promise.reject(error);
        });

        // 添加响应拦截器
        axios.interceptors.response.use(function (response) {
            // 对响应数据做点什么
            return response;
        },function (error) {
            // 对响应错误做点什么
            return Promise.reject(error);
        });
    })
}

export default request