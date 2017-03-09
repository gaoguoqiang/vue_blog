<template>
    <div id="content" class="content">
        <div class="content-padded grid-demo" v-scroll="scrollLoad">
            <div v-for="data in datas" class="card demo-card-header-pic">
                <div valign="bottom" class="card-header color-white no-border no-padding">
                    <img class='card-cover' :src="data.pic" alt="">
                </div>

                <div class="card-content">
                    <div class="card-content-inner">
                        <p class="color-gray">发表于 {{data.addTime | time}}</p>
                        <p>文章标题：{{data.title}}</p>
                        <p>所属分类：{{data.category.name}}</p>
                        <p>阅读  {{data.views}}</p>
                    </div>
                </div>
                <div class="card-footer">
                    <span @click="clickDel(data._id)" class="button button-fill button-danger">删除</span>
                    <router-link class="button button-fill button-success" :to="{name:'editContent',params: {id:data._id}}" tag="span">修改</router-link>
                </div>
            </div>
        </div>
        <router-link class="addContentBtn" to="/addContent" tag="span">+</router-link>
        <loading v-show="show"></loading>
        <p v-show="endShow" class="endInfo">歇息一会儿吧！后边什么都没有了！</p>
    </div>
</template>
<style>
    #content{
        margin-top: 2.3rem;
    }
    #content img{
        max-height: 20rem;
    }
    .row div{
        border: 1px solid #000;
    }
    .endInfo{
        color: #ccc;
        text-align: center;
    }
    .addContentBtn{
        display: block;
        width: 3rem;
        height: 3rem;
        text-align: center;
        line-height: 3rem;
        color: #2b92d4;
        font-size: 3rem;
        position: fixed;
        bottom: 4rem;
        right: 0;
    }
</style>
<script>
    //加载过滤器
    import filter from '../filter.js';
    //加载指令
    import directive from'../directives.js';
    //加载等待组件
    import loading from'./loading.vue';
    //加载Bus实例
    import Bus from'../bus.js';
    export default {
        data (){
            return{
                datas:{},
                pages:null,
                page: 1,
                show: false,
                endShow: false,
            }
        },
        components: {
            //注册loading组件
            loading:loading
        },
        methods: {
            getData () {
                let _this = this;
                $.ajax({
                    type: 'post',
                    url: 'api/main/contents',
                    data: {id: _this.id},
                    success:function (data) {
                        _this.datas = data.contents;
                        _this.pages = data.pages;
                    }
                })
            },
            clickDel (id) {
                let _this = this;
                $.confirm('您确定要删除该文章？',
                    function () {
                        _this.del(id)
                    }
                );
            },
            del (id) {
                let _this = this;
                $.ajax({
                    type: 'get',
                    url: '/api/admin/delContent?id='+id,
                    success (data) {
                        $.toast(data);
                        if(data == '删除成功'){
                            _this.getData();
                        }
                    }
                })
            },
            scrollLoad (fn) {
                let _this = this;
                //显示loading界面
                _this.show = true;
                _this.page++;
                //当前页等于总页数时，停止执行ajax
                if(_this.page <= _this.pages){
                    $.ajax({
                        type: 'post',
                        url: 'api/main/contents?page='+_this.page,
//                        data: {id: _this.id},
                        success (data) {
                            //把新获取到的数据插入到之前的数组中
                            for(let i = 0; i < data.contents.length; i++){
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
        created () {
            //数据初始化
            this.getData();
        },
        watch: {
            //监听路由变化，刷新组件数据
            '$route' () {
                this.id = this.$route.params.id;
                this.getData();
                //重置当前页
                this.page = 1;
                //关闭没有数据的提示语
                this.endShow = false;
                //重置内容滚动条位置
                $('#content').scrollTop(0);
            }
        }
    }

</script>
