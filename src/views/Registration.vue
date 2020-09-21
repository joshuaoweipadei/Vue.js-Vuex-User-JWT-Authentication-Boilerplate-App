<template>
    <div>
        <div class="container">
            <div class="row mt-5">
                <div class="col-md-5 mx-auto">
                    <ValidationObserver v-slot="{handleSubmit}">
                        <form @submit.prevent="handleSubmit(onSubmit)">
                            <h2 class="mb-4">REGISTER</h2>
                            <ValidationProvider name="Firstname" rules="required|alpha" v-slot="{errors}">
                                <div class="form-group">
                                    <label>First Name</label>
                                    <input class="form-control" v-model="user.firstname" type="text">
                                    <span class="small">{{errors[0]}}</span>
                                </div>
                            </ValidationProvider>
                            <ValidationProvider name="Lastname" rules="required|alpha" v-slot="{errors}">
                                <div class="form-group">
                                    <label>Last Name</label>
                                    <input class="form-control" v-model="user.lastname"  type="text">
                                    <span class="small">{{errors[0]}}</span>
                                </div>
                            </ValidationProvider>
                            <ValidationProvider name="Email" rules="required|email" v-slot="{errors}">
                                <div class="form-group">
                                    <label>Email</label>
                                    <input class="form-control" v-model="user.email" type="text">
                                    <span class="small">{{ errors[0] }}</span>
                                </div>
                            </ValidationProvider> 
                            <ValidationProvider name="Password" rules="required" v-slot="{errors}">
                                <div class="form-group"> 
                                    <label>Password</label>
                                    <input class="form-control" v-model="user.password" type="password" >
                                    <span class="small">{{ errors[0] }}</span>
                                </div>
                            </ValidationProvider> 
                            <div class="mt-4">
                                <button type="submit" :disabled="status.registering" class="btn btn-success">Create</button> 
                            </div>
                            <div class="mt-4">
                                Already have an account?  <router-link to="login">Login</router-link>
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
import { mapState, mapActions } from 'vuex'

export default {
    data: () => {
        return {
            user: {
                firstname: '',
                lastname: '',
                email: '',
                password: ''
            },
            submitted: false
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
            register: 'account/register',
            clearAlert: 'alert/clear'
        }),
        onSubmit(){
            this.register(this.user)
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