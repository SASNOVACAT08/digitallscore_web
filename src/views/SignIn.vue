<template>
  <div>
    <input type="email" v-model="email" placeholder="Email" />
    <input type="password" v-model="password" placeholder="Password" />
    <input type="button" value="Sign In" @click="signIn" />
  </div>
</template>

<script>
export default {
  name: "SignIn",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    signIn() {
      this.$store
        .dispatch("AUTH_REQUEST", {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push("/");
          this.email = "";
          this.password = "";
        });
    }
  }
};
</script>
