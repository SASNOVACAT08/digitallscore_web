import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
Vue.use(VueRouter);
const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/sign", name: "SignIn", component: SignIn },
  { path: "/register", name: "SignUp", component: SignUp }
];
const router = new VueRouter({ routes });
export default router;
