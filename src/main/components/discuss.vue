<template>
    <div>
        <ul id="discuss">
            <li v-for="data in discuss">
                <div>{{data.username}}</div>
                <p>{{data.content}}</p>
            </li>
        </ul>
        <save v-on:update="getData"></save>
    </div>
</template>
<style lang="less">
    ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    #discuss{
        li{
            border-bottom: 1px solid #ccc;
            padding: .5rem .3rem 0;
        }
        div{
            color: #2b92d4;
        }
        p{
            margin: 0;
            padding: .2rem 1rem;
        }
    }
</style>
<script>
    var save = require('./discussSave.vue');
module.exports = {
    data: function () {
        return {
            id: this.$route.params.id,
            discuss: []
        }
    },
    components: {
        save
    },
    methods: {
        getData: function () {
            var _this = this;
            $.ajax({
                type: 'post',
                url: '/api/main/particular',
                data: {id:_this.id},
                success: function (data) {
                    _this.discuss = data.content.discuss;
                }
            })
        }
    },
    created: function () {
        //初始化数据
        this.getData();
    }
}
</script>
