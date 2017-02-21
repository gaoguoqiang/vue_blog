/**
 * Created by Administrator on 2017/1/18 0018.
 */
import Vue from 'vue';

import App from './App.vue';
import router from './routers.js';

const app = new Vue({
    components: {
        App:App
    },
    router: router
}).$mount('#app');