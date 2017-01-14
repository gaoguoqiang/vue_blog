<template>
    <div>
        <div class="list-block">
            <ul>
                <li v-for="data in discuss" class="item-content">
                    <div class="item-media"><i class="icon icon-f7"></i></div>
                    <div class="item-inner">
                        <div class="item-title">{{data.username}}</div>
                        <div class="item-after">{{data.content}}</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<style>

</style>
<script>
module.exports = {
    data: function () {
        return {

        }
    },
    props:['discuss'],
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
