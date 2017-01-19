/**
 * Created by Administrator on 2017/1/18 0018.
 */
var Vue = require('vue');
var VueRouter = require('vue-router');

var App = require('./App.vue');
var routers = require('./routers.js');
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