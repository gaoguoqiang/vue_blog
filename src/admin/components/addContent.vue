<template>
    <div class="addContent">
        <div class="list-block">
            <ul>
                <!-- Text inputs -->
                <li>
                    <div class="item-content">
                        <div class="item-media"><i class="icon icon-form-gender"></i></div>
                        <div class="item-inner">
                            <div class="item-title label">分类</div>
                            <div class="item-input">
                                <select>
                                    <option v-for="data in categories">{{data.name}}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="item-content">
                        <div class="item-media"><i class="icon icon-form-name"></i></div>
                        <div class="item-inner">
                            <div class="item-title label">标题</div>
                            <div class="item-input">
                                <input type="text" placeholder="Your name">
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="item-content">
                        <div class="item-media"><i class="icon icon-form-email"></i></div>
                        <div class="item-inner">
                            <div class="item-title label">简介</div>
                            <div class="item-input">
                                <input type="text" placeholder="E-mail">
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="item-content">
                        <div class="item-media"><i class="icon icon-form-password"></i></div>
                        <div class="item-inner">
                            <div class="item-title label">封面</div>
                            <div class="item-input">
                                <span class=" uploadImg icon icon-picture"></span>
                                <input type="file" class="ehdel_upload">
                            </div>
                        </div>
                    </div>
                </li>
                <li class="align-top">
                    <div class="item-content">
                        <div class="item-media"><i class="icon icon-form-comment"></i></div>
                        <div class="item-inner">
                            <div class="item-title label">正文</div>
                            <div class="item-input">
                                <textarea></textarea>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="content-block">
            <div class="row">
                <div class="col-50"><a href="#" class="button button-big button-fill button-danger">取消</a></div>
                <div class="col-50"><a href="#" class="button button-big button-fill button-success">提交</a></div>
            </div>
        </div>
    </div>
</template>
<style lang="less">
    .addContent{
        margin-top: 3rem;
    }
    .ehdel_upload{
        float: left;
        filter:alpha(opacity=0);
        -moz-opacity:0;
        opacity:0;
    }
    .uploadImg {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -1.2rem;
        font-size: 1.5rem;
    }
</style>
<script>
    export default {
        data () {
            return{
                categories: {},
                title: '',
                description: '',
                content: '',
                pic: ''
            }
        },
        methods: {
            getData () {
                let _this = this;
                $.ajax({
                    type: 'post',
                    url: '/api/category/categoryList',
                    success (data) {
                        _this.categories = data.categories;
                        console.log(data)
                    }
                })
            }
        },
        created () {
            //初始化分类列表
            this.getData()
        }
    }
</script>
