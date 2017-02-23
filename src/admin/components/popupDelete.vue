<template>
    <div class="popup delete">
        <div class="content-block">
            <p>删除该分类</p>
            <p>如果您删除该分类，将会删除该分类下的 {{number}} 篇文章！请您做好数据备份！</p>
            <div class="row edit-btn">
                <span class="col-50 button button-fill button-danger close-popup">取消</span>
                <span class="col-50 button button-fill button-success" @click="update">提交</span>
            </div>
        </div>
    </div>
</template>
<style lang="less">
    .edit-category-name{
        display: block;
        margin: 0 auto;
        border: 1px solid #666;
        border-radius: .2rem;
        text-indent: .2rem;
    }
    .edit-btn{
        margin-top: .5rem;
        span{
            margin-top: .3rem;
        }
    }
</style>
<script>
    export default {
        props:['id'],
        data () {
            return{
                number: null
            }
        },
        methods: {
            update () {
                let _this = this;
                $.ajax({
                    type: 'get',
                    url: '/api/admin/categoryEdit?id='+_this.id+'&'+_this.name,
                    success (data) {
                        console.log(data)
                    }
                })
            }
        },
        created () {
            //this.getData()
        }
    }
</script>
