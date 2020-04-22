<template>
  <div>
    <h2>Register</h2>
    <input type="email" v-model="email" placeholder="Email" />
    <input type="password" v-model="password" placeholder="Password" />
    <input type="button" value="Register" @click="signUp" />
  </div>
</template>
<script>
export default {
  name: "SignUp",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    signUp() {
      fetch("http://localhost:3030/users", {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify({
          email: this.email,
          password: this.password
        })
      })
        .then(data => data.json())
        .then(data => {
          console.log(data);
          this.email = "";
          this.password = "";
        });
    }
  }
};
</script>
