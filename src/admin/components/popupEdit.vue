<template>
    <div class="popup edit">
        <div class="content-block">
            <p>修改分类名称</p>
            <input class="edit-category-name" type="text" autofocus v-model="name">
            <div class="row edit-btn">
                <span class="col-50 button button-fill button-danger close-popup">取消</span>
                <span class="col-50 button button-fill button-success" @click="update">提交</span>
            </div>
        </div>
    </div>
</template>
<style lang="less">
.edit-category-name {
    display: block;
    margin: 0 auto;
    border: 1px solid #666;
    border-radius: .2rem;
    text-indent: .2rem;
}

.edit-btn {
    margin-top: .5rem;
    span {
        margin-top: .3rem;
    }
}
</style>
<script>
import bus from "../bus.js";
export default {
    data () {
        return {
            name: '',
            msg: ''
        }
    },
    methods: {
        update () {
            let _this = this;
            //判断用户是否输入
            if(_this.name == ''){
                _this.msg = '名称不能为空！';
                $.toast(_this.msg);
                return;
            }
            $.ajax({
                type: 'get',
                url: '/api/admin/categoryEdit?id=' + _this.id + '&name=' + _this.name,
                success (data) {
                    _this.msg = data;
                    $.toast(_this.msg);
                    if(_this.msg == '分类修改成功！'){
                        //刷新当前页面
                        location.reload();
                    };
                }
            })
        }
    },
    created () {
        let _this = this;
        //接收category组件传来的数据
        bus.$on('setId', function (id) {
            _this.id = id;
        });
    }
}
</script>
