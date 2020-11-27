<template>
  <v-dialog width="600" v-model="dialogState" overlay-opacity="0.95" scrollable>
    <v-card height="100%">
      <v-img v-if="post.banner" :src="post.banner" height="180" cover>
        <div class="pa-4 d-flex justify-space-between">
          <v-chip
            small
            color="accent"
            v-text="post.type"
            class="font-weight-semibold elevation-6"
          />
          <div>
            <v-btn v-if="isLoggedIn" icon class="btn-translucent">
              <v-icon v-text="'far fa-bookmark'" color="white" size="20" />
            </v-btn>
            <v-btn
              icon
              class="btn-translucent"
              @click="dialogState = !dialogState"
            >
              <v-icon v-text="'fa-times'" color="white" size="20" />
            </v-btn>
          </div>
        </div>
      </v-img>
      <div
        v-else
        style="height:180px"
        class="gradient-theme d-flex-column justify-center align-center"
      >
        <div class="px-4 pt-4 pb-0 d-flex justify-space-between">
          <v-chip
            small
            color="accent"
            v-text="post.type"
            class="font-weight-semibold elevation-6"
          />
          <div>
            <v-btn v-if="isLoggedIn" icon class="btn-translucent mr-2">
              <v-icon v-text="'far fa-bookmark'" color="white" size="20" />
            </v-btn>
            <v-btn
              icon
              class="btn-translucent"
              @click="dialogState = !dialogState"
            >
              <v-icon v-text="'fa-times'" color="white" size="20" />
            </v-btn>
          </div>
        </div>
        <div class="mt-n4">
          <v-img
            :src="require('@/assets/img/safe-logo-white.svg')"
            width="135px"
            class="mx-auto"
          />
        </div>
      </div>

      <div class="px-7 py-5">
        <div class="d-flex justify-space-between">
          <span
            class="text-h6 font-weight-semibold secondary--text text-uppercase"
            v-text="post.title"
          />
          <div class="text-center ml-3">
            <v-btn
              v-if="post.link"
              class="text-none"
              fab
              small
              color="primary"
              :href="post.link"
              target="_blank"
            >
              <v-icon v-text="'fa-info'" size="20" />
            </v-btn>
          </div>
        </div>
        <div class="mt-2">
          <v-icon
            v-text="'fa-user-edit'"
            size="12"
            color="grey lighten-1"
            left
          />
          <span class="text-caption text--secondary" v-text="post.author" />
        </div>
        <p class="text-body-2 my-3" v-text="post.description" />
        <div class="my-5">
          <div class="mb-5">
            <v-icon
              v-text="'fa-map-marker-alt'"
              size="16"
              left
              color="primary"
            />
            <span v-text="'Location / Venue'" class="mt-2 text-subtitle-2" />
            <p
              class="text-body-2 mt-2 pre-text-layout"
              v-text="post.location"
            />
          </div>
          <div v-if="isEvent" class="mb-5">
            <v-icon
              v-text="'far fa-calendar-alt'"
              size="16"
              left
              color="primary"
            />
            <span
              v-text="'Scheduled Date and Time'"
              class="mt-2 text-subtitle-2"
            />
            <p
              class="text-body-2 mt-2 pre-text-layout"
              v-text="
                $morphDateFormat(post.scheduledEvent, 'MMMM DD, YYYY,  hh:mm A')
              "
            />
          </div>
          <div class="mb-5">
            <v-icon v-text="'fa-address-book'" size="16" left color="primary" />
            <span v-text="'Contact Details'" class="mt-2 text-subtitle-2" />
            <p
              class="text-body-2 mt-2 pre-text-layout"
              v-text="post.contacts"
            />
          </div>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { AUTH } from "@/config/firebase";

export default {
  name: "FullPost",
  data: () => ({
    dialogState: false,
    post: {}
  }),
  methods: {
    openDialog(post) {
      this.post = Object.assign({}, post);
      this.dialogState = true;
    }
  },
  computed: {
    isLoggedIn(){
      return Boolean(AUTH.currentUser);
    },
    isEvent(){
      return this.post.type === "Event";
    }
  }
};
</script>

<style scoped>
.btn-translucent {
  background: rgba(0, 0, 0, 0.5);
}
</style>
