<template>
    <div>
        <div class="container">
            <div class="row mt-5">
                <div class="col-md-4 mx-auto">
                    <ValidationObserver v-slot="{handleSubmit}">
                        <form @submit.prevent="handleSubmit(onSubmit)">
                            <h4 class="mb-4 text-center">Reset New Password</h4>
                            <ValidationProvider name="new password" rules="required" vid="password" v-slot="{errors}">
                                <div class="form-group">
                                    <label>New Password</label>
                                    <input type="password" class="form-control" v-model="password" >
                                    <span class="small">{{ errors[0] }}</span>
                                </div>
                            </ValidationProvider> 
                            <ValidationProvider name="confirm password" rules="required|confirmed:password" v-slot="{errors}">
                                <div class="form-group"> 
                                    <label>Confirm Password</label>
                                    <input type="password" class="form-control" v-model="confirmation" >
                                    <span class="small">{{ errors[0] }}</span>
                                </div>
                            </ValidationProvider> 
                            <div class="mt-4 mb-4">
                                <button type="submit" :disabled="status.requesting" class="btn btn-primary btn-block">Reset Password</button> 
                            </div>
                            <div v-if="alert.message" :class="`alert ${alert.type}`" v-on:click="clearAlert">{{alert.message}}</div>
                        </form>
                    </ValidationObserver>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    created(){
        const { email, token } = this.$router.currentRoute.query;
        if(email && token){
            this.email = email;
            this.token = token;
            // remove email and token from url to prevent http referre leakage
            this.$router.replace(this.$router.currentRoute.path);

            // Verify the email and token from the url query string
            this.verifyResetToken({email, token});
        } else{
            this.$router.push('/login');
        }
    },
    data: () => {
        return {
            password: '',
            confirmation: '',
        }
    },
    computed: {
        ...mapState({ 
            status: state => state.account.status,
            alert: state => state.alert,
        })
    },
    methods: {
        ...mapActions({
            verifyResetToken: 'account/verifyResetToken',
            resetPassword: 'account/resetPassword',
            clearAlert: 'alert/clear'
        }),
        onSubmit(){
            const { email, token, password } = this;
            this.resetPassword({ email, token, password });
        }
    }
}
</script>

<style scoped>
    .small {
        display: block;
        color: #ff0000;
    }
    .forgot-password{
        font-size: 14px;
    }
</style>