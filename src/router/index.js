import Vue from "vue";
import VueRouter from "vue-router";

//import {routeName} from "./routes"
import { landingpage, homepage } from "./routes";

Vue.use(VueRouter);

const routes = [
  //...routeName
  ...landingpage,
  ...homepage
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
