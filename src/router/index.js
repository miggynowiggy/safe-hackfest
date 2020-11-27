import Vue from "vue";
import VueRouter from "vue-router";

//import {routeName} from "./routes"
import { homepage } from "./routes";

Vue.use(VueRouter);

const routes = [
  //...routeName
  ...homepage
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
