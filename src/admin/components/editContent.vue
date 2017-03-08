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
                                <select v-model="category">
                                    <option value="0">请选择分类</option>
                                    <option v-for="data in categories" :value="data._id">{{data.name}}</option>
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
                                <input type="text" placeholder="请输入文章标题" v-model="title">
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
                                <input type="text" placeholder="请输入文章简介" v-model="description">
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
                                <span id="pickfiles" class=" uploadImg icon icon-picture"></span>
                                <!--<input id="file" type="file" class="ehdel_upload" @change="changeVal">-->
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
                                <textarea v-model="content"></textarea>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="content-block">
            <div class="row">
                <div class="col-50"><router-link to="/contents" class="button button-big button-fill button-danger">取消</router-link></div>
                <div class="col-50"><a href="javascript:;" id="submit" @click="uploadFrom" class="button button-big button-fill button-success">提交</a></div>
            </div>
        </div>
    </div>
</template>
<style lang="less">
    .addContent{
        margin-top: 3rem;
    }
    .ehdel_upload{
        margin-left: -2000px;
        filter:alpha(opacity=0);
        opacity:0;
    }
    .uploadImg {
        /*position: absolute;*/
        /*top: 50%;*/
        /*left: 50%;*/
        /*margin-top: -1.2rem;*/
        display: inline-block;
        width: 80%;
        text-align: center;
        font-size: 1.5rem;
    }
