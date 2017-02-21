<template>
    <div class="panel panel-left panel-cover theme-dark" id='panel-left-demo'>
        <div class="content-block">
            <p><router-link to="/" class="close-panel">首页</router-link></p>
            <p v-for="data in list"><router-link :to='data.path' class="close-panel">{{data.name}}</router-link></p>
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
        data () {
            return{
                close:'返回',
                list: [
                    {name:'用户管理',path:'/users'},
                    {name:'分类管理',path:'/contents'},
                    {name:'内容管理',path:'/haha'}
                ]
            }
        }
    }
</script>
