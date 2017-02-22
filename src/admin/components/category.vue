<template>
    <div>
        <div v-for="data in categories" class="card">
            <div class="card-header">分类名称：</div>
            <div class="card-content">
                <div class="card-content-inner">
                    <h3 class="category-name">{{data.name}}</h3>
                </div>
            </div>
            <div class="card-footer">
                <span class="button button-fill button-danger">删除</span>
                <a href="javascript:;" class="button button-fill open-popup" data-popup=".edit">修改</a>
            </div>
        </div>
        <div class="card end">
            <div class="card-content">
                <div class="card-content-inner">
                    <h3 class="button button-fill button-success">添加</h3>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less">
    .category-name{
        text-align: center;
    }
    .end{
        margin-bottom: .5rem;
    }
</style>
<script>
    //import popup from './popup_edit.vue'
    export default {
        data () {
            return{
                categories: {}
            }
        },
        methods: {
            getData () {
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
            this.getData()
        }
    }
</script>
