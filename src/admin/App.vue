<template>
    <div>
        <myNav></myNav>
        <myContent></myContent>
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
    import myContent from './components/content.vue';
    export default {
        data: function () {
            return {
                message: 'hello vue'
            }
        },
        components: {
            myNav,
            myContent,
            panel
        }
    }
</script>