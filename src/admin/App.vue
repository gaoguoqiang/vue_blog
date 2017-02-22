<template>
    <div>
        <myNav></myNav>
        <div class="content">
            <router-view></router-view>
        </div>
        <panel></panel>
        <popup></popup>
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
    import popup from './components/popup_edit.vue';
    export default {
        data: function () {
            return {
                message: 'hello vue'
            }
        },
        components: {
            myNav,
            panel,
            popup
        }
    }
</script>