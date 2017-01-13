var Vue = require('vue');
var VueRouter = require('vue-router');

//注册VueRouter
Vue.use(VueRouter);
var App = require('./App.vue');
var index = require('./components/start.vue');
//var routers = require('./routers.js');
var routers = [
    {
        path: '/content',
        name: 'content',
        component: require('./components/content.vue')
    },
    {
        path: '/index',
        name: 'index',
        component: index
    },
    {
        path: '/',
        redirect: '/content'
    }
]
var router = new VueRouter({
    routers
});
var app = new Vue({
	router,
    components:{
        App
    },
}).$mount('#app');
