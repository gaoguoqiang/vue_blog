/**
 * Created by hasee-pc on 2016/10/15.
 */

var express = require('express');
var router = express.Router();
var Category = require('../models/category');
var Content = require('../models/Content');
var Markdown = require('markdown').markdown;
var Marked = require('marked');
/*
* 验证登录用户身份
* */
router.use(function (req, res, next) {
    if(!req.userInfo.isAdmin){
        res.send('对不起，你不是管理员');
        return;
    }
    next();
});
/*
* 首页
* */
router.get('/', function (req, res, next) {
    res.render('./admin/index', {
        userInfo: req.userInfo
    });
});
/*
* 用户管理
* */
router.get('/user', function (req, res, next) {
    res.render('./admin/user_index', {
        userInfo: req.userInfo
    })
});
/*
* 分类首页
* */
router.get('/category', function (req, res) {
    res.render('./admin/category_index', {
        userInfo: req.userInfo
    })
});
/*
* 分类添加
* */
router.get('/category/add', function (req, res) {
    res.render('./admin/category_add', {
        userInfo: req.userInfo
    })
});
/*
* 分类的保存
* */
router.post('/category/add', function (req, res) {
    var name = req.body.name || '';

    if(name == ''){
        res.render('./admin/error', {
            userInfo: req.userInfo,
            message: '分类名称不能为空'
        });
        return;
    }
    Category.findOne({
        name: name
    }).then(function (rs) {
        if(rs){
            res.render('./admin/error', {
                userInfo: req.userInfo,
                message: '分类名称已存在'
            });
            return Promise.reject();
        }
        return new Category({
            name: name
        }).save();
    }).then(function (newCategory) {
        res.render('./admin/success', {
            userInfo: req.userInfo,
            message: '分类添加成功',
            url: '/admin/category'
        })
    });
});
/*
 * 分类修改
 * */
router.get('/category/edit', function (req, res) {
    var id = req.query.id || '';
    var name = req.query.name || '';

    Category.findOne({
        _id: id
    }).then(function (category) {
        if(!category){
            res.render('./admin/error', {
                userInfo: req.userInfo,
                message: '分类信息不存在'
            })
        }else{
            //当用户没有做任何修改的时候
            if(name == category.name){
                res.render('./admin/success', {
                    userInfo: req.userInfo,
                    message: '分类名称修改成功',
                    url: '/admin/category'
                })
            }else{
                //要修改的分类名称是否已经在数据库中存在
                Category.findOne({
                    _id: {$ne: id},
                    name: name
                }).then(function (sameCategory) {
                    if(sameCategory){
                        res.render('./admin/error', {
                            userInfo: req.userInfo,
                            message: '分类名称已存在'
                        })
                    }else{
                        Category.update({
                            _id: id
                        },{
                            name: name
                        }).then(function () {
                            res.render('./admin/success', {
                                userInfo: req.userInfo,
                                message: '分类名称修改成功',
                                url: '/admin/category'
                            })
                        })
                    }
                })
            }

        }
    })

});
/*
 * 分类删除
 * */
router.get('/category/remove', function (req, res) {
    var id = req.query.id || '';
    if(id == '') {
        res.render('./admin/error', {
            userInfo: req.userInfo,
            message: '分类信息不存在'
        })
    }else{
        Category.findOne({
            _id: id
        }).then(function (Category) {
            if(!Category){
                res.render('./admin/error', {
                    userInfo: req.userInfo,
                    message: '分类信息不存在'
                })
            }else{
                Category.remove({
                    _id: id
                }).then(function (removeCategory) {
                    if(removeCategory){
                        res.render('./admin/success', {
                            userInfo: req.userInfo,
                            message: '分类信息删除成功',
                            url: '/admin/category'
                        })
                    }
                })
            }
        })
    }
});
/*
* 内容首页
* */
router.get('/content', function (req, res) {
    res.render('./admin/content_index', {
        userInfo: req.userInfo
    })
});
/*
 * 内容添加
 * */
router.get('/content/add', function (req, res) {
    Category.find().sort({_id: -1}).then(function (categories) {
        res.render('./admin/content_add', {
            userInfo: req.userInfo,
            categories: categories
        })
    })

});
/*
 * 内容保存
 * */
router.post('/content/add', function (req, res) {
    if(req.body.category == ''){
        res.render('./admin/error', {
            userInfo: req.userInfo,
            message: '分类不能为空'
        })
        return;
    }
    if(req.body.title == ''){
        res.render('./admin/error', {
            userInfo: req.userInfo,
            message: '标题不能为空'
        })
        return;
    }
    new Content({
        category: req.body.category,
        title: req.body.title,
        user: req.userInfo.id,
        description: req.body.description,
        content: req.body.content
    }).save().then(function (rs) {
        res.render('./admin/success', {
            userInfo: req.userInfo,
            message: '内容保存成功',
            url: '/admin/content'
        })
    })
});
/*
* 内容修改
* */
router.get('/content/edit', function (req, res) {
    var id = req.query.id || '';

    if(id == ''){
        res.render('./admin/error', {
            userInfo: req.userInfo,
            message: '内容信息不存在'
        })
        return;
    }
    Category.find().sort({_id: -1}).then(function (categories) {
        Content.findOne({
            _id: id
        }).populate('category').then(function (content) {
            if(!content){
                res.render('./admin/error', {
                    userInfo: req.userInfo,
                    message: '内容信息不存在'
                })
            }else{
                res.render('./admin/content_edit', {
                    userInfo: req.userInfo,
                    content: content,
                    categories: categories
                })
            }
        })
    })

});
/*
 * 保存内容修改
 * */
router.post('/content/edit', function (req, res) {
    var id = req.query.id || '';
    if(req.body.category == ''){
        res.render('./admin/error', {
            userInfo: req.userInfo,
            message: '分类不能为空'
        })
        return;
    }
    if(req.body.title == ''){
        res.render('./admin/error', {
            userInfo: req.userInfo,
            message: '标题不能为空'
        })
        return;
    }
    Content.update({
        _id: id
    },{
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        content: req.body.content
    }).then(function (rs) {
        if(!rs){
            res.render('./admin/error', {
                userInfo: req.userInfo,
                message: '内容修改失败'
            })
        }else{
            res.render('./admin/success', {
                userInfo: req.userInfo,
                message: '内容修改保存成功',
                url: '/admin/content'
            })
        }
    })
});
router.get('/content/delet', function (req, res) {
    var id = req.query.id || '';
    if(id == ''){
        res.render('./admin/error', {
            userInfo: req.userInfo,
            message: '内容信息不存在'
        })
        return;
    }
    Content.remove({
        _id: id
    }).then(function (rs) {
        if(!rs){
            res.render('./admin/error', {
                userInfo: req.userInfo,
                message: '内容删除失败'
            })
        }else{
            res.render('./admin/success', {
                userInfo: req.userInfo,
                message: '内容删除成功',
                url: '/admin/content'
            })
        }
    })
})

module.exports = router;