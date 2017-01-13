/**
 * Created by Administrator on 2017/1/13 0013.
 */

var routes = [
    {
        path: '/content',
        name: 'content',
        component: require('./components/content.vue')
    },
    {
        path: '/index',
        name: 'index',
        component: require('./components/nav.vue')
    }
]


module.exports = routes;


