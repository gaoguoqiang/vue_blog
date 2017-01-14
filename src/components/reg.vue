<template>
    <div id="reg" class="content">
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
                            <div class="item-title label">输入密码</div>
                            <div class="item-input">
                                <input type="password" placeholder="Your password" v-model="password">
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="item-content">
                        <div class="item-media"><i class="icon icon-form-name"></i></div>
                        <div class="item-inner">
                            <div class="item-title label">确认密码</div>
                            <div class="item-input">
                                <input type="password" placeholder="Your password" v-model="repassword">
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="content-block">
            <div id="regBtn"><a @click="reg" href="javascript:;" class="button button-big button-fill button-success">注册</a></div>
            <slot></slot>
        </div>
    </div>
</template>
<style>
    #reg{
        margin-top: 2rem;
    }
    #regBtn{
        margin: 0 auto;
    }
</style>
<script>
module.exports = {
    data: function () {
        return {
            message: 'hello vue',
            username: '',
            password: '',
            repassword: ''
        }
    },
    methods: {
        reg: function () {
            var _this = this;
            $.showPreloader('注册中...');
            $.ajax({
                type: 'post',
                url: '/api/user/register',
                data: {
                    username: _this.username,
                    password: _this.password,
                    repassword: _this.repassword
                },
                success: function (data) {
                    //隐藏loading界面
                    $.hidePreloader();
                    $.toast(data.message);
                    //2秒后触发事件，显示登录页面
                    setTimeout(function () {
                        _this.$emit('regSuccess');
                    },2000);
                }
            })
        }
    }
}
</script>
