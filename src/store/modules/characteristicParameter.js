/* 特征参数 */
import { getCharacteristicBase } from "@/api"


export default {
    state: {
        BASE: {}
    },
    mutations: {
        SET_CHARACTERISTIC(state, data) {
            state.BASE = data;
        }
    },
    actions: {
        SET_CHARACTERISTIC(context, params) {
            getCharacteristicBase({
                id: params
            }).then(res => {
                let data = res.data;
                for (let i in data) {
                    let item = data[i];
                    if (!isNaN(item)) {
                        data[i] = Number(item)
                    }
                }
                context.commit("SET_CHARACTERISTIC", data);
            });
        }
    },
    getters: {
        GET_CHARACTERISTIC(state, getters, rootState) {
            /* let region = rootState.region.region;
            return region ? region : null; */
        }
    }
};
