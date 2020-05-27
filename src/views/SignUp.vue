<template>
  <div>
    <div >
      <div  id="wrapper">
        <h1>Digitall Score</h1>
      </div>
      <div class="form">
        <h2 >INSCRIPTION</h2>
        <div class="alert alert-dismissible alert-danger" v-if="error">
          <button type="button" class="close" data-dismiss="alert" @click="dismissError">&times;</button>
          <h4 class="alert-heading">Une erreur est survenue lors de l'inscription :</h4>
          <p class="mb-0">{{ error.message }}</p>
        </div>
        <div class="form2">
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
              <input class="btn1" type="submit" value="Inscription" />
            </div>
          </form>
          <hr />
          <p >Déjà un compte ?</p>
          <div class="form-group">
            <input class="btn-warning" @click="login" value="Se connecter" />
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

  float: left;
  background-size: cover;
  height: 100vh;
  background-position: center;
  width: 45%;
}

#wrapper h1 {
  color: white;
  font-size: 5em;
  white-space: nowrap;
  text-align: center;
  margin-top: 50vh;
}

.form{
float:right;
min-width: 50%;
height: 100vh;
line-height: 3;
align-self: center;
padding-right: 2%;
display:block;
}

.form-group {
width:100%;
}

.form-control{
    width: 100%;  
    font-size: 1.271875rem;
    padding: 1vh;
    line-height: 1.5;
    margin-top: 2vh;
    
}

.btn1 {
  font-size: 1.511875rem;
  color: #fff;
  background-color: #008cba;
  border-color: #008cba;
  text-decoration: none;
  width: 100%;
  padding: 1vh;
  margin-left: 0.9vh;
  margin-top: 3vh;
  cursor: pointer;
  margin-bottom: 3vh;
}

.btn1:hover {
  color: #fff;
  background-color: #006f94;
  border-color: #006687;
}

.btn1.focus {
  color: #fff;
  background-color: #006f94;
  border-color: #006687;
}



.btn-warning:hover {
  color: #fff;
  background-color: #d08002;
  border-color: #d08002;
}


.btn-warning.focus {
  color: #fff;
  background-color: #d08002;
  border-color: #d08002;
}

.btn-warning{

font-size: 1.511875rem;
  color: #fff;
  background-color: #E99002;
  border-color: #d08002;
  text-decoration: none;
  width: 99%;
  padding: 1vh;
  margin-top: 2vh;
  text-align: center;
  padding-right: 0vh;
  cursor: pointer;
}

 p{
   text-align: center;
   margin-top: 3vh;
   margin-bottom: 3vh;
  font-family: 'Montserrat Bold', sans-serif;
 }

 h2{

   font-size: 3.71875rem;
 }


</style>
