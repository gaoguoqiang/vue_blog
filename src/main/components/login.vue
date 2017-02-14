<template>
    <div id="login" class="content">
        <div class="list-block">
            <ul>
                <!-- Text inputs -->
                <li>
                    <div class="item-content">
                        <div class="item-media"><i class="icon icon-form-name"></i></div>
                        <div class="item-inner">
                            <div class="item-title label">用户名</div>
                            <div class="item-input">
                                <input type="text" placeholder="Your username" v-model="username">
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="item-content">
                        <div class="item-media"><i class="icon icon-form-name"></i></div>
                        <div class="item-inner">
                            <div class="item-title label">密码</div>
                            <div class="item-input">
                                <input type="password" placeholder="Your password" v-model="password">
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="content-block">
            <div id="logBtn"><a @click="login" href="javascript:;" class="button button-big button-fill button-success">登录</a></div>
            <slot></slot>
        </div>
    </div>
</template>
<style>
    #logBtn{
        margin: 0 auto;
    }
    #login{
        margin-top: 2rem;
        position: relative;
        z-index: 1;
    }
</style>
<script>
module.exports = {
    data: function () {
        return {
            message: 'hello vue',
            username: '',
            password: ''
        }
    },
    methods: {
        login: function () {
            var _this = this;
            //显示loading界面
            $.showPreloader('登录中...');
            $.ajax({
                type: 'post',
                url: '/api/user/login',
                data: {
                    username: _this.username,
                    password: _this.password
                },
                success: function (data) {
                    //隐藏loading界面
                    $.hidePreloader();
                    $.toast(data.message);
                    //2秒后触发事件，显示个人信息页面
                    setTimeout(function () {
                        _this.$emit('showUserinfo');
                    },2000)
                }
            })
        }
    }
}
</script>
