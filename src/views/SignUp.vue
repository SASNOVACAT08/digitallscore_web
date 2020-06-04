<template>
  <div>
    <div class="row h-100 w-100">
      <div class="d-flex col-6 justify-content-center align-items-center text-center" id="wrapper">
        <img id="logo" src="/img/DigitallScore-Logoblanc.png">
        <h1>Digitall Score</h1>
      </div>
      <div class="col-6">
        <img id="logo2" src="/img/Logo_ResponsiveBlanc.png">
        <h2 class="display-4 mt-5">INSCRIPTION</h2>
      
      <div id="modal" class="modal-dialog modal-dialog" role="document" v-if="error">
    <div class="modal-content">
      <div class="modal-header">
          <button type="button" class="close" data-dismiss="alert" @click="dismissError">&times;</button>
          <h4 class="alert-heading">Une erreur est survenue lors de l'inscription :</h4>
          <p class="mb-0">{{ error.message }}</p>
        </div>
    </div>
      </div>
        <div id="form" class="mt-5">
          <form method="post" @submit.prevent="onSubmit(email, password, firstname, name)">
            <div class="form-group">
              <input
                v-model="firstname"
                type="text"
                name="firstname"
                placeholder="Prénom"
                class="form-control form-control-lg"
              />
            </div>
            <div class="form-group">
              <input
                v-model="name"
                type="text"
                name="name"
                placeholder="Nom"
                class="form-control form-control-lg"
              />
            </div>
            <div class="form-group">
              <input
                v-model="email"
                type="email"
                name="email"
                placeholder="Email"
                class="form-control form-control-lg"
              />
            </div>
            <div class="form-group">
              <input
                v-model="password"
                type="password"
                name="password"
                placeholder="Mot de passe"
                class="form-control form-control-lg"
              />
            </div>
            <div class="form-group">
              <input class="btn btn-info btn-lg btn-block" type="submit" value="Inscription" />
            </div>
          </form>
          <hr />
          <p class="p-1 text-center m-5">Déjà un compte ?</p>
          <div class="form-group">
            <input id="btnsignin" class="btn btn-warning btn-lg btn-block" @click="login" value="Se connecter" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/composition-api";

export default {
  name: "SignUp",
  setup(props, context) {
    const { User } = context.root.$FeathersVuex.api;
    const { $store, $router } = context.root;
    const email = ref("");
    const password = ref("");
    const firstname = ref("");
    const name = ref("");
    const error = ref(null);
    function dismissError() {
      error.value = null;
    }
    function login() {
      $router.push({ name: "signin" });
    }
    function onSubmit(email, password, firstname, name) {
      dismissError();
      // Automatically log the user in after successful signup.
      new User({ email, password, firstname, name })
        .save()
        .then(() =>
          $store
            .dispatch("auth/authenticate", {
              strategy: "local",
              email,
              password
            })
            .then(() => $router.push("/"))
        )
        // Just use the returned error instead of mapping it from the store.
        .catch(err => {
          // Convert the error to a plain object and add a message.
          console.log(err);
          let type = err.errorType;
          err = Object.assign({}, err);
          err.message =
            type === "uniqueViolated"
              ? "That email address is unavailable."
              : "An error prevented signup.";
          error.value = err;
        });
    }
    return {
      email,
      password,
      firstname,
      name,
      error,
      dismissError,
      onSubmit,
      login
    };
  }
};
</script>
<style scoped>
#wrapper {
  background-image: url("/img/deux.png");
  background-position: center;
  background-size: cover;
  height: 100vh;
}

#wrapper h1 {
  color: white;
  font-size: 5em;
  white-space: nowrap;
  margin-bottom: 20%;
}


#btnsignin{
  width: 94%;
  margin-left: 3%;
}


#logo2{
  position: relative;
  width: 260px;
  visibility: hidden;
  display: none;
  
  
  
  

}
#logo{
  position: absolute;
  top: -40px;
  left: 0;
   width: 260px;
   height: 260px;
  
}

#form{
  padding-top: 5%;
}

#modal{
text-decoration: none;
  position: fixed;
  padding-left: 30px;
  color: red;

}
@media all and (max-width: 1023px) {
#wrapper {
  background-image: url("/img/deux.png");
  background-position: center;
  background-size: cover;
height: 170vh;
  position: absolute;
}

#wrapper h1 {
 visibility: hidden;
 display: none;
}

#logoin{
  width: 10%;
  height: 10%;
  margin-left: 10%;
}

#logofb{
  width: 10%;
  height: 10%;
}

#logos{
  text-align: center;
  margin-bottom: 5%;
  
  
  }

#btnsignup{
  width: 94%;
  margin-left: 3%;
  margin-bottom: 10%;


}
#logo{
visibility: hidden;
}
#logo2{
  visibility: visible;
  display: inline;
}
#form{
  padding-bottom: 0%;
  color: white;
  
}
#modal{
text-decoration: none;
  position: fixed;
  padding-left: 30px;
  color:red;
}



 h2{

   font-size: 2em;
   padding-left: 10%;
   
 }

.col-6{
  max-width: 100%;
    max-height: 120vh;
  color: white;
      margin: auto;
 
}
.row {
 
    margin-right: 0px;
    margin-left: 0px;
}
}

</style>
