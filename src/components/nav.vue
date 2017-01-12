<template>
    <div class="page-group">
        <header class="bar bar-nav">
            <span class="pull-left icon icon-menu open-panel" data-panel="#panel-left-demo"></span>
            <span class="pull-right icon icon-me" @click="log"></span>
            <h1 class="title">{{msg}}</h1>
        </header>
        <contents v-if="showLogin"></contents>
        <div v-else>
            <reg v-if="showReg">
                <div class="go">
                    <a @click="tab" href="javascript:;">已有账号？赶快去登录吧！</a>
                </div>
            </reg>
            <login v-else>
                <div class="go">
                    <a @click="tab" href="javascript:;">还没有账号？赶快去注册吧！</a>
                </div>
            </login>
        </div>
    </div>
</template>
<style>
    .go a{
        margin-top: 1rem;
        color: #666 !important;
    }
</style>
<script>
    var contents = require('./content.vue');
    var login = require('./login.vue');
    var reg = require('./reg.vue');
    module.exports = {
        data: function(){
            return{
                msg:'SAM-BLOG',
                showLogin: true,
                showReg: false
            }
        },
        components:{
            login,
            reg,
            contents
        },
        methods: {
            log: function () {
                this.showLogin = false;
            },
            tab: function () {
                this.showReg = !this.showReg;
            }
        }
    }
</script>
