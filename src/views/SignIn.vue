<template>
  <div>
    <div class="row h-100 w-100">
      <div
        class="d-flex col-6 justify-content-center align-items-center text-center"
        id="wrapper"
      >
        <h1>Digitall Score</h1>
      </div>
      <div class="col-6">
        <h2 class="display-4 mt-5">CONNEXION</h2>
        <div class="alert alert-dismissible alert-danger" v-if="error">
          <button
            type="button"
            class="close"
            data-dismiss="alert"
            @click="dismissError"
          >
            &times;
          </button>
          <h4 class="alert-heading">
            Une erreur est survenue lors de la connexion :
          </h4>
          <p class="mb-0">{{ error.message }}</p>
        </div>
        <div class="mt-5">
          <form method="post" @submit.prevent="onSubmit(email, password)">
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
              <input
                class="btn btn-info btn-lg btn-block"
                type="submit"
                value="Connexion"
              />
            </div>
          </form>
          <hr />
          <p class="p-1 text-center m-5">Ou connectez-vous autrement...</p>
          <div class="form-group">
            <input class="btn btn-primary btn-lg btn-block" value="FACEBOOK" />
          </div>
          <div class="form-group">
            <input class="btn btn-info btn-lg btn-block" value="LINKEDIN" />
          </div>
          <hr />
          <p class="p-1 text-center m-5">
            Ou inscrivez-vous tout simplement...
          </p>
          <div class="form-group">
            <input
              class="btn btn-warning btn-lg btn-block"
              @click="register"
              value="S'inscrire"
            />
          </div>
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
  background-position: center;
  background-size: cover;
  height: 100vh;
}

#wrapper h1 {
  color: white;
  font-size: 5em;
  white-space: nowrap;
}
</style>
