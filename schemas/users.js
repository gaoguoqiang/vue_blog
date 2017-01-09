/**
 * Created by hasee-pc on 2016/10/15.
 */

var mongoose = require('mongoose');

//用户表结构
module.exports = new mongoose.Schema({
    //用户名
    username: String,
    //密码
    password: String,
    //管理员用户
    isAdmin: {
        type: Boolean,
        default: false
    }
});

