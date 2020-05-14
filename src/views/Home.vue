<template>
  <div id="home">
    <div class="container h-100">
      <div class="row h-100 justify-content-center align-items-center">
        <div class="col text-center">
          <h1>Digitall Score</h1>
          <div v-if="$store.state.auth.user">
            <br />
            <br />
            <router-link
              v-if="$store.state.auth.user"
              class="btn btn-primary btn-lg"
              :to="{ name: 'campaigns' }"
            >Campagnes</router-link>
            <br />
            <br />
            <router-link class="btn btn-primary btn-lg" :to="{ name: 'kpi' }">Gestion des KPIs</router-link>
            <br />
            <br />
            <button
              class="btn btn-danger btn-lg"
              @click="logout"
            >Déconnexion</button>
          </div>
          <div v-else>
            <router-link class="btn btn-info btn-login" :to="{ name: 'signin' }">Connexion</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Home",
  setup(props, context) {
    const { $store } = context.root;
    function logout() {
      $store.dispatch("auth/logout");
    }
    return {
      logout
    };
  }
};
</script>

<style scoped>
#home {
  background-image: url("/img/home.png");
  background-position: center;
  background-size: cover;
  height: 100vh;
  width: 100vw;
}

#home h1 {
  color: white;
  font-size: 8em;
  white-space: nowrap;
}

.btn-login {
  padding: 1rem 2rem;
  font-size: 1.191875rem;
  line-height: 1.5;
  border-radius: 0px;
}

.button {
  padding: 0.5rem 1rem;
  font-size: 1.171875rem;
  line-height: 1.5;
  border-radius: 0px;
  color: #fff;
  background-color: #008cba;
  border-color: #008cba;
}

.button:hover {
  color: #fff;
  background-color: #006f94;
  border-color: #006687;
}

.button:focus,
.button.focus {
  color: #fff;
  background-color: #006f94;
  border-color: #006687;
  -webkit-box-shadow: 0 0 0 0.2rem rgba(38, 157, 196, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(38, 157, 196, 0.5);
}

.button.disabled,
.button:disabled {
  color: #fff;
  background-color: #008cba;
  border-color: #008cba;
}

.button:not(:disabled):not(.disabled):active,
.button:not(:disabled):not(.disabled).active,
.show > .button.dropdown-toggle {
  color: #fff;
  background-color: #006687;
  border-color: #005c7a;
}

.button:not(:disabled):not(.disabled):active:focus,
.button:not(:disabled):not(.disabled).active:focus,
.show > .button.dropdown-toggle:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(38, 157, 196, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(38, 157, 196, 0.5);
}
</style>
