<template>
    <div id="content" class="content">
        <div class="content-padded grid-demo">
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
    </div>
</template>
<style>
    #content{
        margin-top: 2.3rem;
    }
    #content img{
        width: 4rem;
    }
    .row div{
        border: 1px solid #000;
    }
</style>
<script>
    var filter = require('../filter.js');
    module.exports = {
        data: function(){
            return{
                datas:{}
            }
        },
        methods: {
            getData: function () {
                var _this = this;
                $.ajax({
                    type: 'post',
                    url: 'api/main/contents',
                    success:function (data) {
                        _this.datas = data.contents;
                        console.log(_this.datas)
                    }
                })
            }
        },
        filters:{
            time: filter.time
        },
        created: function () {
            this.getData();
        }
    }
</script>
