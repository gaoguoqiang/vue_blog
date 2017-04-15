<template>
<div id="markdown">
    <markdownText v-for="(item, index) of items" :key=item :index=index v-on:add="add"></markdownText>
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
            items: ['1'],
            index: 1,
            now: null
        }
    },
    components: {
        markdownText
    },
    methods: {
        add(ev) {
            // 移除焦点
            ev.target.blur();
            // 去除换行符
            ev.target.innerHTML = ev.target.innerHTML.replace(/<br>/, '');
            $(ev.target).children().remove();
            // 获取当前组件在数组中的位置
            const num = Number($(ev.target).attr('index'));
            this.index += 1;
            this.items.splice(num + 1, 0, this.index);
            this.now = ev.target;
        },
        focus() {
            let sel, range;
            // 获取要获得焦点的节点
            let el = $(this.now).next().get(0);
            // 兼容性处理
            if (window.getSelection && document.createRange) {
                // 创建一个range对象
                range = document.createRange();
                // 设置range范围为 el
                range.selectNodeContents(el);
                // 设置range范围的开始位置和结束位置在同一位置
                range.collapse(true);
                // 设置结束点
                range.setEnd(el, el.childNodes.length);
                // 设置开始点
                range.setStart(el, el.childNodes.length);
                // 获取selection对象
                sel = window.getSelection();
                // 移除所有的range对象
                sel.removeAllRanges();
                // 添加自己设置的range对象
                sel.addRange(range);
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
        this.focus();
    }
}
</script>
