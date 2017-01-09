<template>
    <div>
        <start v-if="show" v-on:open="change"></start>
        <myNav v-else></myNav>
        <contents v-if="show==false"></contents>
        <div class="panel-overlay"></div>
        <panel></panel>
    </div>
</template>
<script>
    var start = require( './components/start.vue');
    var myNav = require( './components/nav.vue');
    var panel = require('./components/panel.vue');
    var contents = require('./components/content.vue');
    module.exports =  {
        data: function () {
            return {
                show: true
            }
        },
        components:{
            start,
            myNav,
            panel,
            contents
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
