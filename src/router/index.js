import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import Campaigns from "../views/campaigns/Campaigns.vue";
import Create from "../views/campaigns/Create.vue";
import Details from "../views/campaigns/Details.vue";
import Kpi from "../views/Kpi.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/sign", name: "signin", component: SignIn },
  { path: "/register", name: "signup", component: SignUp },
  { path: "/campaigns", name: "campaigns", component: Campaigns },
  { path: "/campaigns/create", name: "create_campaigns", component: Create },
  { path: "/campaigns/:id", name: "details_campaigns", component: Details },
  { path: "/kpi", name: "kpi", component: Kpi }
];
const router = new VueRouter({
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active"
});
export default router;
