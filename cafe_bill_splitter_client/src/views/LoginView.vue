<template>
    <div class="container w-75">
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
            }).catch((error)=>{
                console.log(error)
            })
        },
    }
}
</script>

<style>

</style>