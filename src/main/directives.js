/**
 * Created by Administrator on 2017/1/10 0010.
 */

var directive = {
    scroll: {
        bind: function (el, binding) {
            var _this = this;
            //保证此指令在数据更新完毕之前只触发一次
            var onOff = true;
            document.addEventListener('touchmove', function () {
                //浏览器可视区高度
                var windowH = document.documentElement.clientHeight;
                //内容区高度
                var elH = el.offsetHeight+el.offsetTop;
                //滚动距离
                var scrollH = el.parentNode.scrollTop;
                if(scrollH + windowH - el.parentNode.offsetTop > elH){
                    var fn = binding.value;
                    if(onOff){
                        onOff = false;
                        //数据更新完毕后，通过回调函数，打开触发器，保证下一次的成功触发
                        fn(function () {
                            onOff = true
                        });
                    }
                }
            })
        }
    }
};

module.exports = directive;