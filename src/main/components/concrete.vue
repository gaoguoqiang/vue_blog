<template>
    <div id="concrete" class="content">
        <div>
            <div class="card">
                <div class="card-header">{{info.title}}</div>
                <div class="card-content">
                    <div class="card-content-inner" v-html="content"></div>
                </div>
                <div class=card-footer>
                    <span class="">作者：{{user.username}}</span>
                    <span class="icon icon-share"></span>
                </div>
            </div>
            <div class="card">
                <div class="card-content">
                    <discuss></discuss>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
    #concrete{
        margin-top: 2.3rem;
    }
    #concrete .discuss{
        margin-top: 8rem;
    }
    /*
    代码块背景样式
    */
    pre{
        background: #f6f8fa;
        border-radius: .5rem;
        padding: .5rem;
    }
    pre code {
        background: none;
    }
    code{
        background: #f6f8fa;
        border-radius: .2rem;
        color: #24292e;
        padding: .1rem;
    }
    /*
    引用样式
    */
    blockquote{
        /*background: #dfe2e5;;*/
        margin: 0;
        padding-left: .5rem;
        color: #6a737d;
        border-left: solid .2rem #dfe2e5;
    }
</style>
<script>
    var discuss = require('./discuss.vue');
   module.exports = {
       data: function () {
           return {
               info: {},
               content:'',
               id:'',
               user: {}
           }
       },
       components:{
           discuss:discuss
       },
       methods:{
           getData: function () {
               var _this = this;
               $.ajax({
                   type: 'post',
                   url: '/api/main/particular',
                   data:{id:_this.id},
                   success: function (data) {
                       _this.info = data.content;
                       _this.content = data.markdownContent;
                       _this.user = data.content.user;
                   }
               });
           }
       },
       created: function () {
           //获取路径中的参数
           this.id = this.$route.params.id;
           //初始化数据
           this.getData();
       },
       watch:{
           //监听路由变化，刷新数据
           '$route': function () {
               this.id = this.$route.params.id;
               this.getData()
           }
       }
   }
</script>
