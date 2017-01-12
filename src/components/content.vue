<template>
    <div id="content" class="content">
        <div class="content-padded grid-demo" v-scroll="scrollLoad">
            <div v-for="data in datas" class="card">
                <div class="card-content">
                    <div class="list-block media-list">
                        <ul>
                            <li class="item-content">
                                <div class="item-media">
                                    <img src="/public/app/images/start-bg.png">
                                </div>
                                <div class="item-inner">
                                    <div class="item-title-row">
                                        <div class="item-title">{{data.title}}</div>
                                    </div>
                                    <div class="item-subtitle">{{data.description}}</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="card-footer">
                    <span>{{data.addTime | time}}</span>
                    <span>{{data.views}} 评论</span>
                </div>
            </div>
        </div>
        <loading v-show="show"></loading>
        <p v-show="endShow" class="endInfo">歇息一会儿吧！后边什么都没有了！</p>
    </div>
</template>
<style>
    #content img{
        width: 4rem;
    }
    .row div{
        border: 1px solid #000;
    }
    .endInfo{
        color: #ccc;
        text-align: center;
    }
</style>
<script>
    //加载过滤器
    var filter = require('../filter.js');
    //加载指令
    var directive = require('../directives.js');
    //加载等待组件
    var loading = require('./loading.vue');
    //加载Bus实例
    var Bus = require('../bus.js');
    module.exports = {
        data: function(){
            return{
                datas:{},
                pages:null,
                page: 1,
                show: false,
                endShow: false,
                id: ''
            }
        },
        components: {
            //注册loading组件
          loading
        },
        methods: {
            getData: function (value) {
                var id = {};
                if(value){
                    id.id = value;
                }
                var _this = this;
                $.ajax({
                    type: 'post',
                    url: 'api/main/contents',
                    data: id,
                    success:function (data) {
                        _this.datas = data.contents;
                        _this.pages = data.pages;
                    }
                })
            },
            scrollLoad: function (value, fn) {
                var _this = this;
                var id = {};
                if(_this.id != ''){
                    id.id = _this.id;
                }
                //显示loading界面
                _this.show = true;
                _this.page++;
                //当前页等于总页数时，停止执行ajax
                if(_this.page <= _this.pages){
                    $.ajax({
                        type: 'post',
                        url: 'api/main/contents?page='+_this.page,
                        data: id,
                        success: function (data) {
                            //把新获取到的数据插入到之前的数组中
                            for(var i = 0; i < data.contents.length; i++){
                                _this.datas.push(data.contents[i])
                            }
                            //关闭loading界面
                            _this.show = false;
                            //回调函数
                            fn();
                        }
                    })
                }else{
                   //关闭loading界面
                    _this.show = false;
                    //显示没有数据的提示语
                    _this.endShow = true;
                    fn();
                }

            }
        },
        filters:{
            //时间格式过滤器
            time: filter.time
        },
        directives:{
            //无限加载指令
            scroll: directive.scroll
        },
        created: function () {
            //数据初始化
            this.getData();
        },
        beforeUpdate: function () {
            var _this = this;
            //点击分类后视图更新
            Bus.$on('contentTab',function (val) {
                //console.log(val);
                _this.id = val;
                //初始化数据
                _this.getData(val);
                //重置当前页
                _this.page = 1;
                //关闭没有数据的提示语
                _this.endShow = false;
                //设置内容界面滚动条回到顶点
                $('#content').scrollTop(0);
            })
        }
    }

</script>
