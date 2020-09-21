<template>
    <div>
        <div class="container">
            <div class="row mt-5">
                <div class="col-md-4 mx-auto">
                    <ValidationObserver v-slot="{handleSubmit}">
                        <form @submit.prevent="handleSubmit(onSubmit)">
                            <h4 class="mb-5 text-center">Forget Password</h4>
                            <ValidationProvider name="email address" rules="required|email" v-slot="{errors}">
                                <div class="form-group">
                                    <label>Enter email address</label>
                                    <input class="form-control" v-model="email" type="text">
                                    <span class="small">{{ errors[0] }}</span>
                                </div>
                            </ValidationProvider> 
                            <div class="mt-4 mb-4">
                                <button type="submit" :disabled="status.requesting" class="btn btn-primary btn-block">Forgot Password</button> 
                            </div>
                            <div v-if="alert.message" :class="`alert ${alert.type}`" v-on:click="clearAlert">{{alert.message}}</div>

                            <div class="mt-4">
                                <p class="forgot-password mb-1"><router-link to="login">Login</router-link></p>
                                <p class="forgot-password">Don't have an account, <router-link to="register">Create one</router-link>?</p>
                            </div>
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
    data: () => {
        return {
            email: '',
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
            forgotPassword: 'account/forgotPassword',
            clearAlert: 'alert/clear'
        }),
        onSubmit(){
            this.forgotPassword(this.email);
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