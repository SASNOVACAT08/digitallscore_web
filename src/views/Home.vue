<template>
  <div id="home">
        <div class="container">
          <h1>Digitall Score</h1>
          <div v-if="$store.state.auth.user">
            <div class="btn">
            <router-link
              v-if="$store.state.auth.user"
              class="button"
              :to="{ name: 'campaigns' }"
            >Campagnes</router-link>
            </div>
          <div class="btn1">
            <router-link class="button" :to="{ name: 'kpi' }">Gestion des KPIs</router-link>
          </div>
          <div class="btn2">
            <button
              class="button-danger"
              @click="logout"
            >Déconnexion</button>
          </div>
          </div>
          <div class="btn-login" v-else>
            <router-link class="button-login" :to="{ name: 'signin' }">Connexion</router-link>
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


#home h1 {
  color: white;
  font-size: 8em;
  white-space: nowrap;
  font-family: Montserrat;
 
}

.button-login {
  padding: 1rem 2rem;
  font-size: 1.191875rem;
  line-height: 1.5;
  border-radius: 0px;
  color: #fff;
  background-color: #008cba;
  border-color: #008cba;
  text-decoration: none;
  }

  .button-login:hover {
  color: #fff;
  background-color: #006f94;
  border-color: #006687;
}


.button-login.focus {
  color: #fff;
  background-color: #006f94;
  border-color: #006687;
  -webkit-box-shadow: 0 0 0 0.2rem rgba(38, 157, 196, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(38, 157, 196, 0.5);
}






.button {
  padding: 0.5rem 1rem;
  font-size: 1.171875rem;
  line-height: 1.5;
  border-radius: 0px;
  color: #fff;
  background-color: #008cba;
  border-color: #008cba;
  text-decoration: none;
}

.button:hover {
  color: #fff;
  background-color: #006f94;
  border-color: #006687;
}


.button.focus {
  color: #fff;
  background-color: #006f94;
  border-color: #006687;
  
}


.button-danger{
padding: 0.5rem 1rem;
  font-size: 1.171875rem;
  line-height: 1.5;
  border-radius: 0px;
  color: #fff;
  background-color: #CA0B00;
  border-color: #CA0B00;
  text-decoration: none;

}
.button-danger:hover {
  color: #fff;
  background-color: rgb(156, 13, 6);
  border-color: rgb(156, 13, 6);
}


.button-danger.focus {
  color: #fff;
  background-color:  rgb(156, 13, 6);
  border-color:  rgb(156, 13, 6);
 
}



.container{

text-align: center;
padding-top: 35vh;
}

.btn-login{
padding-top: 5vh;

}

.btn{
padding-top: 3vh;
  
}
.btn1{
padding-top: 3vh;
  
}
.btn2{
padding-top: 3vh;
  
}
</style>
