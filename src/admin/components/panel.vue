<template>
    <div class="panel panel-left panel-cover theme-dark" id='panel-left-demo'>
        <div class="content-block">
            <p><router-link to="/index" class="close-panel">首页</router-link></p>
            <p v-for="data in list"><router-link :to="'/index/'+data._id" class="close-panel">{{data.name}}</router-link></p>
            <p><a href="javascript:;" class="close-panel">{{close}}</a></p>
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
    export default {
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
                        console.log(data)
                    }
                })
            }
        },
        created: function () {
            //数据初始化
            this.listInfo();
        }
    }
</script>
