<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link v-if="!$store.getters.isAuth" to="/sign"
        >Sign In</router-link
      >
      <router-link v-if="!$store.getters.isAuth" to="/register"
        >Register</router-link
      >
      <p v-if="$store.getters.isAuth" @click="logOut">Log out</p>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  methods: {
    logOut() {
      this.$store.dispatch("AUTH_LOGOUT").then(() => {
        this.$router.push("/");
      });
    }
  }
};
</script>
<style></style>
