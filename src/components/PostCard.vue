<template>
  <v-hover #default="{hover}">
    <v-card class="mb-8 pointer-cursor" :class="{ 'elevation-10': hover }">
      <div @click.stop="openModal">
        <v-img
          v-if="post.banner"
          :src="post.banner"
          class="rounded-t-lg"
          height="180"
          cover
        >
          <div class="pa-4 d-flex justify-space-between">
            <v-chip
              small
              color="accent"
              v-text="post.type"
              class="font-weight-semibold elevation-6"
            />
            <v-btn v-if="isLoggedIn" icon class="bookmark-color" @click.stop="">
              <v-icon v-text="'far fa-bookmark'" color="white" size="20" />
            </v-btn>
          </div>
        </v-img>
        <div
          v-else
          style="height:180px"
          class="primary d-flex-column mx-auto justify-center align-center rounded-t-lg"
        >
          <div class="px-4 pt-4 pb-0 d-flex justify-space-between">
            <v-chip
              small
              color="accent"
              v-text="post.type"
              class="font-weight-semibold elevation-6"
            />
            <v-btn icon v-if="isLoggedIn" class="bookmark-color" @click.stop="">
              <v-icon v-text="'far fa-bookmark'" color="white" size="20" />
            </v-btn>
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
          <span
            class="text-body-1 font-weight-semibold secondary--text text-uppercase"
            v-text="$morphTruncate(post.title, 60)"
          />
          <div class="mt-2">
            <v-icon
              v-text="'fa-user-edit'"
              size="12"
              color="grey lighten-1"
              left
            />
            <span class="text-caption text--secondary" v-text="post.author" />
          </div>
          <p
            class="text-body-2 my-3"
            v-text="$morphTruncate(post.description, 140)"
          />
        </div>
      </div>
    </v-card>
  </v-hover>
</template>

<script>
import clone from "lodash/cloneDeep";
import { AUTH } from "@/config/firebase";

export default {
  name: "PostCard",
  props: {
    post: {
      required: true
    }
  },
  methods: {
    openModal() {
      console.log("modal to be open");
      this.$emit("openPost", clone(this.post));
    }
  },
  computed: {
    isLoggedIn() {
      return Boolean(AUTH.currentUser);
    }
  }
};
</script>
<style scoped>
.bookmark-color {
  background: rgba(0, 0, 0, 0.5);
}
</style>
