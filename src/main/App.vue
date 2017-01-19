<template>
    <div>
        <start v-show="show"></start>
            <transition name="show">
                <router-view></router-view>
            </transition>
            <transition name="show">
                <router-view name="content"></router-view>
            </transition>
            <panel></panel>
    </div>
</template>
<script>
    var start = require( './components/start.vue');
    var panel = require('./components/panel.vue');
    module.exports =  {
        data: function () {
            return {
                show: false
            }
        },
        components:{
            start,
            panel
        },
        created: function () {
            //检测是否在app内部进行刷新操作
            if(this.$route.path === '/'){
                this.show = true;
            }

        }
    }
</script>

<style>
    body{
        font-family: '微软雅黑',Arial;
    }
    .show-enter, .show-leave-active{
        opacity: 0;
    }
    .show-enter-active, .show-leave{
        transition: opacity .5s;
        transition-delay: 1.5s;
    }
    .g_bg{
        background: #fff;
        height: 100%;
    }
</style>
