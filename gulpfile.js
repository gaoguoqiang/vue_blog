/**
 * Created by Administrator on 2017/1/9 0009.
 */
var gulp = require('gulp');
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');
var named = require('vinyl-named');
var browserSync = require('browser-sync');
var vinyl = require('vinyl');

gulp.task('bundle', function () {
    gulp.src('./src/app/main.js')
        .pipe(named())
        .pipe(webpack({
            entry: {
                main: './src/app/main.js',
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
            console.log(data)
        }))
});
// gulp.task('uglify', function () {
//     gulp.src('./public/app/js/main.js')
//         .pipe(uglify())
//         .pipe(gulp.dest('./public/app/js/dest/'))
// })
gulp.task('browserSync', function () {
    browserSync.init({
        proxy: "127.0.0.1:8080"
    })
});
gulp.task('default', ['browserSync', 'bundle'], function () {
    gulp.watch(['./view/main/index.html', './src/components/*', './src/*'],['bundle']);
    gulp.watch('./public/app/js/main.js',browserSync.reload);
})