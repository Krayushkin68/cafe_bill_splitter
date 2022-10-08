<template>
    <nav class="navbar navbar-expand-sm navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">MyApp</a>
    <button ref="closeBtn" class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div ref="navContent" class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="#" 
             :class="{active: this.$route.name === 'home'}"
             @click.prevent="goTo('home')">Главная</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" 
             :class="{active: this.$route.name === 'positions'}"
             @click.prevent="goTo('positions')">Позиции</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" 
             :class="{active: this.$route.name === 'about'}"
             @click.prevent="goTo('about')">О нас</a>
        </li>
      </ul>
      <button v-if="!isAuthorized" class="btn btn-outline-success" @click="goTo('login')">Войти</button>
      <span v-else class="navbar-text">
        <!-- <span class="me-2">Имя пользователя</span> -->
        <button class="btn btn-outline-danger" @click="LogOut">Выйти</button>
      </span>
    </div>
  </div>
</nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: "NavBar",
    methods: {
        goTo(name) {
            this.$router.push({name: name});
            this.closeNavBar();
        },
        closeNavBar(){
            const isExpanded = this.$refs["navContent"].classList.contains("show")
            if (isExpanded){
                this.$refs["closeBtn"].click()
            }
        },
        LogOut() {
            this.$store.dispatch('AuthModule/onLogout')
            .then(() => {
                this.closeNavBar();
                location.reload();
             })
            .catch((error) => {
                console.log(error)
            });
        }
    },
    computed: {
        ...mapGetters({
            isAuthorized: 'AuthModule/isAuthorized'
        })
    }

}
</script>

<style>

</style>