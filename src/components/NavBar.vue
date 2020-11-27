<template>
  <v-app-bar app absolute flat color="primary lighten-1" dark class="px-3">
    <v-app-bar-nav-icon>
      <v-img :src="require('@/assets/img/safe-logo-white.svg')"></v-img>
    </v-app-bar-nav-icon>

    <v-toolbar-title class="font-weight-medium text-h5">Safe</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-menu bottom left offset-y>
      <template v-slot:activator="{ on, attr }">
        <v-btn icon large v-bind="attr" v-on="on">
          <v-icon>fa-user-circle</v-icon>
        </v-btn>
      </template>

      <v-list v-if="!isLoggedIn">
        <v-list-item ripple @click="login">
          <v-list-item-title>Login</v-list-item-title>
        </v-list-item>
        <v-list-item ripple @click="register">
          <v-list-item-title>Register</v-list-item-title>
        </v-list-item>
      </v-list>

      <v-list v-else>
        <v-list-item ripple @click="viewProfile">
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item>
        <v-list-item ripple @click="logout">
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { AUTH } from '@/config/firebase';

export default {
  name: "NavBar",
  methods: {
    register() {
      this.$router.push({ name: "Signup" })
    },
    login() {
      this.$router.push({ name: "Login" })
    },
    viewProfile() {
      window.alert("profile clicked");
    },
    async logout() {
      await this.$store.dispatch("auth/LOGOUT");
      this.$router.push({ name: "Landing Page" });
    },
  },
  computed: {
    isLoggedIn() {
      const user = AUTH.currentUser;
      return user ? true : false;
    }
  }
};
</script>

<style></style>
