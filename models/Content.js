/**
 * Created by hasee-pc on 2016/10/15.
 */

var mongoose = require('mongoose');
var ContentsSchema = require('../schemas/contents');

module.exports = mongoose.model('Content', ContentsSchema);



