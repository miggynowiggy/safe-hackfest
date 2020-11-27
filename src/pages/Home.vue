<template>
  <div>
    <nav-bar></nav-bar>
    <v-main>
      <v-container fluid>
        <search-and-filter></search-and-filter>
      </v-container>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col
            v-for="post in posts"
            :key="post.id"
            xl="4"
            lg="3"
            md="2"
            sm="1" 
          >
            <post-card :post="post" @openPost="openPostDialog"></post-card>
          </v-col>
        </v-row>
      </v-container>

      <full-post ref="postDialog"></full-post>
    </v-main>
  </div>
</template>

<script>
import SearchAndFilter from '@/components/SearchAndFilter.vue';
import NavBar from '@/components/NavBar.vue';
import PostCard from '@/components/PostCard.vue';
import FullPost from '@/components/FullPost.vue';

export default {
  components: { 
    SearchAndFilter,
    NavBar,
    PostCard,
    FullPost
  },
  name: "Home",
  async created() {
    await this.$store.dispatch('GET_ALL_POST');
  },
  data: () => ({
    
  }),
  methods: {
    async openPostDialog(post) {
      this.$refs.postDialog.openDialog(post);
    }
  },
  computed: {
    posts() {
      return this.$store.getters['GET_ALL_POST'];
    }
  }
}
</script>

<style>

</style>