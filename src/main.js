var Vue = require('vue');
var VueRouter = require('vue-router');

//注册VueRouter
Vue.use(VueRouter);
var App = require('./App.vue');
var routes = require('./routers.js');
var router = new VueRouter({
    routes
});
var app = new Vue({
    components: {
        App
    },
	router
}).$mount('#app');
