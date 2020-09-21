import { accountService } from '../_services'

const state = {
    all: {}
}

const actions = {
    // Get all users action
    getAll({ dispatch, commit }){
        commit('getAllRequest');
        accountService.getAll()
            .then((users) => {
                commit('getAllSuccess', users);
            }).catch((error) => {
                commit('getAllFailed', error);
                dispatch('alert/error', error, { root: true });
            });
    },

    deleteUser({ commit }, id){
        commit('deleteUserRequest', id);
        accountService.deleteUser(id)
            .then((user) => {
                commit('deleteUserSuccess', id);
            }).catch((error) => {
                commit('deleteUserFailed', { id, error: error.toString() });
            });
    }
}

const mutations = {
    // Get all users mutation logic
    getAllRequest(state){
        state.all = { loading: true }
    },
    getAllSuccess(state, users){
        state.all = { items: users }
    },
    getAllFailed(state, error){
        state.all = { error }
    },

    // Delete mutation logic
    deleteUserRequest(state, id){
        // add 'deleting: true' property to the user object
        state.all.items = state.all.items.map(user => user.id === id ? { ...user, deleting: true } : user);
    },
    deleteUserSuccess(state, id){
        // remove user from the user state
        state.all.items = state.all.items.filter(user => user.id !== id);
    },
    deleteUserFailed(state, { id, error }){
        state.all.items = state.all.items.map(user => {
            if(user.id === id){
                // make copy of user without 'deleteing: true' property
                const { deleting, ...userCopy } = user;
                // return copy of user with 'deleteError: [error]' property
                return { ...userCopy, deleteError: error };
            }
            return user;
        })
    }
}

export const users = {
    namespaced: true,
    state,
    actions,
    mutations
}