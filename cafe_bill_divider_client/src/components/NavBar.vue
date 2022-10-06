<template>
      <nav class="navbar navbar-expand-md navbar-light bg-light">
        <div class="container">
            <a href="#" class="navbar-brand">MyApp</a>
            <button class="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarSupprtedContent" 
                    aria-controls="navbarSupprtedContent" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                    ref="closeBtn">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupprtedContent" ref="navContent">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link 
                            to="/" 
                            class="nav-link" 
                            :class="{active: this.$route.path === '/'}" 
                            @click="closeNavBar">
                            Главная
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link 
                            to="/positions" 
                            class="nav-link" 
                            :class="{active: this.$route.path === '/positions'}"
                            @click="closeNavBar">
                            Позиции
                        </router-link>
                        </li>
                    <li class="nav-item">
                        <router-link 
                            to="/about" 
                            class="nav-link" 
                            :class="{active: this.$route.path === '/about'}"
                            @click="closeNavBar">
                            О приложении
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: "NavBar",
    methods: {
        closeNavBar(){
            const isExpanded = this.$refs["navContent"].classList.contains("show")
            console.log(isExpanded)
            if (isExpanded){
                this.$refs["closeBtn"].click()
            }
        }
    }

}
</script>

<style>

</style>