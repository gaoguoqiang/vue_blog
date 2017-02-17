<template>
    <div id="content" class="content">
        <router-view></router-view>
    </div>
</template>
<style>
    #content{
        margin-top: 2.3rem;
    }
</style>
<script>
    import welcome from './welcome.vue';
    module.exports = {
        data: function(){
            return{
                datas:{},
                pages:null,
                page: 1,
                show: false,
                endShow: false,
                id: this.$route.params.id
            }
        },
        components: {
            //注册loading组件
            welcome
        }
//        methods: {
//            getData: function () {
//                var _this = this;
//                $.ajax({
//                    type: 'post',
//                    url: 'api/main/contents',
//                    data: {id: _this.id},
//                    success:function (data) {
//                        _this.datas = data.contents;
//                        _this.pages = data.pages;
//                    }
//                })
//            },
//            scrollLoad: function (fn) {
//                var _this = this;
//                //显示loading界面
//                _this.show = true;
//                _this.page++;
//                //当前页等于总页数时，停止执行ajax
//                if(_this.page <= _this.pages){
//                    $.ajax({
//                        type: 'post',
//                        url: 'api/main/contents?page='+_this.page,
//                        data: {id: _this.id},
//                        success: function (data) {
//                            //把新获取到的数据插入到之前的数组中
//                            for(var i = 0; i < data.contents.length; i++){
//                                _this.datas.push(data.contents[i])
//                            }
//                            //关闭loading界面
//                            _this.show = false;
//                            //回调函数
//                            fn();
//                        }
//                    })
//                }else{
//                   //关闭loading界面
//                    _this.show = false;
//                    //显示没有数据的提示语
//                    _this.endShow = true;
//                    fn();
//                }
//            }
//        },
//        filters:{
//            //时间格式过滤器
//            time: filter.time
//        },
//        directives:{
//            //无限加载指令
//            scroll: directive.scroll
//        },
//        created: function () {
//            //数据初始化
//            this.getData();
//        },
//        watch: {
//            //监听路由变化，刷新组件数据
//            '$route': function () {
//                this.id = this.$route.params.id;
//                this.getData();
//                //重置当前页
//                this.page = 1;
//                //关闭没有数据的提示语
//                this.endShow = false;
//                //重置内容滚动条位置
//                $('#content').scrollTop(0);
//            }
//        }
    }

</script>
