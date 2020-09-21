<template>
<div class="container">
    <div class="row mt-5">
        <div class="col-md-12">
            <h2 class="text-capitalize">Welcome come to your dashboard, {{user.firstname}} {{user.lastname}}</h2>
            <div class="d-flex justify-content-between align-items-center">
                <h5>You are now logged in.</h5>
                <a class="btn btn-primary text-white logout" v-on:click="logoutUser">Logout</a>
            </div>

            <div v-if="users.loading" class="text-center"> Loading... </div>

            <span v-if="users.error" class="text-danger">ERROR: {{users.error}}</span>

            <p class="text-center mt-4">Users account list</p>
            <ul v-if="users.items" class="list-group">
                <li v-for="user in users.items" :key="user.id" class="list-group-item text-capitalize">
                    {{user.firstname + ' ' + user.lastname}}
                    <span v-if="user.deleting"><em> - Deleting...</em></span>
                    <span v-else-if="user.deleteError" class="text-danger"> - ERROR: {{user.deleteError}}</span>
                    <span v-else> - <a @click="handleDeleteUser(user.id)" class="text-danger text-right">Delete</a></span>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    created(){
        this.getAllUsers()
    },
    computed: {
        ...mapState({
            user: state => state.account.user,
            users: state => state.users.all
        }),
    },
    methods: {
        ...mapActions({
            getAllUsers: 'users/getAll',
            deleteUser: 'users/deleteUser',
            logout: 'account/logout',
        }),
        handleDeleteUser(id){
            this.deleteUser(id)
        },
        logoutUser(){
            this.logout();
        },
    }
}
</script>

<style scoped>
.logout{
    cursor: pointer;

}
</style>