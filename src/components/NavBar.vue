<template>
  <v-app-bar app fixed elevate-on-scroll flat color="white" outlined>
    <v-container class="d-flex justify-space-between align-center">
      <div @click="goToHomePage" class="d-flex align-center pointer-cursor">
        <div class="mr-3">
          <v-img :src="require('@/assets/img/safe-logo.svg')" width="35" />
        </div>
        <v-toolbar-title class="font-weight-medium primary--text text-h5">
          Safe
        </v-toolbar-title>
      </div>
      <div class="d-flex" v-if="!isLoggedIn">
        <v-btn
          color="primary"
          class="text-none"
          :to="{ name: 'Login' }"
          text
          small
        >
          <v-icon v-text="'fa-sign-in-alt'" small left />
          Login
        </v-btn>
        <v-divider vertical class="white my-1 mx-3" />
        <v-btn class="text-none" :to="{ name: 'Signup' }" text small>
          <v-icon v-text="'fa-user'" x-small left />
          Sign Up
        </v-btn>
      </div>
      <div v-else>
        <v-btn class="text-none mr-3" text rounded>
          <div class="d-flex align-center pointer-cursor">
            <v-icon v-text="'far fa-question-circle'" left />
            <span class="text-body-2">Help</span>
          </div>
        </v-btn>
        <v-btn class="text-none" icon :to="{name: 'Home'}">
          <v-icon v-text="'fa-home'" color="primary" size="22" />
        </v-btn>
        <v-menu
          bottom
          left
          offset-y
          fixed
          nudge-bottom="5"
          min-width="350"
          max-width="450"
        >
          <template #activator="{on, attrs}">
            <v-btn v-bind="attrs" v-on="on" class="text-none" icon>
              <div class="d-flex align-center pointer-cursor">
                <v-avatar v-if="user.displayPhoto" size="22">
                  <v-img  :src="user.displayPhoto"/>
                </v-avatar>
                <v-icon v-else v-text="'fa-user-circle'" color="primary" size="22" />
              </div>
            </v-btn>
          </template>
          <v-card class="pa-5">
            <div class="d-flex px-3">
              <v-avatar v-if="user.displayPhoto" size="40" class="mr-4 mt-2">
                <v-img :src="user.displayPhoto"/>
              </v-avatar>
              <v-icon v-else v-text="'fa-user-circle'" size="40" class="mr-4" />
              <div class="d-flex flex-column">
                <span class="text-body-1 font-weight-semibold">{{
                  user.name
                }}</span>
                <div>
                  <v-btn
                    :to="{ name: 'Profile' }"
                    class="text-none ml-n2"
                    color="secondary"
                    small
                    text
                  >
                    <v-icon v-text="'fa-id-card'" size="12" left />
                    <span class="text-caption">View Profile</span>
                  </v-btn>
                </div>
              </div>
            </div>
            <v-divider class="my-2" />
            <v-list class="text-caption font-weight-medium" nav>
              <v-list-item dense link color="secondary">
                <v-icon v-text="'fa-cog'" size="16" class="mr-5" />
                <span>Settings</span>
              </v-list-item>
              <v-list-item dense link @click="logout">
                <v-icon v-text="'fa-sign-out-alt'" size="16" class="mr-5" />
                <span>Logout</span>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </div>
    </v-container>
  </v-app-bar>
</template>

<script>
import { AUTH } from "@/config/firebase";

export default {
  name: "NavBar",
  methods: {
    register() {
      this.$router.push({ name: "Signup" });
    },
    login() {
      this.$router.push({ name: "Login" });
    },
    goToHomePage() {
      this.$router.push({ name: "Home" });
    },
    async logout() {
      await this.$store.dispatch("auth/LOGOUT");
      this.$router.push({ name: "Landing Page" });
    }
  },
  computed: {
    isLoggedIn() {
      return Boolean(AUTH.currentUser);
    },
    user() {
      return this.$store.getters["auth/GET_USER"];
    }
  }
};
</script>

<style></style>
