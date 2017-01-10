/**
 * Created by hasee-pc on 2016/10/15.
 */

var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Category = require('../models/Category');
var Content = require('../models/Content');
var Markdown = require('markdown').markdown;

//统一返回数据的格式
var responseData;

router.use(function (req, res, next) {
    responseData = {
        code: 0,
        message: ''
    };
    next();
});
/*
* 用户注册
*   注册逻辑
* */
router.post('/user/register', function (req, res, next) {
   //console.log(req.body);
    var username = req.body.username;
    var password = req.body.password;
    var repassword = req.body.repassword;
    if(username == ''){
        responseData.code = 1;
        responseData.message = '用户名不能为空';
        res.json(responseData);
        return;
    }

    if(password == ''){
        responseData.code = 2;
        responseData.message = '密码不能为空';
        res.json(responseData);
        return;
    }

    if(repassword == ''){
        responseData.code = 3;
        responseData.message = '两次输入的密码不一致';
        res.json(responseData);
        return;
    }
    //用户名是否已经被注册了，如果数据库中已经存在和我们要注册的用户名相同的数据，表示用户名已经被注册了
    User.findOne({
        username:username
    }).then(function (userInfo) {
        console.log(userInfo)
       if(userInfo){
           //表示数据库中已有记录
           responseData.code = 4;
           responseData.message = '用户名已经被注册了';
           res.json(responseData);
           return;
       }
       var user = new User({
           username:username,
           password:password
       });
       return user.save();
    }).then(function (newUserInfo) {
        //console.log(newUserInfo);
        responseData.message = '注册成功';
        res.json(responseData);
    });

});
//登录
router.post('/user/login', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    if(username == '' || password == ''){
        responseData.code = 1;
        responseData.message = '用户名或密码不能为空';
        res.json(responseData);
        return;
    }
    
    User.findOne({
        username:username,
        password:password
    }).then(function (userInfo) {
        if(!userInfo){
            responseData.code = 2;
            responseData.message = '用户名或密码错误';
            res.json(responseData);
            return;
        }
        responseData.message = '登录成功';
        responseData.userInfo = {
            id:userInfo._id,
            username:userInfo.username
        };
        req.cookies.set('userInfo', JSON.stringify({
            id:userInfo._id,
            username:userInfo.username
        }));
        res.json(responseData);
        return;
    })
});
//退出
router.get('/user/logout', function (req, res) {
    req.cookies.set('userInfo', null);
    res.json(responseData);
});
//用户列表
router.post('/user/usersList', function (req, res) {
    /*
    * 从数据库中读取所有数据
    *
    * limit(Number): 限制获取的数据条数
    *
    * skip(): 忽略数据的条数
    * */
    var page = Number(req.query.page || 1);
    var limit = 2;
    var pages = 0;
    User.count().then(function (count) {
        pages = Math.ceil(count/limit);
        page = Math.min(page, pages);
        page = Math.max(page, 1);
        var skip = (page-1) * limit;

        User.find().limit(limit).skip(skip).then(function (users) {
            responseData.users = users;
            res.json({
                users: users,
                page: page,
                pages: pages,
                count: count,
                limit: limit
            });
            return;
        })
    });
});
/*
* 分类列表
* */
router.post('/category/categoryList', function (req, res) {
    /*
     * 从数据库中读取所有数据
     *
     * limit(Number): 限制获取的数据条数
     *
     * skip(): 忽略数据的条数
     * */
    var page = Number(req.query.page || 1);
    var limit = 3;
    var pages = 0;
    Category.count().then(function (count) {
        pages = Math.ceil(count/limit);
        page = Math.min(page, pages);
        page = Math.max(page, 1);
        var skip = (page-1) * limit;

        Category.find().sort({_id:-1}).limit(limit).skip(skip).then(function (categories) {
            res.json({
                categories: categories,
                page: page,
                pages: pages,
                count: count,
                limit: limit
            });
            return;
        })
    });
});
router.post('/category/categories', function (req, res) {
    Category.find().sort({_id:-1}).then(function (categories) {
        res.json({
            categoryName: categories
        })
    })
});
/*
 * 内容列表
 * */
router.post('/content/contentList', function (req, res) {
    /*
     * 从数据库中读取所有数据
     *
     * limit(Number): 限制获取的数据条数
     *
     * skip(): 忽略数据的条数
     * */
    var page = Number(req.query.page || 1);
    var limit = 3;
    var pages = 0;
    Content.count().then(function (count) {
        pages = Math.ceil(count/limit);
        page = Math.min(page, pages);
        page = Math.max(page, 1);
        var skip = (page-1) * limit;

        Content.find().sort({_id:-1}).limit(limit).skip(skip).populate(['category', 'user']).then(function (contents) {
            res.json({
                contents: contents,
                page: page,
                pages: pages,
                count: count,
                limit: limit
            });
            return;
        })
    });
});
/*
* 首页内容列表
* */
router.post('/main/contents', function (req, res) {
    var page = Number(req.query.page || 1);
    var categoryId = {};
    if(req.query.id){
        categoryId.category = req.query.id;
        // console.log(req.query.id)
        // console.log(categoryId)
    }
    var limit = 5;
    var pages = 0;

    Content.count(categoryId).then(function (count) {
        pages = Math.ceil(count/limit);
        page = Math.min(page, pages);
        page = Math.max(page, 1);
        var skip = (page-1) * limit;
        Content.find(categoryId).sort({_id: -1}).limit(limit).skip(skip).populate(['category', 'user']).then(function (contents) {
            res.json({
                contents: contents,
                page: page,
                pages: pages,
                count: count,
                limit: limit
            })
        });
        return;
    });
});
//内容详情
router.post('/main/particular', function (req, res) {
    var id = req.body.id;
    Content.findOne({_id: id}).populate(['user']).then(function (content) {
        content.views++;
        content.save();
        var markdownContent = Markdown.toHTML(content.content);
        res.json({
            content: content,
            markdownContent: markdownContent
        })
    });
});

//评论提交
router.post('/main/discussSave', function (req, res) {
    //内容id
    var id = req.body.id;
    var discuss = {
        username: req.userInfo.username,
        date: new Date(),
        content: req.body.value
    };
    Content.findOne({_id:id}).then(function (content) {
        content.discuss.push(discuss);
        return content.save();
    }).then(function (content) {
        res.json(content.discuss);
    })
})
module.exports = router;