import axios from "axios";

const loginConfig = {
    // baseURL: process.env.VUE_APP_BASE_URL,
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        'Content-Type': 'application/json'
    }
}

export const LoginAPIInstance = axios.create(loginConfig)

const defaultConfig = {
    // baseURL: process.env.VUE_APP_BASE_URL,
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        'Content-Type': 'application/json'
    }
}

const token = localStorage.getItem('token');
if (token) defaultConfig.headers['Authorization'] = `Token ${token}`

const instance = axios.create(defaultConfig);

instance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response.status === 401) {
        // alert("You are not authorized");
        localStorage.removeItem('token');
        location.reload()
    }
    if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
});

export const DefaultAPIInstance = instance