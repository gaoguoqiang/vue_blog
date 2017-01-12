<template>
    <div>
        <start v-if="show" v-on:open="change"></start>
        <myNav v-else></myNav>
        <div class="panel-overlay"></div>
        <panel></panel>
    </div>
</template>
<script>
    var start = require( './components/start.vue');
    var myNav = require( './components/nav.vue');
    var panel = require('./components/panel.vue');
    module.exports =  {
        data: function () {
            return {
                show: true
            }
        },
        components:{
            start,
            myNav,
            panel
        },
        methods:{
            change: function () {
                this.show = false;
            }
        }
    }
</script>

<style>

</style>
