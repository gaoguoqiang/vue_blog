<template>
    <div class="popup delete">
        <div class="content-block">
            <p>删除该分类</p>
            <p>如果您删除该分类，将会删除该分类下的 {{number}} 篇文章！请您做好数据备份！</p>
            <div class="row delete-btn">
                <span class="col-50 button button-fill button-danger close-popup">取消</span>
                <span class="col-50 button button-fill button-success" @click="del">删除</span>
            </div>
        </div>
    </div>
</template>
<style lang="less">
    .delete-btn{
        margin-top: .5rem;
        span{
            margin-top: .3rem;
        }
    }
</style>
<script>
    import bus from '../bus.js';
    export default {
        data () {
            return{
                id: '',
                number: null,
                msg: ''
            }
        },
        methods: {
            del () {
                let _this = this;
                $.ajax({
                    type: 'get',
                    url: '/api/admin/categoryDelete?id='+_this.id,
                    success (data) {
                        console.log(data);
                        _this.msg = data;
                        if(_this.msg == '删除成功！'){
                            $.toast(_this.msg);
                            location.reload();
                        }
                    }
                })
            },
            getData () {
                let _this =this;
                $.ajax({
                    type: 'post',
                    url: '/api/main/contents',
                    data: {id:_this.id},
                    success (data) {
                        _this.number = data.count;
                    }
                })
            }
        },
        created () {
            let _this = this;
            //接收category组件传来的数据
            bus.$on('setId', function (id) {
                _this.id = id;
                //获取该分类下的文章总数
                _this.getData();
            });
        }
    }
</script>
