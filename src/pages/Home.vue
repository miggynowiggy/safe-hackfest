<template>
  <div>
    <nav-bar />
    <v-main>
      <v-container>
        <search-and-filter />
        <masonry
          class="my-10"
          :gutter="{ default: '30px' }"
          :cols="{ default: 4, 1264: 3, 960: 2, 600: 1 }"
        >
          <post-card
            :post="post"
            v-for="post in posts"
            :key="post.id"
            @openPost="openPostDialog"
            @showNotice="toggleNotice"
          />
        </masonry>
      </v-container>
      <full-post ref="postDialog" @showNotice="toggleNotice" />
      <notice ref="snackbarNotice" />
    </v-main>
  </div>
</template>

<script>
import SearchAndFilter from "@/components/SearchAndFilter.vue";
import NavBar from "@/components/NavBar.vue";
import PostCard from "@/components/PostCard.vue";
import FullPost from "@/components/FullPost.vue";
import Notice from "@/components/Notice.vue";

export default {
  components: {
    SearchAndFilter,
    NavBar,
    PostCard,
    FullPost,
    Notice
  },
  name: "Home",
  data: function() {
    return {};
  },
  methods: {
    async openPostDialog(post) {
      this.$refs.postDialog.openDialog();
    },
    toggleNotice(type, message) {
      this.$refs.snackbarNotice.open(type, message);
    }
  },
  computed: {
    posts() {
      return this.$store.getters["posts/GET_SEARCH_AND_FILTER_POST"];
    }
  }
};
</script>

<style></style>
