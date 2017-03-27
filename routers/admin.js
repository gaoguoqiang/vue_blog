/**
 * Created by hasee-pc on 2016/10/15.
 */

var express = require('express');
var router = express.Router();
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
    res.render('./admin/index');
});


module.exports = router;