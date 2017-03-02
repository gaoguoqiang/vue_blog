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
                <a @click="showEdit(data._id)" href="javascript:;" class="button button-fill button-danger open-popup" data-popup=".delete">删除</a>
                <a @click="showEdit(data._id)" href="javascript:;" class="button button-fill open-popup" data-popup=".edit">修改</a>
            </div>
        </div>
        <div class="card end">
            <div class="card-content">
                <div class="card-content-inner">
                    <h3 class="button button-fill button-success open-popup"  data-popup=".add">添加</h3>
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
    import bus from "../bus.js";
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
            },
            showEdit (id) {
                console.log(id);
                bus.$emit('setId',id)
            }
        },
        created () {
            //初始化组件时获取数据
            this.getData();
        }
    }
</script>
