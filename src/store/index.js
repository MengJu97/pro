import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import {getRecommendList, getItemDetail, getCategory} from "@/utils/api";


export default new Vuex.Store({
    state: {
        recommendList: [],
        itemDetailList: [],
        itemDetailStandards: [],
        itemDetailStandardsStandards: [],
        catList: []
    },
    mutations: {
        recordRecommendList(state, payload) {
            state.recommendList = payload.result.list
        },
        recordDetailList(state, payload) {
            state.itemDetailList = payload.result;
            state.itemDetailStandards = payload.result.standards;
            state.itemDetailStandardsStandards = payload.result.standards.standards;
        },
        recordCategory(state,payload) {
            state.catList = payload.result
        }
    },
    actions: {
        async getRecommendList({commit}, payload) {
            const result = await getRecommendList(payload);
            commit('recordRecommendList', result)
        },
        async actionGetDetail({commit}, payload) {
            const result = await getItemDetail(payload);
            commit('recordDetailList', result)
        },
        async getCategoryList({commit}, payload) {
            const result = await getCategory(payload);
            commit('recordCategory', result)
        }

    },
    modules: {}
})
