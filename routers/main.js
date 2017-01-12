/**
 * Created by hasee-pc on 2016/10/15.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    //console.log(req.userInfo)
    // res.render('./main/index', {
    //     userInfo: req.userInfo
    // });
    res.render('main/index')
});
module.exports = router;