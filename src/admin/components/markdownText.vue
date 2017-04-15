<template>
    <p @keyup.enter="add" contenteditable="true" class="m-text"></p>
</template>
<style lang="less">
</style>
<script>
    export default {
       data () {
           return {
        
           }
       },
       methods: {
           add (ev) {
               //触发add事件
               this.$emit('add',ev)
           }
       }
    }
</script>
