/**
 * Created by hasee-pc on 2016/10/15.
 */

var mongoose = require('mongoose');

//用户表结构
module.exports = new mongoose.Schema({
    //关联字段 - 内容分类的ID
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    //内容标题
    title: String,
    //关联字段 - 用户的ID
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //添加时间
    addTime: {
        type: Date,
        default: new Date()
    },
    //阅读量
    views: {
        type: Number,
        default: 0
    },
    //内容简介
    description: {
        type: String,
        default: ''
    },
    //内容
    content: {
        type: String,
        default: ''
    },
    //评论
    discuss: {
        type: Array,
        default: []
    }
});

