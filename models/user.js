/**
 * Created by hasee-pc on 2016/10/15.
 */

var mongoose = require('mongoose');
var usersSchema = require('../schemas/users');

module.exports = mongoose.model('User', usersSchema);



