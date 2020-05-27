<template>
  
    <div>
      <div  id="wrapper">
        <h1>Digitall Score</h1>
      </div>
      <div class="form">
        <h2>CONNEXION</h2>
        <div class="alert alert-dismissible alert-danger" v-if="error">
          <button type="button" class="close" data-dismiss="alert" @click="dismissError">&times;</button>
          <h4 class="alert-heading">Une erreur est survenue lors de la connexion :</h4>
          <p class="mb-0">{{ error.message }}</p>
        </div>
        <div class="form2">
          <form method="post" @submit.prevent="onSubmit(email, password)">
            <div class="form-group">
              <input
                v-model="email"
                type="email"
                name="email"
                placeholder="Email"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <input
                v-model="password"
                type="password"
                name="password"
                placeholder="Mot de passe"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <input class="btn1" type="submit" value="Connexion" />
            </div>
          </form>
          <hr />
          <p >Ou connectez-vous autrement...</p>
          <div class="form-group">
            <input class="btn"  value="FACEBOOK" />
          </div>
          <div class="form-group">
            <input class="btn"  value="LINKEDIN" />
          </div>
          <hr />
          <p>Ou inscrivez-vous tout simplement...</p>
          <div class="form-group">
            <input class="btn-warning" @click="register" value="S'inscrire" />
          </div>
        </div>
      </div>
    </div>
  
</template>

<script>
import { ref } from "@vue/composition-api";

export default {
  name: "SignIn",
  setup(props, context) {
    const { $store, $router } = context.root;
    const email = ref("");
    const password = ref("");
    const error = ref(null);
    function dismissError() {
      error.value = null;
    }
    function register() {
      $router.push({ name: "signup" });
    }
    function onSubmit(email, password) {
      $store
        .dispatch("auth/authenticate", { strategy: "local", email, password })
        .then(() => $router.push("/"))
        // Just use the returned error instead of mapping it from the store.
        .catch(err => {
          // Convert the error to a plain object and add a message.
          let type = err.className;
          err = Object.assign({}, err);
          err.message =
            type === "not-authenticated"
              ? "Incorrect email or password."
              : "An error prevented login.";
          this.error = err;
        });
    }
    return {
      email,
      password,
      error,
      dismissError,
      onSubmit,
      register
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
    font-size: 1.371875rem;
    padding: 0.5vh;
    line-height: 1.5;
    margin-top: 2vh;
    opacity: 55%;
}

.btn1 {
  font-size: 1.511875rem;
  color: #fff;
  background-color: #008cba;
  border-color: #008cba;
  text-decoration: none;
  width: 100%;
  padding: 1vh;
  margin-left: 0.5vh;
  margin-top: 2vh;
  cursor: pointer;
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

.btn {
 font-size: 1.511875rem;
  color: #fff;
  background-color: #008cba;
  border-color: #008cba;
  text-decoration: none;
  width: 99%;
  padding: 1vh;
  margin-top: 2vh;
  text-align: center;
  padding-right: 0vh;
  cursor: pointer;
}

.btn:hover {
  color: #fff;
  background-color: #006f94;
  border-color: #006687;
}


.btn.focus {
  color: #fff;
  background-color: #006f94;
  border-color: #006687;
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