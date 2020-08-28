import http from "@/utils/http";

//index页
export const getBanner = (params) => {
    return http.get('/home/banner', params)
}

export function getRecommendList(params) {
    return http.post('/home/recommend', params)
}

//获取商品详情信息
export function getItemDetail(params) {
    return http.post('/detail', params)
}

//获取分类信息
export function getCategory(params) {
    return http.post('/classify', params)
}

//获取短信验证码
export function getTextCode(params) {
    return http.post('/register/getCode', params)
}

export function getLogin(params) {
    return http.post('/register', params)
}