<template>
    <div class="container">
        <h2>Home page</h2>
        <form @submit.prevent="LogIn">
            <div class="mb-3">
                <label for="LoginInput" class="form-label">Логин</label>
                <input type="text" class="form-control" id="LoginInput" aria-describedby="emailHelp"
                       v-model="username"/>
            </div>
            <div class="mb-3">
                <label for="InputPassword" class="form-label">Пароль</label>
                <input type="password" class="form-control" id="InputPassword" v-model="password">
            </div>
            <button type="submit" class="btn btn-primary">Войти</button>
        </form>
        <button class="btn btn-danger mt-3" @click="LogOut">Выйти</button>
    </div>
</template>

<script>
    // import axios from 'axios';

    export default {
        name: 'HomeView',
        components: {},
        data() {
            return {
                username: "",
                password: ""
            }
        },
        methods: {
            LogIn() {
                this.$store.dispatch('AuthModule/onLogin', {
                    username: this.username,
                    password: this.password,
                }).then(() => {
                    // this.$router.push({name: 'about'})
                    location.reload()
                })
            },
            LogOut() {
                this.$store.dispatch('AuthModule/onLogout').then(() => {
                    location.reload();
                })
            }
        }
    }
</script>
