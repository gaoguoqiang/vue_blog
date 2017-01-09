/**
 * Created by hasee-pc on 2016/10/15.
 */

var mongoose = require('mongoose');
var categoriesSchema = require('../schemas/categories');

module.exports = mongoose.model('Category', categoriesSchema);



