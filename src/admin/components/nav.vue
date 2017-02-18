<template>
    <div>
        <header class="bar bar-nav">
            <span class="pull-left icon icon-menu open-panel" data-panel="#panel-left-demo"></span>
            <a href="/#index"><span class="pull-right icon icon-home"></span></a>
            <h1 class="title">{{msg}}</h1>
        </header>
    </div>
</template>
<style>
    a{
        color: rgb(61, 65, 69);
    }
</style>
<script>
    export default {
        data: function(){
            return{
                msg:'SAM-BLOG'
            }
        }
    }
</script>
