/**
 * Created by hasee-pc on 2016/10/15.
 */

var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Category = require('../models/category');
var Content = require('../models/Content');
var Markdown = require('markdown').markdown;
var iconv = require('iconv-lite');
var qiniu = require('qiniu');
var moment = require('moment');

//初始化七牛秘钥
qiniu.conf.ACCESS_KEY = 'sTREiBQlF-juGQB0p6c_B2Er21obHQiBxFEAQmUW';
qiniu.conf.SECRET_KEY = 'gBGVWWF1Hv2d8vsmCUhIt1wf8JK06C3qb-6ktIEN';

//要上传的空间
var bucket = 'sam-ggq';



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
* 查询登录状态
* */
router.post('/user/status', function (req, res) {
    //把编码转换为字符串
    if(req.userInfo.username){
        var username = iconv.decode(new Buffer(req.userInfo.username.data), 'utf8');
    }else{
        var username = null;
    }
    res.json({
        isAdmin: req.userInfo.isAdmin,
        username: username
    });
})
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

    if(repassword == ''|| repassword != password){
        responseData.code = 3;
        responseData.message = '两次输入的密码不一致';
        res.json(responseData);
        return;
    }
    //用户名是否已经被注册了，如果数据库中已经存在和我们要注册的用户名相同的数据，表示用户名已经被注册了
    User.findOne({
        username:username
    }).then(function (userInfo) {
        // console.log(userInfo)
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
        //cookies中不能储存中文，需要转为编码格式
        var newUsername = iconv.encode(userInfo.username, 'utf8');
        req.cookies.set('userInfo', JSON.stringify({
            id:userInfo._id,
            username:newUsername
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
    User.find().then(function (users) {
        res.json({
            users: users,
        });
        return;
    })
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
    // var page = Number(req.query.page || 1);
    // var limit = 3;
    // var pages = 0;
    Category.count().then(function (count) {
        // pages = Math.ceil(count/limit);
        // page = Math.min(page, pages);
        // page = Math.max(page, 1);
        // var skip = (page-1) * limit;

        Category.find().sort({_id:-1}).then(function (categories) {
            res.json({
                categories: categories,
                count: count
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
        });
    });
});
/*
* 首页内容列表
* */
router.post('/main/contents', function (req, res) {
    var page = Number(req.query.page || 1);
    var categoryId = {};
    if(req.body.id){
        categoryId.category = req.body.id;
    }
    var limit = 3;
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
        username: iconv.decode(new Buffer(req.userInfo.username.data), 'utf8'),
        date: new Date(),
        content: req.body.value
    };
    Content.findOne({_id:id}).then(function (content) {
        content.discuss.push(discuss);
        return content.save();
    }).then(function (content) {
        res.json(content.discuss);
    })
});
//分类修改
router.get('/admin/categoryEdit', function (req, res) {
   var id = req.query.id || '';
   var name = req.query.name || '';
   var msg = '';
   console.log(name);
   Category.findOne({_id:id}).then(function (category) {
       //查询该分类是否存在与数据库中
       if(!category){
           msg = '该分类不存在！';
           res.json(msg);
       }else{
           //查询修改后的名字是否与当前名字相同
           if(name == category.name){
               msg = '分类修改成功！';
               res.json(msg);
           }else{
               //查询修改后的名字是否在数据库中有重复
               Category.findOne({
                   _id: {$ne:id},
                   name: name
               }).then(function (samecategory) {
                   if(samecategory){
                       msg = '该名称已存在！';
                       res.json(msg);
                   }else{
                       //更新数据
                       Category.update({
                           _id: id
                       },{
                           name: name
                       }).then(function () {
                           msg = '分类修改成功！';
                           res.json(msg);
                       })
                   }
               })
           }
       }
   })
});
//分类删除
router.get('/admin/categoryDelete', function (req, res) {
    var id = req.query.id || '';
    var msg = '';
    if(id == ''){
        msg = '分类信息不存在！';
        res.json(msg);
        return;
    }
    Category.findOne({_id:id}).then(function (category) {
        if(!category){
            msg = '分类信息不存在！';
            res.json(msg);
        }else{
            //删除该分类下的所有文章
            Content.remove({category: id}).then(function (rs) {
                if(!rs){
                    msg = '删除失败！';
                    res.json(msg);
                }else{
                    //删除分类
                    Category.remove({_id:id}).then(function (data) {
                        if(!data){
                            msg = '删除失败！';
                            res.json(msg);
                        }else{
                            msg = '删除成功！';
                            res.json(msg);
                        }
                    })
                }
            })
        }
    })
});
//分类添加
router.get('/admin/categoryAdd', function (req, res) {
    var name = req.query.name || '';
    var msg = '';
    if(name == ''){
        msg = '分类名称不能为空！';
        res.json(msg);
    }else{
        //查询名称是否被占用
        Category.findOne({name: name}).then(function (category) {
            if(category){
                msg = '分类已存在！';
                res.json(msg);
            }else{
                new Category({name: name}).save().then(function (newCategoyr) {
                    if(!newCategoyr){
                        msg = '分类添加失败！';
                        res.json(msg);
                    }else{
                        msg = '分类添加成功！';
                        res.json(msg);
                    }
                });
            }
        });
    }
});
//七牛token
router.get('/admin/token', function (req, res) {
    var myUptoken = new qiniu.rs.PutPolicy('sam-ggq');
    var token = myUptoken.token();
    // moment.locale('en');
    // var currentKey = moment(new Date()).format('YYYY-MM-DD--HH-mm-ss');
    res.header("Cache-Control", "max-age=0, private, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    if (token) {
        res.json({
            uptoken: token
        });
    }
});
//文章保存
router.post('/admin/contentSave', function (req, res) {

    var msg = '';

    new Content({
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        pic: req.body.pic || '',
        content: req.body.content,
        user: req.userInfo.id
    }).save().then(function (data) {
        msg = '文章保存成功'
        res.json(msg)
    })
});
//修改文章详情
router.post('/admin/showContent', function (req, res) {
   var id = req.body.id;
   console.log(id);
   Content.findOne({_id: id}).populate(['category']).then(function (content) {
       res.json(content)
   })
});
//文章修改保存
router.post('/admin/contentUpdate', function (req, res) {
    var msg = '';
    Content.findOne({_id:req.body.id}).then(function (content) {
        if(!content){
            msg = '文章不存在';
            res.json(msg);
            return;
        }else{
            if(req.body.pic == '' || req.body.pic == content.pic){
                //console.log('走了上面')
                Content.update({
                    _id: req.body.id
                },{
                    category: req.body.category,
                    title: req.body.title,
                    description: req.body.description,
                    content: req.body.content
                }).then(function (data) {
                    msg = '文章修改成功';
                    res.json(msg);
                    return;
                })
            }else{
                //console.log('走了下面')
                //构建bucketmanager对象
                var client = new qiniu.rs.Client();
                //你要测试的空间， 并且这个key在你空间中存在
                bucket = 'sam-ggq';
                var a = content.pic.split('/');
                //console.log(a)
                key = a[a.length-1];
                //console.log(key)
                //删除资源
                client.remove(bucket, key, function(err, ret) {
                    if (!err) {
                        Content.update({
                            _id: req.body.id
                        },{
                            category: req.body.category,
                            title: req.body.title,
                            description: req.body.description,
                            content: req.body.content,
                            pic: req.body.pic
                        }).then(function (data) {
                            msg = '文章修改成功';
                            res.json(msg);
                            return;
                        })
                    } else {
                        console.log(err);
                        Content.update({
                            _id: req.body.id
                        },{
                            category: req.body.category,
                            title: req.body.title,
                            description: req.body.description,
                            content: req.body.content,
                            pic: req.body.pic
                        }).then(function (data) {
                            msg = '文章修改成功,之前的图片删除失败,请手动删除';
                            res.json(msg);
                            return;
                        })
                    }
                });


            }
        }
    })
});
module.exports = router;