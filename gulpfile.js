/**
 * Created by Administrator on 2017/1/9 0009.
 */
var gulp = require('gulp');
var webpack = require('gulp-webpack');
var named = require('vinyl-named');
var browserSync = require('browser-sync');

gulp.task('bundle', function () {
    gulp.src('./src/main.js')
        .pipe(named())
        .pipe(webpack({
            module: {
                loaders:[
                    {test:/\.vue$/, loader:'vue-loader'}
                ]
            },
            resolve: {
                alias: {
                    'vue$': 'vue/dist/vue.common.js'
                }
            }
        }))
        .pipe(gulp.dest('./public/app/dist/'))
});
gulp.task('browserSync', function () {
    browserSync.init({
        proxy: "127.0.0.1:8080"
    })
});
gulp.task('default', ['browserSync', 'bundle'], function () {
    gulp.watch(['./view/main/index.html', './src/components/*', './src/App.vue', './src/main.js'],['bundle']);
    gulp.watch('./public/app/dist/main.js',browserSync.reload);
})