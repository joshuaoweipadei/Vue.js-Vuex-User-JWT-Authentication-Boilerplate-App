<template>
    <div>
        <div class="container">
            <div class="row mt-5">
                <div class="col-md-12 text-center">
                    <div v-if="status.verifying">Verifying. . .</div>
                    <div v-if="status.verified">{{status.data}}</div>
                    <div v-if="status.verificationFailed">{{status.error}}</div>
                    <a href="/login">Return to login page</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    created(){
        const { token } = this.$router.currentRoute.query;
        if(token){
            // remove email and token from url to prevent http referre leakage
            this.$router.replace(this.$router.currentRoute.path);

            // Verify the email and token from the url query string
            this.verifyEmail(token);
        } else{
            this.$router.push('/login');
        }
    },
    computed: {
        ...mapState({ 
            status: state => state.account.status,
        })
    },
    methods: {
        ...mapActions({
            verifyEmail: 'account/verifyEmail',
        }),
    }
}
</script>