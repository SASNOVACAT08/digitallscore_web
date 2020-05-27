<template>
  <div id="app">
      <!-- <li><router-link :to="{ name: 'home' }">Home</router-link></li>


      <li style="float:right"><router-link v-if="!$store.state.auth.user " :to="{ name: 'signup' }">Register</router-link></li>

      <li style="float:right"><router-link v-if="!$store.state.auth.user " :to="{ name: 'signin' }">Sign In</router-link></li>

      <li style="float:right"><a v-if="$store.state.auth.user" @click="logout">Log out</a></li> -->
    <router-view />
  </div>
</template>

<script>
import { onMounted } from "@vue/composition-api";

export default {
  setup(props, context) {
    const { $store, $router } = context.root;
    onMounted(() => {
      $store.dispatch("auth/authenticate").catch(error => {
        if (!error.message.includes("Could not find stored JWT")) {
          console.error(error);
        }
      });
      $router.push('/');
    });
    function logout() {
      $store.dispatch("auth/logout");
      $router.push('/');
    }
    return {
      logout
    };
  }
};
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption,  header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
header, hgroup, menu, nav, section {
	display: block;
}

#home{
height: 100vh;
 background-image: url("/img/home.png");
  background-position: center;
  background-size: cover;
 
 
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

body {
  background: white;
  font-family: 'Montserrat', sans-serif;
}





</style>
