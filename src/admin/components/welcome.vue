<template>
    <div class="card">
        <div class="card-content">
            <div class="card-content-inner">
                <h1>Hello admin</h1>
                <h3>欢迎进入博客后台管理页面！！！</h3>
            </div>
        </div>
    </div>
</template>
<style lang="less">
    h1, h3{
        color: #21a1d0;
    }
    .card{
        margin-top: 3rem;
    }
</style>
<script>
    export default {
        data: function(){
            return{
                msg:'SAM-BLOG'
            }
        }
    }
</script>
