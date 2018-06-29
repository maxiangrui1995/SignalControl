import Vue from 'vue';
import iView from 'iview';
import App from './app.vue';
import './api';
import router from './router';
import store from './store';
import 'iview/dist/styles/iview.css';
import 'vue2-scrollbar/dist/style/vue2-scrollbar.css';

Vue.use(iView);

iView.Message.config({
    duration: 3
});

new Vue({
    el: "#app",
    router,
    store,
    components: {
        App
    },
    template: "<App/>"
});