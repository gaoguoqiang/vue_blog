<template>
    <div class="card">
        <div class="card-content">
            <div class="card-content-inner">
                <table class="users-list" border='1'>
                    <tr>
                        <th>用户名</th>
                        <th>管理员</th>
                    </tr>
                    <tr v-for="data in users">
                        <td>{{data.username}}</td>
                        <td>{{data.isAdmin?'是':'否'}}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>
<style lang="less">
.users-list {
    width: 100%;
    td {
        text-align: center;
    }
}
</style>
<script>
export default {
    data: function() {
        return {
            users: {}
        }
    },
    methods: {
        getData() {
            let _this = this;
            $.ajax({
                type: 'post',
                url: '/api/user/usersList',
                success(data) {
                    _this.users = data.users;
                }
            })
        }
    },
    created() {
        this.getData()
    }
}
</script>
