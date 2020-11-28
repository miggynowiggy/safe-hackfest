<template>
  <div>
    <form class="d-none" ref="resetForm">
      <input
        type="file"
        ref="photoFile"
        accept="image/x-png,image/gif,image/jpeg"
        @change="onFileSelect"
      />
    </form>

    <v-card class="pa-10 d-flex flex-column flex-md-row">
      <div class="mr-5 d-flex justify-center d-md-inline">
        <v-badge
          bottom
          right
          color="transparent"
          overlap
          offset-x="40"
          offset-y="60"
        >
          <v-icon v-if="!info['avatar']" v-text="'fa-user-circle'" size="150" />
          <div v-else>
            <v-avatar size="150">
              <img :src="info['avatar']" />
            </v-avatar>
          </div>
          <template #badge>
            <v-btn
              v-if="info['avatar'] || uploadedPhoto"
              @click="removePhoto"
              outlined
              large
              icon
              color="primary"
              style="background-color:#9A12B3; border: 5px solid white"
            >
              <v-icon v-text="'fa-times'" size="20" color="white" />
            </v-btn>
            <v-btn
              v-else
              @click="uploadPhoto"
              outlined
              large
              icon
              color="primary"
              style="background-color:#9A12B3; border: 5px solid white"
            >
              <v-icon v-text="'fa-camera'" size="20" color="white" />
            </v-btn>
          </template>
        </v-badge>
      </div>
      <div
        v-if="info['type'] === 'provider'"
        class="ml-0 mt-10 mt-md-0 ml-md-10 d-flex flex-column"
      >
        <div class="d-flex flex-column text-center text-md-left mb-2">
          <span
            class="text-h5 text-uppercase font-weight-semibold"
            v-text="info['name']"
          />
          <span class="text-body-2 text--secondary" v-text="info['email']" />
        </div>
        <template v-for="(field, key) in providerInfoFields">
          <div v-if="info[key]" class="mt-3 d-flex align-start" :key="key">
            <v-icon class="mt-1 mr-5" v-text="field['icon']" size="14" />
            <a
              v-if="key === 'website'"
              v-text="info[key]"
              :href="info[key]"
              class="text-decoration-none primary--text"
              target="_blank"
            />
            <span v-else class="text-body-2" v-text="info[key]" />
          </div>
        </template>
      </div>
      <div v-else>
        <div class="ml-0 mt-5 mt-md-0 ml-md-10 d-flex flex-column">
          <span
            class="text-h5 text-uppercase font-weight-medium"
            v-text="`${info['author']['name']}`"
          />
          <span class="text-body-2 text--secondary" v-text="info['email']" />
          <div class="d-flex">
            <template v-for="(field, key) in userInfoFields">
              <div
                v-if="info[key]"
                class="mt-3 mr-7 d-flex align-start"
                :key="key"
              >
                <v-icon class="mt-1 mr-3" v-text="field['icon']" size="14" />
                <span
                  v-if="key === 'birthday'"
                  class="text-body-2"
                  v-text="$morphDateFormat(info[key], 'MMMM DD, YYYY')"
                />
                <span v-else class="text-body-2" v-text="info[key]" />
              </div>
            </template>
          </div>
        </div>
      </div>
      <v-spacer />
      <div class="ml-md--3 mt-5 mt-md-0">
        <v-btn
          @click="editProfile"
          class="text-none mt-0"
          color="secondary"
          :small="$vuetify.breakpoint.mdAndUp"
          :block="$vuetify.breakpoint.smAndDown"
        >
          <v-icon v-text="'fa-user-edit'" size="16" left />
          Edit
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object
    }
  },
  methods: {
    editProfile() {
      console.log(this.info);
      const { posts, ...profileInfo } = this.info;
      this.$emit("editProfile", profileInfo);
    },
    uploadPhoto() {
      this.$refs.photoFile.click();
    },
    removePhoto() {
      if (this.uploadedPhoto) {
        this.uploadedPhoto = null;
        this.$refs.resetForm.reset();
        console.log(this.$refs.photoFile.files[0]);
        return;
      }
      //remove if there is an avatar
    },
    onFileSelect(file) {
      console.log(file.target.files[0]);
      this.uploadedPhoto = file.target.files[0];
    }
  },
  data() {
    return {
      providerInfoFields: {
        officeHours: { icon: "fa-clock" },
        address: { icon: "fa-map-marker-alt" },
        mobile: { icon: "fa-mobile-alt" },
        telephone: { icon: "fa-phone" },
        website: { icon: "fa-link" }
      },
      userInfoFields: {
        mobile: { icon: "fa-mobile-alt" },
        birthday: { icon: "fa-birthday-cake" },
        telephone: { icon: "fa-phone" }
      },
      uploadedPhoto: null
    };
  }
};
</script>
