import router from "../router";
import { accountService } from '../_services'

const user = JSON.parse(localStorage.getItem("user"));

const state = user ? { status: { loggedIn: true }, user } : { status: {}, user: null }

const actions = {
    register({ dispatch, commit }, user){
        commit('registerRequest', user);
        accountService.register(user)
            .then((user) => {
                commit('registerSuccess', user);
                console.log(user);
                router.push('./login');
                setTimeout(() => {
                    // display success message after route change completes
                    dispatch('alert/success', `Registration successful, follow the confirmation link at [${user.email}] to verify your account`, { root: true });
                })
            }).catch((error) => {
                commit('registerFailure', error);
                dispatch('alert/info', error, { root: true });
            });
    },
    login({ dispatch, commit }, { email, password }){
        commit('loginRequest', { email });
        accountService.login(email, password)
            .then((user) => {
                commit('loginSuccess', user);
                router.push('/');
            }).catch((error) => {
                commit('loginFailure', error);
                dispatch('alert/error', error, { root: true });
            });
    },
    logout({ commit }) {
        accountService.logout();
        commit('logout');
        router.push('./login');
    },
};

const mutations = {
    registerRequest(state){
        state.status = { registering: true };
    },
    registerSuccess(state){
        state.status = {};
    },
    registerFailure(state){
        state.status = {};
    },
    loginRequest(state, user){
        state.status = { loggingIn: true },
        state.user = user;
    },
    loginSuccess(state, user){
        state.status = { loggedIn: true };
        state.user = user;
    },
    loginFailure(state){
        state.status = {};
        state.user = null;
    },
    logout(state){
        state.status = {};
        state.user = null;
    },
};

export const account = {
    namespaced: true,
    state,
    actions,
    mutations
}