<template>
  <v-card height="300px" mx-auto>
    <v-img height="150px" contain :src="post.bannerURL"></v-img>

    <v-card-title class="px-4">{{ post.title }}</v-card-title>

    <v-card-text class="px-4 d-inline-block text-caption text-truncate">
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
        @click="openModal"
      > 
        Learn More...
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import clone from 'lodash/cloneDeep';

export default {
  name: "PostCard",
  props: {
    post: {
      required: true
    }
  },
  methods: {
    openModal() {
      console.log('modal to be open');
      this.$emit('openPost', clone(this.post))
    }
  },
}
</script>

<style scoped>
.btn-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-position { 
  position: absolute;
  top: 84%;
  width: 90%;
  margin: inherit;
}
</style>