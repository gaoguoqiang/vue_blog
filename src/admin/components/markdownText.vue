<template>
    <p @keyup.enter="add" @keyup.delete="del" contenteditable="true" class="m-text" :index="num">{{text}}</p>
    
</template>
<style lang="less">
</style>
<script>
    export default {
       data () {
           return {
               text:'123',
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
               if(!ev.target.innerText){
                   this.counter += 1;
               };
               if(this.counter === 2){
                //    console.log(ev.target)
                   this.$emit('del', [ev.target, this.num]);
               }
           }
       }
    }
</script>
