/**
 * Created by Administrator on 2017/1/13 0013.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

import welcome from './components/welcome.vue';
import users from './components/users.vue';
//注册vue-router
Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/',
            component: welcome
        },
        {
            path: '/users',
            component: users
        }
    ]
})
