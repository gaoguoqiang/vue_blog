<template>
    <div class="panel panel-left panel-cover theme-dark" id='panel-left-demo'>
        <div class="content-block">
            <p><a @click="tab()" href="#" class="close-panel">首页</a></p>
            <p v-for="data in list"><a @click="tab(data._id)" href="#" class="close-panel">{{data.name}}</a></p>
            <p><a href="#" class="close-panel">{{close}}</a></p>
        </div>
        <div class="list-block">
        </div>
    </div>
</template>
<style>
.content-block p{
    border-bottom: 1px solid #333;
}
.content-block a{
    display: block;
    width: 100%;
    height: 100%;
    color: #fff;
    text-align: center;
}
</style>
<script>
    var Bus = require('../bus.js')
    module.exports = {
        data: function () {
            return{
                close:'返回',
                list: {},
                id: ''
            }
        },
        methods: {
            listInfo: function () {
                var _this = this;
                $.ajax({
                    type: 'post',
                    url: '/api/category/categories',
                    success: function (data) {
                        _this.list = data.categoryName;
                        _this.id = data.id;
                    }
                })
            },
            tab: function (val) {
                //触发视图切换
                Bus.$emit('contentTab',val)
            }
        },
        created: function () {
            //数据初始化
            this.listInfo();
        }
    }
</script>
