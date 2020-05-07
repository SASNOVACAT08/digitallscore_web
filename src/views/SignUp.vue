<template>
  <div>
    <div v-if="error" class="error">
      {{ error.message }}
      <a class="close" @click.prevent="dismissError">dismiss</a>
    </div>
    <form
      method="post"
      @submit.prevent="onSubmit(email, password, firstname, name)"
    >
    <h1>INSCRIPTION</h1>
      <input
        v-model="firstname"
        type="text"
        name="firstname"
        placeholder="Prénom"
      />
      <input v-model="name" type="text" name="name" placeholder="Nom" />
      <input v-model="email" type="email" name="email" placeholder="Email" />
      <input
        v-model="password"
        type="password"
        name="password"
        placeholder="Mot de passe"
      />
      <button type="submit">S'inscrire</button>
    </form>
  </div>
</template>

<script>
import { ref } from "@vue/composition-api";

export default {
  name: "SignUp",
  setup(props, context) {
    const { User } = context.root.$FeathersVuex.api;
    const { $store } = context.root;
    const email = ref("");
    const password = ref("");
    const firstname = ref("");
    const name = ref("");
    const error = ref(null);
    function dismissError() {
      error.value = null;
    }
    function onSubmit(email, password, firstname, name) {
      console.log(email);

      dismissError();
      // Automatically log the user in after successful signup.
      new User({ email, password, firstname, name })
        .save()
        .then(() =>
          $store.dispatch("auth/authenticate", {
            strategy: "local",
            email,
            password
          })
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
      onSubmit
    };
  }
};
</script>
