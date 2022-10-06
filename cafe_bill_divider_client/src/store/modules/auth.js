import {AuthAPI} from "@/api/auth/auth";
import {DefaultAPIInstance} from "@/api";

export const AuthModule = {
    namespaced: true,

    state() {
        return {
            credentials: {
                token: localStorage.getItem('token') || null
            }
        }
    },
    getters: {
        getUserRole: (state) => state.credentials.role,
    },
    mutations: {
        setToken(state, token) {
            state.credentials.token = token;
            localStorage.setItem('token', token);
        },
        deleteToken(state) {
            state.credentials.token = null;
            localStorage.removeItem('token');
        }
    },
    actions: {
        onLogin({commit}, {username, password}) {
            AuthAPI.login(username, password).then((response) => {
                const token = response.data['auth_token']
                commit('setToken', token)
                DefaultAPIInstance.defaults.headers['Authorization'] = `Token ${token}`
            })
        },
        onLogout({commit}) {
            AuthAPI.logout().then(() => {
                commit('deleteToken')
                delete DefaultAPIInstance.defaults.headers['Authorization'];
            })
        },
    }
}