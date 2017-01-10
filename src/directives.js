/**
 * Created by Administrator on 2017/1/10 0010.
 */

var directive = {
    scroll: {
        bind: function (el, binding) {
            document.addEventListener('touchmove', function () {
                //浏览器可视区高度
                var windowH = document.documentElement.clientHeight;
                //内容区高度
                var elH = el.offsetHeight+el.offsetTop;
                //滚动距离
                var scrollH = el.parentNode.scrollTop;
                if(scrollH + windowH - el.parentNode.offsetTop > elH){
                    console.log(1)
                }
            })
        }
    }
};

module.exports = directive;