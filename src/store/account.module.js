import router from "../router";
import { accountService } from '../_services'

const user = JSON.parse(localStorage.getItem("user"));

const state = user ? { status: { loggedIn: true }, user } : { status: {}, user: null }

const actions = {
    // register a user action
    register({ dispatch, commit }, user){
        commit('registerRequest', user);
        accountService.register(user)
            .then((user) => {
                commit('registerSuccess', user);
                router.push('./login');
                setTimeout(() => {
                    // display success message after route change completes
                    dispatch('alert/success', `Registration successful, follow the confirmation link at [${user.email}] to verify your account`, { root: true });
                })
            }).catch((error) => {
                commit('registerFailed', error);
                dispatch('alert/info', error, { root: true });
            });
    },

    // Login user action
    login({ dispatch, commit }, { email, password }){
        commit('loginRequest', { email });
        accountService.login(email, password)
            .then((user) => {
                commit('loginSuccess', user);
                router.push('/');
            }).catch((error) => {
                commit('loginFailed', error);
                dispatch('alert/error', error, { root: true });
            });
    },

    // Logout user action
    logout({ commit }){
        accountService.logout();
        commit('logout');
        router.push('./login');
    },

    // Verify email account
    verifyEmail({ commit }, token ){
        commit('verifyEmailRequest');
        accountService.verifyEmail(token)
            .then((data) => {
                commit('verifyEmailSuccess', data);
            }).catch((error) => {
                commit('verifyEmailFailed', error);
            });
    },

    // Forgot Password recovery action
    forgotPassword({ dispatch, commit }, email){
        commit('forgotPasswordRequest');
        accountService.forgotPassword(email)
            .then((user) => {
                commit('forgotPasswordSuccess', email);
                router.push('./login');
                setTimeout(() => {
                    // display success message after route change completes
                    dispatch('alert/success', `Please, follow the link at [${user.email}] to reset your new password`, { root: true });
                });
            }).catch((error) => {
                commit('forgotPasswordFailed', error);
                dispatch('alert/error', error, { root: true });
            });
    },

    // Verify email and token for reset password
    verifyResetToken({ dispatch, commit }, { email, token }){
        accountService.verifyResetToken(email, token)
            .then(() => {
                // do nothing because verification returns ok response
            }).catch((error) => {
                router.push('./login');
                setTimeout(() => {
                    // display success message after route change completes
                    dispatch('alert/warn', error, { root: true });
                });
            });
    },

    // Reset new password action
    resetPassword({ dispatch, commit }, { email, token, password }){
        commit('resetPasswordRequest');
        accountService.resetPassword(email, token, password)
            .then((data) => {
                commit('resetPasswordSuccess');
                router.push('./login');
                setTimeout(() => {
                    // display success message after route change completes
                    dispatch('alert/success', data, { root: true });
                });
            }).catch((error) => {
                commit('resetPasswordFailed');
                dispatch('alert/error', error, { root: true });
            });
    }
};

const mutations = {
    // Registration mutation logic
    registerRequest(state){
        state.status = { registering: true };
    },
    registerSuccess(state){
        state.status = {};
    },
    registerFailed(state){
        state.status = {};
    },

    // Login mutation logic
    loginRequest(state, user){
        state.status = { loggingIn: true },
        state.user = user;
    },
    loginSuccess(state, user){
        state.status = { loggedIn: true };
        state.user = user;
    },
    loginFailed(state){
        state.status = {};
        state.user = null;
    },

    // Logout mutation logic
    logout(state){
        state.status = {};
        state.user = null;
    },

    // Verify email account mutation logic
    verifyEmailRequest(state){
        state.status = { verifying: true };
    },
    verifyEmailSuccess(state, data){
        state.status = { verified: true, data };
    },
    verifyEmailFailed(state, error){
        state.status = { verificationFailed: true, error };
    },

    // Forgot Password mutation logic
    forgotPasswordRequest(state){
        state.status = { requesting: true };
    },
    forgotPasswordSuccess(state){
        state.status = {};
    },
    forgotPasswordFailed(state){
        state.status = {};
    },

    // Reset Password mutation logic
    resetPasswordRequest(state){
        state.status = { requesting: true };
    },
    resetPasswordSuccess(state){
        state.status = {};
    },
    resetPasswordFailed(state){
        state.status = {};
    },

};

export const account = {
    namespaced: true,
    state,
    actions,
    mutations
}