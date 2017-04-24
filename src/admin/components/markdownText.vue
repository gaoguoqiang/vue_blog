<template>
    <p @keyup.enter="add" @keyup.delete="del" contenteditable="true" class="m-text" :index="num">{{text}}</p>

</template>
<style lang="less">
</style>
<script>
    export default {
       data () {
           return {
               text: this.msg,
               counter: 0
           }
       },
       props: [
           'num',
           'msg'
        ],
       methods: {
           add (ev) {
               //触发add事件
               this.$emit('add',ev)
           },
           del (ev) {
               // 当前行内无内容时触发事件销毁组件
               // 第一次监听到内容为空时，不删除，需保留焦点，等待用户输入
               // 第二次监听到内容为空时，删除
               if(!ev.target.innerText){
                   this.counter += 1;
               };
               if(this.counter === 2){
                   this.$emit('del', [ev.target, this.num]);
               }
           }
       }
    }
</script>
