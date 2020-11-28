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
          />
        </masonry>
      </v-container>
      <full-post ref="postDialog" />
    </v-main>
  </div>
</template>

<script>
import SearchAndFilter from "@/components/SearchAndFilter.vue";
import NavBar from "@/components/NavBar.vue";
import PostCard from "@/components/PostCard.vue";
import FullPost from "@/components/FullPost.vue";

export default {
  components: {
    SearchAndFilter,
    NavBar,
    PostCard,
    FullPost
  },
  name: "Home",
  data: function() {
    return {};
  },
  methods: {
    async openPostDialog(post) {
      this.$refs.postDialog.openDialog();
    }
  },
  computed: {
    posts() {
      // const post_fillist = this.$store.getters["posts/GET_FILTER_POST"];

      // console.log(post_filter_list);

      // return !post_filter_list.length && !post_search_list.length
      //   ? this.$store.getters["posts/GET_ALL_POST"]
      return this.$store.getters["posts/GET_SEARCH_AND_FILTER_POST"];
    }
  }
};
</script>

<style></style>
