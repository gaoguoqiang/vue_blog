<template>
    <div id="concrete" class="content">
        <div class="content-padded grid-demo">
            <div class="concrete">
                <h1>{{info.title}}</h1>
                <div v-html="content"></div>
            </div>
        </div>
    </div>
</template>
<style>
    #concrete{
        background: #fff;
    }
    #concrete .concrete{
        margin-top: 2.3rem;
    }
    #concrete .concrete h1{
        text-align: center;
    }
</style>
<script>
   module.exports = {
       data: function () {
           return {
               info: {},
               content:'',
               id:''
           }
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
                   }
               })
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
