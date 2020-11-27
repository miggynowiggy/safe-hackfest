import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    component: () => import("@/pages/Home")
  },
  {
    path: "/",
    name: "Landing Page",
    component: () => import("@/pages/LandingPage")
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("@/pages/Signup")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/pages/Login")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
