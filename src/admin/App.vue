<template>
    <div>
        <myNav></myNav>
        <div class="content">
            <router-view></router-view>
        </div>
        <panel></panel>
        <popupEdit></popupEdit>
        <popupDelete></popupDelete>
        <popupAdd></popupAdd>
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
    import popupEdit from './components/popupEdit.vue';
    import popupDelete from './components/popupDelete.vue';
    import popupAdd from './components/popupAdd.vue';
    export default {
        data: function () {
            return {
                message: 'hello vue'
            }
        },
        components: {
            myNav,
            panel,
            popupEdit,
            popupDelete,
            popupAdd
        }
    }
</script>