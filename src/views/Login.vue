<template>
    <div>
        <div class="container">
            <div class="row mt-5">
                <div class="col-md-4 mx-auto">
                    <ValidationObserver v-slot="{handleSubmit}">
                        <form @submit.prevent="handleSubmit(onSubmit)">
                            <h4 class="mb-4">Welcome back, please login</h4>
                            <ValidationProvider name="Email" rules="required|email" v-slot="{errors}">
                                <div class="form-group">
                                    <label>Email</label>
                                    <input class="form-control" v-model="email" type="text">
                                    <span class="small">{{ errors[0] }}</span>
                                </div>
                            </ValidationProvider> 
                            <ValidationProvider name="Password" rules="required" v-slot="{errors}">
                                <div class="form-group"> 
                                    <label>Password</label>
                                    <input class="form-control" v-model="password" type="text" >
                                    <span class="small">{{ errors[0] }}</span>
                                </div>
                            </ValidationProvider> 
                            <div class="mt-4 mb-4">
                                <button type="submit" :disabled="status.loggingIn" class="btn btn-primary btn-block">Login</button> 
                            </div>
                            <div v-if="alert.message" :class="`alert ${alert.type}`" v-on:click="clearAlert">{{alert.message}}</div>

                            <div class="mt-4">
                                Don't have an account, <router-link to="register">Create one</router-link>?
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
            password: ''
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
            login: 'account/login',
            clearAlert: 'alert/clear'
        }),
        onSubmit(){
            const { email, password } = this;
            this.login({ email, password });
        }
    }
}
</script>

<style scoped>
    .small {
        display: block;
        color: #ff0000;
    }
</style>