import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { morphTruncate, morphDateFormat } from "vue-morphling";
import VueMasonry from "vue-masonry-css";
import { AUTH } from "./config/firebase";
Vue.config.productionTip = false;

Vue.use(morphTruncate);
Vue.use(morphDateFormat);
Vue.use(VueMasonry);

let app;

AUTH.onAuthStateChanged(async user => {
  if (!app) {
    if (user) {
      try {
        await store.dispatch("auth/RELOAD_USER", user.uid);
        await store.dispatch("posts/LISTEN_TO_POSTS");
      } catch (e) {
        console.log(e);
        throw e;
      }

      app = new Vue({
        router,
        store,
        vuetify,
        render: h => h(App)
      }).$mount("#app");
    } else {
      app = new Vue({
        router,
        store,
        vuetify,
        render: h => h(App)
      }).$mount("#app");

      router.push({ name: "Landing Page" });
    }
  }
});
