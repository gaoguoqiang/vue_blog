/**
 * Created by Administrator on 2017/1/9 0009.
 */
var gulp = require('gulp');
var webpack = require('gulp-webpack');
var named = require('vinyl-named');
var browserSync = require('browser-sync');

gulp.task('bundle', function () {
    gulp.src('./src/main/main.js')
        .pipe(named())
        .pipe(webpack({
            entry: {
                main: './src/main/main.js',
                admin: './src/admin/main.js'
            },
            output: {
                filename: '[name].js'
            },
            module: {
                loaders:[
                    {test:/\.vue$/, loader:'vue-loader'},
                    {test: /\.less$/, loader: 'less-loader'}
                ]
            },
            resolve: {
                alias: {
                    'vue$': 'vue/dist/vue.common.js'
                }
            }
        }))
        .pipe(gulp.dest(function (data) {
            /*
            * data是一个vinyl对象，有属性path，值为文件的路径
            * 获取到文件名
            * 将其作为路径的一部分
            * */
            var name = /[a-z]+.js$/.exec(data.path)[0];
            var path = './public/'+name.split('.')[0]+'/js';
            return path
        }))
});
gulp.task('browserSync', function () {
    browserSync.init({
        proxy: "127.0.0.1:5000"
    })
});
gulp.task('default', ['browserSync', 'bundle'], function () {
    gulp.watch(['./view/**/*', './src/**/*'],['bundle']);
    gulp.watch('./public/**/*',browserSync.reload);
})