import axios from 'axios';
import {Toast} from 'vant';

let instance = axios.create({
    baseURL: "http://www.pudge.wang:3001",
    timeout: 10000,
    headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
})

//请求拦截器
instance.interceptors.request.use(config => {
    return config
}, error => {
    return Promise.reject(error)
})

//响应拦截器
instance.interceptors.response.use(rep => {
    return rep.data
}, error => {
    return Promise.reject(error)
})

const http = {
    get(url, params) {
        return new Promise((resolve, reject) => {
            instance.get(url, {
                params: params
            }).then(res => {
                if (res.status === '0') {
                    resolve(res)
                } else {
                    Toast(res.msg)
                }
            }).catch(err => {
                Toast(err.message)
            })
        })
    },
    post(url, params) {
        return new Promise((resolve, reject) => {
            instance.post(url, params).then(res => {
                if (res.status === '0') {
                    resolve(res)
                } else {
                    Toast(res.msg)
                }
            }).catch(err => Toast(err.message))
        })
    }
}

export default http