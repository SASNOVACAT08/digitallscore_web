<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'home' }">Home</router-link>
      <router-link v-if="!$store.state.auth.user" :to="{ name: 'signin' }"
        >Sign In</router-link
      >
      <router-link v-if="!$store.state.auth.user" :to="{ name: 'signup' }"
        >Register</router-link
      >
      <p v-if="$store.state.auth.user" @click="logout">Log out</p>
      <router-link v-if="$store.state.auth.user" :to="{ name: 'campaigns' }"
        >Campaigns</router-link
      >
      <router-link v-if="$store.state.auth.user" :to="{ name: 'kpi' }"
        >KPI</router-link
      >
    </div>
    <router-view />
  </div>
</template>

<script>
import { onMounted } from "@vue/composition-api";

export default {
  setup(props, context) {
    const { $store } = context.root;
    onMounted(() => {
      $store.dispatch("auth/authenticate").catch(error => {
        if (!error.message.includes("Could not find stored JWT")) {
          console.error(error);
        }
      });
    });
    function logout() {
      return $store.dispatch("auth/logout");
    }
    return {
      logout
    };
  }
};
</script>
<style></style>
