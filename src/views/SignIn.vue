<template>
  <div>
    <div v-if="error">
      {{ error.message }}
      <a class="close" @click.prevent="dismissError">dismiss</a>
    </div>
    <form method="post" @submit.prevent="onSubmit(email, password)">
      <input v-model="email" type="email" name="email" placeholder="Email" />
      <input
        v-model="password"
        type="password"
        name="password"
        placeholder="Password"
      />
      <button type="submit">Sign In</button>
    </form>
  </div>
</template>

<script>
import { ref } from "@vue/composition-api";

export default {
  name: "SignIn",
  setup(props, context) {
    const { $store } = context.root;
    const email = ref("");
    const password = ref("");
    const error = ref(null);
    function dismissError() {
      error.value = null;
    }
    function onSubmit(email, password) {
      $store
        .dispatch("auth/authenticate", { strategy: "local", email, password })
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
      onSubmit
    };
  }
};
</script>
