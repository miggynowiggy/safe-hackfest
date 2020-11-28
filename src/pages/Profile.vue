<template>
  <div>
    <nav-bar />
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="10" xl="8">
            <profile-info :info="info" @editProfile="editProfileInfo" />
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
            <div>
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
                />
              </masonry>
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
    <full-post ref="postDialog" @editPost="editPostContent" />
    <edit-profile ref="editDialog" />
    <post-add-edit ref="postAddEdit" />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import ProfileInfo from "@/components/ProfileInfo";
import EditProfile from "@/components/EditProfile";
import PostAddEdit from "@/components/PostAddEdit";
import PostCard from "@/components/PostCard";
import FullPost from "@/components/FullPost";

export default {
  components: {
    NavBar,
    ProfileInfo,
    EditProfile,
    PostAddEdit,
    PostCard,
    FullPost
  },

  methods: {
    async openPostDialog(post) {
      this.$refs.postDialog.openDialog(post);
    },
    editProfileInfo(info) {
      this.$refs.editDialog.openDialog(info);
    },
    addPost() {
      this.$refs.postAddEdit.openDialog();
    },
    editPostContent(post) {
      this.$refs.postAddEdit.openDialog(post);
    }
  },

  data() {
    return {
      
    };
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
