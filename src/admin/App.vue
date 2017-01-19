<template>
    <div>
        <myNav></myNav>
        <panel></panel>
    </div>
</template>
<style lang="less">
    body{
        font-family: '微软雅黑',Arial;
    }
</style>
<script>
    var myNav = require('./components/nav.vue');
    var panel = require('./components/panel.vue');
    module.exports = {
        data: function () {
            return {
                message: 'hello vue'
            }
        },
        components: {
            myNav,
            panel
        }
    }
</script>