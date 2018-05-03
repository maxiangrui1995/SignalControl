import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import CharacteristicModule from './modules/characteristicParameter';

export default new Vuex.Store({
    state: {
        isCollapsed: Boolean(localStorage.getItem('isCollapsed')) || false
    },
    mutations: {
        SET_COLLAPSED(state) {
            localStorage.setItem('isCollapsed', !state.isCollapsed);
            state.isCollapsed = !state.isCollapsed;
        }
    },
    modules: {
        CharacteristicModule
    }
});
