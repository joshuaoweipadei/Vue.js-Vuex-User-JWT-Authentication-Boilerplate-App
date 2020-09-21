<template>
<div>
    <router-view />
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'app',
    methods: {
        ...mapActions({
            clearAlert: 'alert/clear' 
        }),
    },
    watch: {
        $route (to, from){
            // clear alert on location change
            this.clearAlert();
        }
    }
};
</script>

<style>
*{
    margin: 0px;
    padding: 0px;
}
</style>