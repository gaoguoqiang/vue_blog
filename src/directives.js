/**
 * Created by Administrator on 2017/1/10 0010.
 */

var directive = {
    scroll: {
        bind: function (el, binding) {
            document.addEventListener('touchmove', function () {
                var windowH = document.documentElement.clientHeight;
                var elH = el.offsetHeight;
                var windowSH = document.body.scrollTop;
                console.log(el.offsetTop)
                if(windowSH + windowH > elH){
                    console.log(windowSH + windowH)
                }
            })
        }
    }
};

module.exports = directive;