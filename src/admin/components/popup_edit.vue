<template>
    <div class="popup edit">
        <div class="content-block">
            <p>修改分类名称</p>
            <input class="edit-category-name" type="text" autofocus v-model="name">
            <div class="row edit-btn">
                <span class="col-50 button button-fill button-danger close-popup">取消</span>
                <span class="col-50 button button-fill button-success">提交</span>
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
        props: [
            'id'
        ],
        data () {
            return{
                name: ''
            }
        },
        methods: {
            update () {
                let _this = this;
                $.ajax({
                    type: 'post',
                    url: '/api/category/categoryList',
                    success (data) {
                        _this.categories = data.categories;
                    }
                })
            }
        },
        created () {
            //this.getData()
        }
    }
</script>
