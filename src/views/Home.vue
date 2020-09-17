<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div>hello world</div>
    <a v-on:click="logoutUser">Logout</a>
     
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    methods: {
        ...mapActions({
            logout: 'account/logout',
        }),
        logoutUser(){
            this.logout();
        }
    }
}
</script>