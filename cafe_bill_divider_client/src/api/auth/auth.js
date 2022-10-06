import {DefaultAPIInstance, LoginAPIInstance} from '@/api';

export const AuthAPI = {
    login(username, password) {
        const url = '/auth/token/login/'
        const data = {
            username: username,
            password: password
        }
        return LoginAPIInstance.post(url, data);
    },
    logout() {
        const url = '/auth/token/logout/';
        return DefaultAPIInstance.post(url)
    }
}
