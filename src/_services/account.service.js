import { handleResponse, authHeader } from '../_helpers';
import router from "../router";

export const accountService = {
    register,
    login,
    logout,
    verifyEmail,
    getAll,
    deleteUser,
    forgotPassword,
    verifyResetToken,
    resetPassword
}

function register(user){
    const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user),
    }
    return fetch(`${process.env.VUE_APP_ROOT_API}/account/register`, requestOptions).then(handleResponse);
}

function login(email, password){
    const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email, password }),
    }
    return fetch(`${process.env.VUE_APP_ROOT_API}/account/login`, requestOptions).then(handleResponse)
        .then((user) => {
            if(user.token){
                localStorage.setItem("user", JSON.stringify(user));
            }
            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("user");
}

function verifyEmail(token){
    const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ token }),
    }
    return fetch(`${process.env.VUE_APP_ROOT_API}/account/verify-email`, requestOptions).then(handleResponse);
}

function getAll(){
    const requestOptions = {
        methdo: "GET",
        headers: {...authHeader()}
    }
    return fetch(`${process.env.VUE_APP_ROOT_API}/account/users`, requestOptions).then(handleResponse);
}

function deleteUser(id){
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(`${process.env.VUE_APP_ROOT_API}/account/${id}`, requestOptions).then(handleResponse)
        .then(() => {
            let user = JSON.parse(localStorage.getItem("user"));
            if(id === user.id){
                logout();
                router.push('./login');
            }
            return id;
        });
}

function forgotPassword(email){
    const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email }),
    }
    return fetch(`${process.env.VUE_APP_ROOT_API}/account/forgot-password`, requestOptions).then(handleResponse);
}

function verifyResetToken(email, token){
    const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email, token }),
    }
    return fetch(`${process.env.VUE_APP_ROOT_API}/account/verify-reset-password-email-token`, requestOptions).then(handleResponse);
}

function resetPassword(email, token, password){
    const requestOptions = {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email, token, password }),
    }
    return fetch(`${process.env.VUE_APP_ROOT_API}/account/reset-password`, requestOptions).then(handleResponse);
}