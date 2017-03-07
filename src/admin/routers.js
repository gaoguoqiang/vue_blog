/**
 * Created by Administrator on 2017/1/13 0013.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

import welcome from './components/welcome.vue';
import users from './components/users.vue';
import category from './components/category.vue';
import content from './components/content.vue';
import addContent from './components/addContent.vue';
import editContent from './components/editContent.vue';
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
        },
        {
            path: '/categories',
            component: category
        },
        {
            path: '/contents',
            component: content
        },
        {
            path: '/addContent',
            component: addContent
        },
        {
            path: '/editContent/:id',
            name: 'editContent',
            component: editContent
        }
    ]
})
