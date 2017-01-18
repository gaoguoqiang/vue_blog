<template>
    <div id="userInfo">
        <h3>HELLO <span>{{name}}</span></h3>
        <slot></slot>
        <a @click="logout" class="button button-fill button-success button-round" href="javascript:;">退出</a>
    </div>
</template>
<style>
    #userInfo{
        text-align: center;
        margin-top: 5rem;
    }
    #userInfo a{
        width: 50%;
        margin: 0 auto;
    }
    #userInfo span{
        font-size: 1.5rem;
        font-weight: blod;
        color: #2b92d4;
    }
</style>
<script>

    module.exports = {
        data: function(){
            return{
                msg:'SAM-BLOG'
            }
        },
        props: ['name'],
        methods: {
            logout: function () {
                var _this = this;
                $.ajax({
                    type: 'get',
                    url: '/api/user/logout',
                    success: function () {
                        //退出后，触发事件，显示登录页面
                        _this.$emit('out')
                    }
                });

            }
        }
    }
</script>
