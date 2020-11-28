<template>
  <v-hover #default="{hover}">
    <v-card class="mb-8 pointer-cursor" :class="{ 'elevation-10': hover }">
      <div @click.stop="openModal">
        <v-img
          v-if="post.bannerURL"
          :src="post.bannerURL"
          class="rounded-t-lg"
          height="180"
          cover
        >
          <div class="pa-4 d-flex">
            <v-chip
              small
              color="accent"
              v-text="post.type"
              class="font-weight-semibold elevation-6"
            />
            <v-spacer />
            <v-btn
              v-if="isLoggedIn"
              icon
              class="btn-translucent mr-2"
              :loading="bookmarkLoading"
              @click.stop="bookmarkPost"
            > 
              <v-icon v-if="post.isBookmarked" v-text="'fas fa-bookmark'" color="accent" size="20" />
              <v-icon v-else v-text="'far fa-bookmark'" color="white" size="20" />
            </v-btn>
            <v-btn
              v-if="isLoggedIn"
              @click="editPost"
              icon
              class="btn-translucent mr-2"
              @click.stop=""
            >
              <v-icon v-text="'fa-edit'" color="white" size="16" />
            </v-btn>
            <v-btn
              v-if="isLoggedIn"
              @click="deletePost"
              icon
              class="btn-translucent"
              @click.stop=""
            >
              <v-icon v-text="'fa-trash-alt'" color="white" size="16" />
            </v-btn>
          </div>
        </v-img>
        <div
          v-else
          style="height:180px"
          class="primary d-flex-column mx-auto justify-center align-center rounded-t-lg"
        >
          <div class="pa-4 d-flex">
            <v-chip
              small
              color="accent"
              v-text="post.type"
              class="font-weight-semibold elevation-6"
            />
            <v-spacer />
            <v-btn
              v-if="isLoggedIn"
              icon
              class="btn-translucent mr-2"
              :loading="bookmarkLoading"
              @click.stop="bookmarkPost"
            > 
              <v-icon v-if="post.isBookmarked" v-text="'fas fa-bookmark'" color="accent" size="20" />
              <v-icon v-else v-text="'far fa-bookmark'" color="white" size="20" />
            </v-btn>
            <v-btn
              v-if="isLoggedIn"
              @click="editPost"
              icon
              class="btn-translucent mr-2"
              @click.stop=""
            >
              <v-icon v-text="'fa-edit'" color="white" size="16" />
            </v-btn>
            <v-btn
              v-if="isLoggedIn"
              @click="deletePost"
              icon
              class="btn-translucent"
              @click.stop=""
            >
              <v-icon v-text="'fa-trash-alt'" color="white" size="16" />
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
            <span
              class="text-caption text--secondary"
              v-text="post.author.name"
            />
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
  props: ['post'],
  data: () => ({
    bookmarkLoading: false,
  }),
  methods: {
    openModal() {
      // console.log("modal to be open");
      this.$store.commit("posts/SET_SELECTED_POST", this.post);
      this.$emit("openPost", clone(this.post));
    },
    editPost() {
      this.$store.commit("posts/SET_SELECTED_POST", this.post);
      this.$emit("editPost", clone(this.post));
    },
    deletePost() {
      this.$store.commit("posts/SET_SELECTED_POST", this.post);
      console.log("this post is deleted.");
    },
    async bookmarkPost() {
      console.log(this.post);
      try {
        this.bookmarkLoading = true;
        if(!this.post.isBookmarked) {
          await this.$store.dispatch("users/BOOKMARK_POST", {
            userID: AUTH.currentUser.uid,
            postID: this.post.id
          });
        
        } else {
          await this.$store.dispatch("users/UNBOOKMARK_POST", {
            userID: AUTH.currentUser.uid,
            postID: this.post.id
          });
        }
        this.bookmarkLoading = false;

      } catch(error) {
        this.bookmarkLoading = false;
        throw error;
      }
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
.btn-translucent {
  background: rgba(0, 0, 0, 0.5);
}
</style>
