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

@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
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
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
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

form {
  box-sizing: border-box;
  padding: 30px;
}

/*input,
select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
  position: relative;
  top: 10em;
}*/
button[type="submit"] {
  background-color: #10bce2;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 50%;
  position: relative;
  left: 25%;
  font-size: 25px;
  top: 10em;
}

.button {
  background-color: #10bce2;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 20%;
}

/*.nav {
  position: fixed;
  width: 100vw;
}

.nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

.nav li {
  float: left;
}

.nav li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}


.nav li a:hover {
  background-color: #111;
}*/

</style>
