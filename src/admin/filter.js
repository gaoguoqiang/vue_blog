/**
 * Created by Administrator on 2017/1/9 0009.
 */
let filter = {
    time: function (value) {
        let time = new Date(value),
            year = time.getFullYear(),
            month = time.getMonth()+1,
            date = time.getDate(),
            hours = time.getHours(),
            min = time.getMinutes(),
            seconds = time.getSeconds();
        let str = year + '年' + month + '月' + date + '日 ' + hours + ':' + min + ':' + seconds;
        return str;
    }
}
export default filter;