<template>
    <div>
        <userinfo v-if="showUserinfo" :name="username" v-on:out="logout">
            <p v-if="isAdmin"><a href="/admin">进入后台管理页面</a></p>
            <p v-else>欢迎进入我的个人博客！！！</p>
        </userinfo>
        <div v-else>
            <reg v-if="showReg" v-on:regSuccess="tab()">
                <div class="go">
                    <a style="text-decoration: underline" @click="tab" href="javascript:;">已有账号？赶快去登录吧！</a>
                </div>
            </reg>
            <login v-else v-on:showUserinfo="login">
                <div class="go">
                    <a style="text-decoration: underline" @click="tab" href="javascript:;">还没有账号？赶快去注册吧！</a>
                </div>
            </login>
        </div>
    </div>
</template>
<style>
    /*.go a{*/
        /*margin-top: 1rem;*/
        /*color: #666 !important;*/
    /*}*/
</style>
<script>
    var login = require('./login.vue');
    var reg = require('./reg.vue');
    var userinfo = require('./userinfo.vue');
    var Bus = require('../bus.js');
    module.exports = {
        data: function(){
            return{
                msg:'SAM-BLOG',
                showReg: false,
                showUserinfo: false,
                isAdmin: false,
                username:''
            }
        },
        components:{
            login:login,
            reg:reg,
            userinfo:userinfo
        },
        methods: {
            //切换登录与注册组件
            tab: function () {
                this.showReg = !this.showReg;
            },
            //退出后，显示登录组件
            logout: function () {
                this.showUserinfo = false;
            },
            //获取个人信息
            userinfo: function () {
                var _this = this;
                $.ajax({
                    type: 'post',
                    url: '/api/user/status',
                    success: function (data) {
                        if(data.username){
                            _this.showUserinfo = true;
                            _this.isAdmin = data.isAdmin;
                            _this.username = data.username;
                        }
                    }
                })
            },
            //登录后显示个人信息组件，并更新个人信息
            login: function () {
                this.userinfo();
            }
        },
        created: function () {
            var _this = this;
            //判断初始登录状态
            _this.userinfo();
        }
    }
</script>
