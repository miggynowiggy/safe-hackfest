<template>
  <v-dialog
    v-model="dialogState"
    :fullscreen="
      $vuetify.breakpoint.name === 'xs' ||
      $vuetify.breakpoint.name === 'sm' ||
      $vuetify.breakpoint.name === 'md'
    "
  >
    <v-card>
      <v-img height="250px" contain :src="post.bannerURL"></v-img>

      <v-card-title class="px-4">{{ post.title }}</v-card-title>

      <v-card-text class="px-4 d-inline-block text-caption">
        <v-container fluid>
          <v-row align="start" justify="start">
            <v-col></v-col>
          </v-row>
        </v-container>
        {{ post.description }}
      </v-card-text>

      <v-card-actions class="btn-container">
        <v-btn
          class="btn-position"
          color="primary"
          outlined
          rounded
          height="30px"
          ripple
          @click="openDialog"
        > 
          Learn More...
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
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

  }
}
</script>

<style>

</style>