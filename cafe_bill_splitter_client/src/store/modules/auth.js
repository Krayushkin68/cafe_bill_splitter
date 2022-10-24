import {AuthAPI} from "@/api/auth/auth";
import {DefaultAPIInstance} from "@/api";

export const AuthModule = {
    namespaced: true,

    state() {
        return {
            credentials: {
                token: localStorage.getItem('token') || null
            },
            // eslint-disable-next-line no-prototype-builtins
            isAuthorized: localStorage.hasOwnProperty('token')
        }
    },
    getters: {
        getUserRole: (state) => state.credentials.role,
        getToken: (state) => state.credentials.token,
        isAuthorized: (state) => state.isAuthorized
    },
    mutations: {
        setToken(state, token) {
            state.credentials.token = token;
            state.isAuthorized = true;
            localStorage.setItem('token', token);
        },
        deleteToken(state) {
            state.credentials.token = null;
            state.isAuthorized = false;
            localStorage.removeItem('token');
        }
    },
    actions: {
        onLogin({commit}, {username, password}) {
            return new Promise((resolve, reject) => {
                AuthAPI
                    .login(username, password)
                    .then((response) => {
                        const token = response.data['auth_token']
                        commit('setToken', token)
                        DefaultAPIInstance.defaults.headers['Authorization'] = `Token ${token}`
                        resolve(response)
                    })
                    .catch((error) => {
                        commit('deleteToken')
                        reject(error)
                    })
            })

        },
        onLogout({commit}) {
            return new Promise((resolve, reject) => {
                commit('deleteToken')
                AuthAPI
                    .logout()
                    .then(() => {
                        delete DefaultAPIInstance.defaults.headers['Authorization'];
                        resolve()
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
    }
}