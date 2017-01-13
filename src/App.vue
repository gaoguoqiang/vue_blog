<template>
    <div>
        <start v-if="show" v-on:open="change"></start>
        <transition name="show">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
    var start = require( './components/start.vue');
    module.exports =  {
        data: function () {
            return {
                show: true
            }
        },
        components:{
            start
        },
        methods:{
            change: function () {
                this.show = false;
            }
        }
    }
</script>

<style>
    .show-enter, .show-leave-active{
        opacity: 0;
    }
    .show-enter-active, .show-leave{
        transition: opacity .5s;
        transition-delay: 1.5s;
    }
</style>
