/**
 * Created by hasee-pc on 2016/10/15.
 * 应用程序的启动（入口）文件
 */
//加载express模块
var express = require('express');
//加载模板处理模块
var swig = require('swig');
//加载数据库模块
var mongoose = require('mongoose');
//加载body-parser模块,用来处理post提交过来的数据
var bodyParser = require('body-parser');
//加载cookies模块
var Cookies = require('cookies');
//加载用户表
var User = require('./models/User');
//创建app应用 ==> NodeJS  Http.createServer();
var app = express();
//设置静态文件托管
//当用户访问的url以/public开始，那么直接返回对应__dirname + './public'下的文件
app.use('/public', express.static(__dirname + '/public'));
//配置应用模板
//定义当前应用所使用的模板引擎
//第一个参数：模板引擎的名称，同时也是模板文件的后缀，第二个参数：表示用于解析处理模板内容的方法
app.engine('html', swig.renderFile);
//设置模板文件存放的目录，第一个参数必须是views，第二个参数是目录
app.set('views', './views');
//注册所使用的模板引擎，第一个参数必须是view engine，第二个参数和app.engine方法中定义的模板引擎的名称必须是一致的
app.set('view engine', 'html');
//在开发过程中，需要取消模板缓冲-----开发完成后可以启动模板缓冲，以提高性能
swig.setDefaults({cache:false});
//bodyParser设置
app.use(bodyParser.urlencoded({extended: true}));
//cookies设置
app.use(function (req, res, next) {
    req.cookies = new Cookies(req, res);
    req.userInfo = {};
    if(req.cookies.get('userInfo')){
        try{
            req.userInfo = JSON.parse(req.cookies.get('userInfo'));

            User.findById(req.userInfo.id).then(function (userInfo) {
                req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
                next();
            })

        }catch(e){
            next();
        }
    }else{
        next();
    }

});
/*
* 根据不同的功能划分模块
* */
app.use('/admin', require('./routers/admin'));
app.use('/api', require('./routers/api'));
app.use('/', require('./routers/main'));
/*
* 首页
*   req-->requset对象
*   res-->response对象
*   next-->函数
* */
/*app.get('/', function (req, res, next) {
    //res.send('<h1>欢迎光临我的博客</h1>');
   /!*
   * 读取views目录下的指定文件，解析并返回给客户端
   * 第一个参数：表示模板文件，相对于views目录
   * 第二个参数：传递给模板使用的数据
   * *!/
   res.render('index');
});*/
//
// 监听http请求
mongoose.connect('mongodb://localhost:27017/blog', function (err) {
    if(err){
        console.log('数据库连接失败');
        console.log(err);
    }else{
        console.log('数据库连接成功');
        app.listen(8080);
    }
});

