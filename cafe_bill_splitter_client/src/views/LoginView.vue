<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-11 col-md-6 border border-opacity-10 rounded-3 shadow-sm bg-light">
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
                    <button type="submit" class="btn btn-primary float-end m-3">Войти</button>
                </form>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LoginView",
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
                    this.$router.push({name: 'home'})
                }).catch((error) => {
                    console.log(error)
                })
            },
        }
    }
</script>

<style>

</style>