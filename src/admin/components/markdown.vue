<template>
<div id="markdown">
    <markdownText v-for="(item, index) of items" :key="item.sub" v-bind:num="index" v-on:add="add" v-on:del="del" :msg="item.content"></markdownText>
</div>
</template>
<style lang="less">
* {
    -webkit-user-select: auto;
}
#markdown {
    width: 90%;
    margin: 2.5rem auto;
    border: 1px solid #000;
    border-radius: 0.5rem;
    overflow: hidden;
    p {
        margin: 0;
        padding: 0.2rem;
        color: #fff;
    }
    .m-text {
        width: 100%;
        padding-left: 0.5rem;
        background: #2D2D2D;
        -webkit-user-select: text;
        position: relative;
        border-bottom: 1px solid #ccc;
        outline: 0;
    }
}
</style>
<script>
import markdownText from './markdownText.vue';
export default {
    data() {
        return {
            items: [
                {
                    'sub': 0,
                    'content': ''
                }
            ],
            index: 0,
            now: null,
            state: ''
        }
    },
    components: {
        markdownText
    },
    methods: {
        add(ev) {
            // 获取焦点之后的文本
            let se = window.getSelection(),
                str = '';
            if(se.anchorNode.data){
                str = se.anchorNode.data;
            };
            // 移除焦点
            ev.target.blur();
            // 去除换行符
            ev.target.innerHTML = ev.target.innerHTML.replace(/<br>/, '');
            // 拥有contenteditable属性的标签在换行时会新增一个DOM节点,所以需要移除
            $(ev.target).children().remove();
            // 获取当前组件在数组中的位置
            const num = Number($(ev.target).attr('index'));
            this.index += 1;
            this.items.splice(num + 1, 0, {'sub': this.index, 'content': str});
            this.now = ev.target;
            this.state = 'add';
        },
        del ([el, val]) {
            // 参数的获取使用了ES6的解构赋值
            if(val){
                this.now = $(el).prev().get(0);
                this.items.splice(val, 1);
                this.state = 'del';
            }
        },
        focus([el, loca=el.childNodes.length]) {
            let sel, range;
            // 获取要获得焦点的节点
            // let el = $(this.now).next().get(0);
            // console.log($(this.now).attr('index'))
            // 兼容性处理
            if (window.getSelection && document.createRange) {
                // 创建一个range对象
                let range = document.createRange();
                // console.log(el)
                // 设置range范围为 el
                range.selectNodeContents(el);
                // 设置range范围的开始位置和结束位置在同一位置
                range.collapse(true);
                // 设置结束点
                range.setEnd(el, loca);
                // 设置开始点
                range.setStart(el, loca);
                // console.log(range)
                // 获取selection对象
                let sel = window.getSelection();
                // console.log (sel)
                // 移除所有的range对象
                sel.removeAllRanges();
                // 添加自己设置的range对象
                sel.addRange(range);
                // console.log(sel)
                // 兼容ie9以下
            } else if (document.body.createTextRange) {
                range = document.body.createTextRange();
                range.moveToElementText(el);
                range.collapse(true);
                range.select();
            }
        }
    },
    updated() {
        this.state === 'add' ? this.focus([$(this.now).next().get(0), 0]) : this.focus([this.now]);
    }
}
</script>
