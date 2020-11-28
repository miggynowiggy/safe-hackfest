<template>
  <div>
    <v-card class="pa-10 d-flex flex-column flex-md-row">
      <div>
        <v-icon
          v-if="!providerInfo['avatar']"
          v-text="'fa-user-circle'"
          size="120"
        />
        <div v-else>
          <v-avatar size="120">
            <img :src="providerInfo['avatar']" />
          </v-avatar>
        </div>
      </div>
      <div class="ml-0 mt-5 mt-md-0 ml-md-10 d-flex flex-column">
        <span
          class="text-h5 text-uppercase font-weight-medium"
          v-text="providerInfo['name']"
        />
        <span
          class="text-body-2 text--secondary"
          v-text="providerInfo['email']"
        />
        <div
          class="mt-3 d-flex align-start"
          v-for="(field, key) in providerInfoFields"
          :key="key"
        >
          <v-icon
            color="secondary"
            class="mt-1 mr-5"
            v-text="field['icon']"
            size="14"
          />
          <a
            v-if="key === 'website'"
            v-text="providerInfo[key]"
            :href="providerInfo[key]"
            class="text-decoration-none primary--text"
            target="_blank"
          />
          <span v-else class="text-body-2" v-text="providerInfo[key]" />
        </div>
      </div>
      <v-spacer />
      <div class="ml-md--3 mt-5 mt-md-0">
        <v-btn
          class="text-none mt-0"
          color="primary"
          :small="$vuetify.breakpoint.mdAndUp"
          :block="$vuetify.breakpoint.smAndDown"
        >
          <v-icon v-text="'fa-user-edit'" size="16" left />
          Edit
        </v-btn>
      </div>
    </v-card>

    <div class="my-10">
      <div class="d-flex align-center">
        <v-icon v-text="'fa-share-square'" class="mr-5" color="primary" />
        <span class="text-h6">Recent Posts</span>
      </div>
    </div>
    <div>
      <masonry
        class="my-10"
        :gutter="{ default: '30px' }"
        :cols="{
          default: providerInfo.posts.length < 4 ? 3 : 4,
          1264: providerInfo.posts.length < 4 ? 2 : 3,
          960: 2,
          600: 1
        }"
      >
        <post-card
          v-for="post in providerInfo.posts"
          :key="post.id"
          :post="post"
          @openPost="openPostDialog"
        />
      </masonry>
    </div>
    <v-fab-transition>
      <v-btn color="secondary" fab fixed dark bottom right class="mr-5 mb-5">
        <v-icon v-text="'fa-plus'" />
      </v-btn>
    </v-fab-transition>

    <full-post ref="postDialog" />
  </div>
</template>

<script>
import PostCard from "@/components/PostCard";
import FullPost from "@/components/FullPost";

export default {
  components: {
    PostCard,
    FullPost
  },
  props: {
    providerInfo: {
      type: Object
    }
  },
  methods: {
    async openPostDialog(post) {
      this.$refs.postDialog.openDialog(post);
    }
  },
  data() {
    return {
      fab: null,
      providerInfoFields: {
        officeHours: { icon: "fa-clock" },
        address: { icon: "fa-map-marker-alt" },
        mobile: { icon: "fa-mobile-alt" },
        telephone: { icon: "fa-phone" },
        website: { icon: "fa-link" }
      }
    };
  }
};
</script>
