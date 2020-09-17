import { handleResponse, authHeader } from '../_helpers';

export const accountService = {
    register,
    login,
    logout
}

function register(user){
    const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user),
    }
    return fetch("http://localhost:9000/account/register", requestOptions).then(handleResponse);
}

function login(email, password){
    const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email, password }),
    }
    return fetch("http://localhost:9000/account/login", requestOptions).then(handleResponse)
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