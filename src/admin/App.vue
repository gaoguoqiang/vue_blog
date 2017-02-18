<template>
    <div>
        <myNav></myNav>
        <router-view></router-view>
        <panel></panel>
    </div>
</template>
<style lang="less">
    body{
        font-family: '微软雅黑',Arial;
    }
</style>
<script>
    import myNav from './components/nav.vue';
    import panel from './components/panel.vue';
    export default {
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