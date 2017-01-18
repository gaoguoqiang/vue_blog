/**
 * Created by Administrator on 2017/1/9 0009.
 */
var filter = {
    time: function (value) {
        var time = new Date(value),
            year = time.getFullYear(),
            month = time.getMonth()+1,
            date = time.getDate(),
            hours = time.getHours(),
            min = time.getMinutes(),
            seconds = time.getSeconds();
        var str = year + '年' + month + '月' + date + '日 ' + hours + ':' + min + ':' + seconds;
        return str;
    }
}
module.exports = filter;