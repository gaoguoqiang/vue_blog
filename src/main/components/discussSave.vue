<template>
    <div id="discussSave">
        <textarea placeholder="说点什么吧……" v-model="text"></textarea>
        <button v-if="isUser" class="button button-fill button-success" @click="save">提交</button>
        <router-link class="pleaseLoging" to="/user" v-else>请先登录！！！</router-link>
    </div>
</template>
<style>
    #discussSave{
        padding: .3rem;
    }
    #discussSave textarea {
        width: 100%;
        border-radius: .2rem;
        border: 1px solid #ccc;
        box-shadow: .1rem .1rem .1rem #ccc;
        -webkit-appearance: none;
    }
    #discussSave p{
        text-align: center;
        color: red;
    }
    #discussSave button{
        width: 100%;
        height: 2rem;
        margin: .3rem 0;
    }
    .pleaseLoging{
        display: block;
        text-align: center;
        padding: .2rem 0;
        text-decoration: underline;
    }
</style>
<script>
module.exports = {
    data: function () {
        return {
            isUser: false,
            text: ''
        }
    },
    methods: {
        checked: function () {
            var _this = this;
            $.ajax({
                type: 'post',
                url: '/api/user/status',
                success: function (data) {
                    if(data.username){
                        _this.isUser = true;
                    }else{
                        _this.isUser = false;
                    }
                }
            })
        },
        save: function () {
            var _this = this;
            $.ajax({
                type: 'post',
                url: '/api/main/discussSave',
                data: {
                    value: _this.text,
                    id: _this.$route.params.id
                },
                success: function (data) {
                    _this.$emit('update');
                    _this.text = '';
                }
            })
        }
    },
    created: function () {
        //检测登录状态
        this.checked();
    }
}
</script>