</style>
<script>
    export default {
        data () {
            return{
                categories: {},
                category: '0',
                title: '',
                description: '',
                content: '',
                pic: '',
                token: '',
                id: this.$route.params.id
            }
        },
        methods: {
            getData () {
                let _this = this;
                $.ajax({
                    type: 'post',
                    url: '/api/admin/showContent',
                    data: {id: _this.id},
                    success (data) {
                        _this.title = data.title;
                        _this.description = data.description;
                        _this.content = data.content;
                        _this.category = data.category._id;
                    }
                })
            },
            //获取分类列表
            getCategories () {
                let _this = this;
                $.ajax({
                    type: 'post',
                    url: '/api/category/categoryList',
                    success (data) {
                        _this.categories = data.categories;
                    }
                })
            },
            uploadQiniu () {
                let _this = this;
                const uploader = Qiniu.uploader({
                    runtimes: 'html5,flash,html4',      // 上传模式,依次退化
                    browse_button: 'pickfiles',         // 上传选择的点选按钮，**必需**
                    // 在初始化时，uptoken, uptoken_url, uptoken_func 三个参数中必须有一个被设置
                    // 切如果提供了多个，其优先级为 uptoken > uptoken_url > uptoken_func
                    // 其中 uptoken 是直接提供上传凭证，uptoken_url 是提供了获取上传凭证的地址，如果需要定制获取 uptoken 的过程则可以设置 uptoken_func
                    // uptoken : '<Your upload token>', // uptoken 是上传凭证，由其他程序生成
                    uptoken_url: '/api/admin/token',         // Ajax 请求 uptoken 的 Url，**强烈建议设置**（服务端提供）
                    // uptoken_func: function(file){    // 在需要获取 uptoken 时，该方法会被调用
                    //    // do something
                    //    return uptoken;
                    // },
                    get_new_uptoken: true,             // 设置上传文件的时候是否每次都重新获取新的 uptoken
                    // downtoken_url: '/downtoken',
                    // Ajax请求downToken的Url，私有空间时使用,JS-SDK 将向该地址POST文件的key和domain,服务端返回的JSON必须包含`url`字段，`url`值为该文件的下载地址
                    unique_names: false,              // 默认 false，key 为文件名。若开启该选项，JS-SDK 会为每个文件自动生成key（文件名）
                    save_key: false,                  // 默认 false。若在服务端生成 uptoken 的上传策略中指定了 `sava_key`，则开启，SDK在前端将不对key进行任何处理
                    domain: 'http://okwps3vs4.bkt.clouddn.com',     // bucket 域名，下载资源时用到，如：'http://xxx.bkt.clouddn.com/' **必需**
                    //container: 'container',             // 上传区域 DOM ID，默认是 browser_button 的父元素，
                    //max_file_size: '100mb',             // 最大文件体积限制
                    //flash_swf_url: 'path/of/plupload/Moxie.swf',  //引入 flash,相对路径
                    max_retries: 3,                     // 上传失败最大重试次数
                    //dragdrop: true,                     // 开启可拖曳上传
                    //drop_element: 'container',          // 拖曳上传区域元素的 ID，拖曳文件或文件夹后可触发上传
                    //chunk_size: '4mb',                  // 分块上传时，每块的体积
                    auto_start: false,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传,
                    //x_vars : {
                    //    自定义变量，参考http://developer.qiniu.com/docs/v6/api/overview/up/response/vars.html
                    //    'time' : function(up,file) {
                    //        var time = (new Date()).getTime();
                    // do something with 'time'
                    //        return time;
                    //    },
                    //    'size' : function(up,file) {
                    //        var size = file.size;
                    // do something with 'size'
                    //        return size;
                    //    }
                    //},
                    init: {
                        'FilesAdded': function(up, files) {
                            plupload.each(files, function(file) {
                                // 文件添加进队列后,处理相关的事情
                                _this.val = true;
                            });
                        },
                        'BeforeUpload': function(up, file) {
                            // 每个文件上传前,处理相关的事情
                        },
                        'UploadProgress': function(up, file) {
                            // 每个文件上传时,处理相关的事情
                        },
                        'FileUploaded': function(up, file, info) {
                            // 每个文件上传成功后,处理相关的事情
                            // 其中 info 是文件上传成功后，服务端返回的json，形式如
                            // {
                            //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
                            //    "key": "gogopher.jpg"
                            //  }
                            // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html

                            let domain = up.getOption('domain');
                            let res = $.parseJSON(info);
                            let sourceLink = domain + '/' + res.key; //获取上传成功后的文件的Url
                            _this.pic = sourceLink;
                            //console.log('上传图片')
                            $.ajax({
                                type: 'post',
                                url: '/api/admin/contentUpdate',
                                data: {
                                    id: _this.$route.params.id,
                                    category: _this.category,
                                    title: _this.title,
                                    description: _this.description,
                                    pic: _this.pic,
                                    content: _this.content
                                },
                                success (data){
                                    $.toast(data);
                                    //两秒后返回内容管理页面
                                    setTimeout(function () {
                                        window.history.back(-1);
                                    },2000)
                                }
                            });
                        },
                        'Error': function(up, err, errTip) {
                            //上传出错时,处理相关的事情
                            console.log(err);
                            $.toast('图片上传失败');
                        },
                        'UploadComplete': function() {
                            //队列文件处理完毕后,处理相关的事情
                        },
                        'Key': function(up, file) {
                            // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                            // 该配置必须要在 unique_names: false , save_key: false 时才生效
                            // 获取图片格式
                            let imgType = file.type.split('/')[1];
                            // 打印时间戳作为图片名称
                            let time = new Date(),
                                year = time.getFullYear(),
                                month = time.getMonth()+1,
                                date = time.getDate(),
                                hours = time.getHours(),
                                min = time.getMinutes(),
                                seconds = time.getSeconds();
                            let key = year + '-' + month + '-' + date + '-' + hours + '-' + min + '-' + seconds + '.' + imgType;
                            // do something with key here
                            return key;
                        }
                    }
                });
                //触发图片上传
                $('#submit').on('click', function(){
                    uploader.start()
                })
            },
            uploadFrom () {
                let _this = this;
                if(_this.category == '0'){
                    $.toast('请选择文章分类');
                    return;
                }else if(_this.title == ''){
                    $.toast('请填写文章标题');
                    return;
                }else if(_this.description == ''){
                    $.toast('请填写文章简介');
                    return;
                }else if(_this.content == ''){
                    $.toast('请填写文章内容');
                    return;
                }else if(!_this.val){
                    //没有上传图片
                    $.ajax({
                        type: 'post',
                        url: '/api/admin/contentUpdate',
                        data: {
                            id: _this.$route.params.id,
                            category: _this.category,
                            title: _this.title,
                            description: _this.description,
                            pic: _this.pic,
                            content: _this.content
                        },
                        success (data){
                            $.toast(data);
                            //两秒后返回内容管理页面
                            setTimeout(function () {
                                window.history.back(-1);
                            },2000)
                        }
                    })
                    //上传图片的提交方式在七牛上传组件中进行
                }
            }
        },
        created () {
            //初始化分类列表
            this.getCategories();
            this.getData()
        },
        mounted () {
            //初始化七牛上传方法
            this.uploadQiniu();
        }
    }
</script>
