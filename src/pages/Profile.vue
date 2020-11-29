<template>
  <div>
    <nav-bar />
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="10" xl="8">
            <profile-info
              @editProfile="editProfileInfo"
              @showNotice="toggleNotice" 
            />
            <div class="my-10">
              <div class="d-flex align-center" v-if="isUserProvider">
                <v-icon v-text="'fa-share-square'" class="mr-5" />
                <span class="text-h6">Recent Posts</span>
              </div>
              <div class="d-flex align-center" v-else>
                <v-icon v-text="'fa-bookmark'" class="mr-5" />
                <span class="text-h6">Saved Posts</span>
              </div>
            </div>
            <div v-if="posts.length">
              <masonry
                class="my-10"
                :gutter="{ default: '30px' }"
                :cols="{
                  default: posts.length < 4 ? 3 : 4,
                  1264: posts.length < 4 ? 2 : 3,
                  960: 2,
                  600: 1
                }"
              >
                <post-card
                  v-for="post in posts"
                  :key="post.id"
                  :post="post"
                  @openPost="openPostDialog"
                  @editPost="editPostContent"
                  @showNotice="toggleNotice"
                />
              </masonry>
            </div>
            <div v-else>
              <p v-text="'No posts yet...'" 
                class="text-subtitle font-italic primary--text text-center"
              ></p>
            </div>
            <v-fab-transition v-if="isUserProvider">
              <v-btn
                @click="addPost"
                class="mr-5 mb-5 py-8 rounded-circle"
                color="primary"
                fixed
                dark
                bottom
                right
              >
                <v-icon v-text="'fa-plus'" />
              </v-btn>
            </v-fab-transition>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <full-post ref="postDialog" @editPost="editPostContent" @showNotice="toggleNotice" />
    <edit-profile ref="editDialog" @showNotice="toggleNotice" />
    <post-add-edit ref="postAddEdit" @showNotice="toggleNotice" />
    <notice ref="snackbarNotice" />
  </div>
</template>

<script>
import clone from 'lodash/cloneDeep';
import NavBar from "@/components/NavBar";
import ProfileInfo from "@/components/ProfileInfo";
import EditProfile from "@/components/EditProfile";
import PostAddEdit from "@/components/PostAddEdit";
import PostCard from "@/components/PostCard";
import FullPost from "@/components/FullPost";
import Notice from "@/components/Notice";

export default {
  components: {
    NavBar,
    ProfileInfo,
    EditProfile,
    PostAddEdit,
    PostCard,
    FullPost,
    Notice
  },

  mounted() {
    if(!this.info.hasOwnProperty("updated_at") || !this.info.updated_at) {
      const user = clone(this.info);
      this.editProfileInfo(user);
    }
  },

  methods: {
    async openPostDialog(post) {
      this.$refs.postDialog.openDialog(post);
    },
    editProfileInfo(info) {
      this.$refs.editDialog.openDialog(info);
    },
    addPost() {
      this.$refs.postAddEdit.openDialog(null, 'add');
    },
    editPostContent(post) {
      this.$refs.postAddEdit.openDialog(post, 'edit');
    },
    toggleNotice(type, message) {
      this.$refs.snackbarNotice.open(type, message);
    }
  },

  computed: {
    info() {
      return this.$store.getters["auth/GET_USER"];
    },
    isUserProvider() {
      return this.info.type === 'provider';
    },
    posts() {
      return this.isUserProvider 
        ? this.$store.getters["posts/GET_PROVIDERS_POSTS"] 
        : this.$store.getters["posts/GET_BOOKMARKED_POSTS"];
    }
  }
};
</script>
