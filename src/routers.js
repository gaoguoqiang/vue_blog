/**
 * Created by Administrator on 2017/1/13 0013.
 */

var routers = [
    {
        path: '/content',
        name: 'content',
        component: require('./components/content.vue')
    },
    {
        path: '/',
        redirect: '/content'
    }
]


module.exports = routers;


