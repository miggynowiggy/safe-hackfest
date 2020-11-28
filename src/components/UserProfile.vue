<template>
  <div>
    <v-card class="pa-10 d-flex flex-column flex-md-row">
      <div>
        <v-icon
          v-if="!userInfo['avatar']"
          v-text="'fa-user-circle'"
          size="120"
        />
        <div v-else>
          <v-avatar size="120">
            <img :src="userInfo['avatar']" />
          </v-avatar>
        </div>
      </div>
      <div class="ml-0 mt-5 mt-md-0 ml-md-10 d-flex flex-column">
        <span
          class="text-h5 text-uppercase font-weight-medium"
          v-text="`${userInfo['first_name']} ${userInfo['last_name']}`"
        />
        <span class="text-body-2 text--secondary" v-text="userInfo['email']" />
        <div class="d-flex">
          <template v-for="(field, key) in userInfoFields">
            <div
              class="mt-3 mr-7 d-flex align-start"
              :key="key"
              v-if="userInfo[key]"
            >
              <v-icon
                color="secondary"
                class="mt-1 mr-3"
                v-text="field['icon']"
                size="14"
              />
              <span
                v-if="key === 'birthday'"
                class="text-body-2"
                v-text="$morphDateFormat(userInfo[key], 'MMMM DD, YYYY')"
              />
              <span v-else class="text-body-2" v-text="userInfo[key]" />
            </div>
          </template>
        </div>
      </div>
      <v-spacer />
      <div class="ml-md--3 mt-5 mt-md-0 justify-end">
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
        <v-icon v-text="'fa-bookmark'" class="mr-5" color="accent" />
        <span class="text-h6">Bookmarked Posts</span>
      </div>
    </div>
    <div>
      <masonry
        class="my-10"
        :gutter="{ default: '30px' }"
        :cols="{
          default: userInfo.posts.length < 4 ? 3 : 4,
          1264: userInfo.posts.length < 4 ? 2 : 3,
          960: 2,
          600: 1
        }"
      >
        <post-card
          v-for="post in userInfo.posts"
          :key="post.id"
          :post="post"
          @openPost="openPostDialog"
        />
      </masonry>
    </div>
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
    userInfo: {
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
      userInfoFields: {
        mobile: { icon: "fa-mobile-alt" },
        birthday: { icon: "fa-birthday-cake" },
        telephone: { icon: "fa-phone" }
      }
    };
  }
};
</script>
