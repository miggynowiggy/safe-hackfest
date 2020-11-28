<template>
  <div>
    <v-dialog
      width="600"
      v-model="dialogState"
      overlay-opacity="0.95"
      scrollable
    >
      <v-card height="100%">
        <form class="d-none" ref="resetForm">
          <input
            type="file"
            ref="bannerPhotoFile"
            accept="image/x-png,image/gif,image/jpeg"
            @change="onFileSelect"
          />
        </form>
        <div style="height:200px" class="primary">
          <div class="gradient-theme px-4 pt-4 pb-0 d-flex">
            <v-btn
              v-if="postContent.banner || this.uploadedBanner"
              @click="removeBannerPhoto"
              color="white"
              class="rounded-circle px-0 py-8 ml-3 mt-2"
              elevation="10"
            >
              <v-icon v-text="'fa-times'" color="primary" />
            </v-btn>
            <v-btn
              @click="uploadBannerPhoto"
              v-else
              color="white"
              class="rounded-circle px-0 py-8 ml-3 mt-2"
              elevation="10"
            >
              <v-icon v-text="'fa-image'" color="primary" />
            </v-btn>
            <v-spacer />
            <v-btn icon @click="dialogState = !dialogState" large>
              <v-icon v-text="'fa-times'" color="white" />
            </v-btn>
          </div>
        </div>

        <v-form class="px-10 pb-10 pt-5">
          <div class="mt-5">
            <div v-for="(field, key) in postFields" :key="key" class="my-4">
              <form-label :text="field.name" />
              <div v-if="field.type === 'textarea'">
                <v-textarea
                  v-model="postContent[key]"
                  dense
                  class="text-body-2"
                  color="primary"
                  outlined
                  rows="3"
                  hide-details="auto"
                  auto-grow
                />
              </div>
              <div v-else-if="field.type === 'select'">
                <v-select
                  v-model="postContent[key]"
                  dense
                  class="text-body-2"
                  color="primary"
                  :items="typeItems"
                  outlined
                  hide-details="auto"
                />
              </div>
              <div v-else>
                <v-text-field
                  v-model="postContent[key]"
                  class="text-body-2"
                  :type="field.type"
                  dense
                  color="primary"
                  outlined
                  hide-details="auto"
                />
                <div v-if="field.type === 'email'">
                  <v-checkbox
                    dense
                    hide-details="auto"
                    class="d-inline-flex"
                    v-model="sameEmail"
                    color="secondary"
                  >
                    <template #label>
                      <span class="text-body-2"
                        >Use username as my contact email</span
                      >
                    </template>
                  </v-checkbox>
                </div>
              </div>
            </div>
          </div>
          <v-btn class="mt-4 text-none" color="primary" @click="saveChanges">
            <v-icon v-text="'fa-save'" size="16" left />
            Save Changes
          </v-btn>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import FormLabel from "@/components/FormLabel";
export default {
  components: {
    FormLabel
  },
  data() {
    return {
      uploadedBanner: null,
      sampleUsername: "valenzuela.city@gov.ph",
      dialogState: false,
      postFields: {
        title: { name: "Post Title" },
        description: { type: "textarea", name: "Description" },
        link: { type: "link", name: "Supported Link" },
        type: { type: "select", name: "Post Category" },
        datetime: {
          type: "datetime-local",
          name: "Scheduled Date and Time (dd-mm-yyyy)"
        },
        location: { type: "textarea", name: "Location / Venue" },
        mobile: { name: "Mobile Phone No." },
        telephone: { name: "Telephone No." },
        email: { type: "email", name: "Contact Email" }
      },
      typeItems: [
        { text: "Services", value: "Services" },
        { text: "Events", value: "Events" },
        { text: "Support Groups", value: "Support Groups" },
        { text: "Campaigns", value: "Campaigns" }
      ],
      postContent: {
        title: null,
        description: null,
        link: null,
        type: null,
        datetime: null,
        location: null,
        mobile: null,
        telephone: null,
        email: null,
        banner: null
      }
    };
  },
  computed: {
    sameEmail: {
      get: function() {
        return this.sampleUsername === this.postContent["email"];
      },
      set: function(newValue) {
        if (newValue) this.postContent["email"] = this.sampleUsername;
        else this.postContent["email"] = null;
      }
    }
  },
  methods: {
    openDialog(post) {
      console.log(post);

      this.dialogState = true;

      if (post) this.postContent = Object.assign({}, this.postContent, post);
      else
        Object.keys(this.postContent).forEach(
          field => (this.postContent[field] = null)
        );
      this.$nextTick(() => {
        this.uploadedBanner = null;
        this.$refs.resetForm.reset();
      });
    },
    saveChanges() {
      this.dialogState = false;
    },
    uploadBannerPhoto() {
      this.$refs.bannerPhotoFile.click();
    },
    removeBannerPhoto() {
      if (this.uploadedBanner) {
        this.uploadedBanner = null;
        this.$refs.resetForm.reset();
        console.log(this.$refs.bannerPhotoFile.files[0]);
        return;
      }
      //remove if there is an avatar
    },
    onFileSelect(file) {
      console.log(file.target.files[0]);
      this.uploadedBanner = file.target.files[0];
    }
  }
};
</script>
