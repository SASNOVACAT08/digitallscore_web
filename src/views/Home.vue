<template>
  <div id="home">
    <div class="container vertical-center">
      <div class="row">
        <div class="col text-center">
            <h1>Digitall Score</h1>
            <p>"Pilotez vos indicateurs de campagnes avec efficacité"</p>
          <div class="menu" v-if="$store.state.auth.user">
            <br />
            <br />
            <router-link
              id="campn"
              class="btn btn-primary btn-lg"
              :to="{ name: 'campaigns' }"
            >Campagnes</router-link>
            <br />
            <br />
            <router-link
              id="kpi"
              class="btn btn-primary btn-lg"
              :to="{ name: 'kpi' }"
            >Gestion des KPIs</router-link>
            <br />
            <br />
            <button id="logout" class="btn btn-danger btn-lg" @click="logout">Déconnexion</button>
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
  min-height: 100vh;
}

#home h1 {
  color: white;
  font-size: 8em;
  white-space: nowrap;

  margin-bottom: 5%;
}
#home p {
  color: white;
  font-size: 1.5em;
  white-space: nowrap;
  margin-bottom: 6%;
}
.btn-login {
  padding: 1rem 2rem;
  font-size: 1.191875rem;
  line-height: 1.5;
  border-radius: 0px;
}

#logo {
  position: absolute;
  right: 100px;
  top: -100px;
}


.menu {
  line-height: 45px;
}

#campn {
  width: 30%;
}
#kpi {
  width: 30%;
}

#logout {
  width: 30%;
}

#logo {
  position: absolute;
  top: -50px;
  left: 10px;
  width: 260px;
  height: 260px;
}
#logo2 {
  position: relative;
  width: 310px;
  visibility: hidden;
  display: none;
}
.h-100 {
  height: 100%;
}
@media all and (max-width: 768px) {
  #home {
    background-image: url("/img/home.png");
    background-position: center;
    background-size: cover;
    min-height: 100vh;
  }
  #home h1 {
    color: white;
    font-size: 3em;
    white-space: nowrap;

    margin-top: 20%;
  }
  #home p {
    color: white;
    font-size: 0.6em;
    white-space: nowrap;
  }
  #logo {
    visibility: hidden;
  }
  #logo2 {
    visibility: visible;
    display: block;
    margin: auto;
  }

  .h-100 {
    height: 60% !important;
  }
  #menu {
    margin-bottom: 20%;
    line-height: 45px;
  }

  #campn {
    width: 100%;
    font-size: 1em;
  }
  #kpi {
    width: 100%;
    font-size: 1em;
  }

  #logout {
    width: 100%;
    font-size: 1em;
  }
}
</style>
