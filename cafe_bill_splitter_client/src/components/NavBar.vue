<template>
  <nav class="navbar navbar-expand-sm navbar-light bg-light shadow-sm">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">MyApp</a>
      <button
        ref="closeBtn"
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div ref="navContent" class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <NavLink
            v-for="(page, index) in pages"
            :key="index"
            :page="page"
            :isActive="this.$route.name === page.name"
            @go-to="goTo"
          />
        </ul>
        <button
          v-if="!isAuthorized"
          class="btn btn-outline-success me-3"
          @click="goTo('login')"
        >
          Войти
        </button>
        <span v-else class="navbar-text">
          <button class="btn btn-outline-danger me-3" @click="LogOut">
            Выйти
          </button>
        </span>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import NavLink from "@/components/NavLink.vue";

export default {
  name: "NavBar",
  components: {
    NavLink,
  },
  data() {
    return {
      pages: [
        { name: "home", display_name: "Главная" },
        { name: "bill_calculate", display_name: "Калькуляция счета" },
        { name: "about", display_name: "О нас" },
      ],
    };
  },
  methods: {
    goTo(name) {
      this.$router.push({ name: name });
      this.closeNavBar();
    },
    closeNavBar() {
      const isExpanded = this.$refs["navContent"].classList.contains("show");
      if (isExpanded) {
        this.$refs["closeBtn"].click();
      }
    },
    LogOut() {
      this.$store
        .dispatch("AuthModule/onLogout")
        .then(() => {
          this.closeNavBar();
          location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    ...mapGetters({
      isAuthorized: "AuthModule/isAuthorized",
    }),
  },
};
</script>

<style>
</style>