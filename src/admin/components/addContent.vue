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
                                <input id="pickfiles" type="file" class="ehdel_upload">
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
    import uploader from '../uploadqiiu.js';
    export default {
        data () {
            return{
                categories: {},
                title: '',
                description: '',
                content: '',
                pic: '',
                token: ''
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
//                        console.log(data)
                    }
                })
            },
            uploadImg (e) {
                let _this = this;
                let fileName = e.target.files[0].name;
                let filePath = e.target.files;
//                console.log(fileName);
//                console.log(filePath);
                $.ajax({
                    type: 'post',
                    url: '/api/admin/token',
                    data: {fileName},
                    success (data) {
                        var tokens = data;
                        console.log(tokens)
                        $.ajax({
                            type: 'post',
                            url: 'http://upload.qiniu.com/',
                            data: {
                                file:filePath,
                                token: e.target.files[0]
                            },
                            success (data){
                                console.log(data)
                            }
                        })
                    }
                })
                console.log(e)
//                $.ajax({
//                    type: 'post',
//                    url: 'http://upload.qiniu.com/',
//                    data: {
//                        fileName,
//                        filePath
//                    },
//                    success (data) {
//                        console.log(data);
//                    }
//                })
            },
            getPath (obj) {
                if(obj) {
                    if (window.navigator.userAgent.indexOf("MSIE")>=1) {
                        obj.select();
                        return document.selection.createRange().text;
                    }else if(window.navigator.userAgent.indexOf("Firefox")>=1) {
                        if(obj.files) {
                            return obj.files.item(0).getAsDataURL();
                        }
                        return obj.value;
                    }
                    return obj.value;
                }
            }
        },
        created () {
            //初始化分类列表
            this.getData();

        }
    }
</script>
