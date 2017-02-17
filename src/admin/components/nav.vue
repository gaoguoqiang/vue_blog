<template>
    <div>
        <header class="bar bar-nav">
            <span class="pull-left icon icon-menu open-panel" data-panel="#panel-left-demo"></span>
            <router-link class="pull-right icon icon-home" to="/#/index" tag="span"></router-link>
            <h1 class="title">{{msg}}</h1>
        </header>
    </div>
</template>
<style>
    .go a{
        margin-top: 1rem;
        color: #666 !important;
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
