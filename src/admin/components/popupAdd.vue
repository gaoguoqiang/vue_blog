<template>
    <div class="popup add">
        <div class="content-block">
            <p>添加分类</p>
            <input class="add-category-name" type="text" autofocus v-model="name">
            <div class="row add-btn">
                <span class="col-50 button button-fill button-danger close-popup">取消</span>
                <span class="col-50 button button-fill button-success" @click="add">提交</span>
            </div>
        </div>
    </div>
</template>
<style lang="less">
    .add-category-name{
        display: block;
        margin: 0 auto;
        border: 1px solid #666;
        border-radius: .2rem;
        text-indent: .2rem;
    }
    .add-btn{
        margin-top: .5rem;
        span{
            margin-top: .3rem;
        }
    }
</style>
<script>
    export default {
        data () {
            return{
                name: ''
            }
        },
        methods: {
            add () {
                let _this = this;
                if(_this.name == ''){
                    $.toast('分类名称不能为空！');
                }
                $.ajax({
                    type: 'get',
                    url: '/api/admin/categoryAdd',
                    data: {name: _this.name},
                    success (data) {
                        console.log(data);
                        $.toast(data);
                        if(data == '分类添加成功！'){
                            setTimeout(function () {
                                location.reload();
                            },2000);
                        }
                    }
                })
            }
        }
    }
</script>
