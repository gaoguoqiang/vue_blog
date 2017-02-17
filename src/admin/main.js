/**
 * Created by Administrator on 2017/1/18 0018.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './App.vue';
import routers from './routers.js';
//注册VueRouter
Vue.use(VueRouter);
var router = new VueRouter({
    routers
});
var app = new Vue({
    components: {
        App
    },
    router
}).$mount('#app');