/**
 * Created by hasee-pc on 2017/1/1.
 */
//加载express
var express = require('express');
//加载mysql
var mysql = require('mysql');

var blog = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'zhihuiyuan999',
    database: 'zcjl'
})
blog.connect();
blog.query('select * from si_users', function (err, rows, fileds) {
    console.log(rows);
})