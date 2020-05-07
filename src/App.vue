<template>
  <div id="app">
    <div class="nav" id="nav">
      <router-link  class="button"    :to="{ name: 'home' }">Home</router-link>
      
      <router-link class="button" v-if="!$store.state.auth.user " :to="{ name: 'signin' }"
        >Sign In</router-link
      >
      
      <router-link class="button" v-if="!$store.state.auth.user " :to="{ name: 'signup' }"
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


<style>
body{
  background: white;
}

form {
  box-sizing: border-box;
  height: 50em;
    width:50%;
    padding: 30px;
    border: 1px solid #f1f1f1;
    background: #fff;
    float: right;
    position: relative;
    

    }

input[type=email], input[type=password] ,input[type=text] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
    position: relative;
    top: 10em;
}
button[type=submit] {
    background-color: #10bce2;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 50%;
    position: relative;
    left: 25%;
    font-size:25px;
    top: 10em;
    
}

.button{
    background-color: #10bce2;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 20%;
    
    }
    












</style>
