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
          <v-img v-if="postContent.bannerURL" :src="postContent.bannerURL"
            height="200px"
            class="d-flex px-4 pt-4 pb-0"
          >
            <v-row align="start" justify="space-between">
              <v-col cols="2">
                <v-btn
                  @click="removeBannerPhoto"
                  color="white"
                  class="rounded-circle px-0 py-8 ml-3 mt-2 d-flex"
                  elevation="10"
                >
                  <v-icon v-text="'fa-trash-alt'" color="primary" />
                </v-btn>
              </v-col>
              <v-col cols="2">
                <v-btn icon @click="dialogState = !dialogState" large>
                  <v-icon v-text="'fa-times'" color="white" />
                </v-btn>
              </v-col>
            </v-row>
          </v-img>

          <v-img v-else-if="tempBanner" :src="tempBanner"
            height="200px" style="width: 100%;"
            class="d-flex px-2 pt-4 pb-0"
          >
            <v-row align="start" justify="space-between">
              <v-col cols="2">
                <v-btn
                  @click="removeBannerPhoto"
                  color="white"
                  class="rounded-circle px-0 py-8 ml-3 mt-2 d-flex"
                  elevation="10"
                >
                  <v-icon v-text="'fa-trash-alt'" color="primary" />
                </v-btn>
              </v-col>
              <v-col cols="2">
                <v-btn icon @click="dialogState = !dialogState" large>
                  <v-icon v-text="'fa-times'" color="white" />
                </v-btn>
              </v-col>
            </v-row>
          </v-img>

          <div v-else class="gradient-theme px-4 pt-4 pb-0 d-flex" >
            <v-btn
              @click="uploadBannerPhoto"
              color="white"
              class="rounded-circle px-0 py-8 ml-3 mt-2"
              elevation="10"
              style="z-index: 10;"
            >
              <v-icon v-text="'fa-image'" color="primary" />
            </v-btn>
            <v-spacer />
            <v-btn icon @click="dialogState = !dialogState" large style="z-index: 10;">
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
          <v-btn class="mt-4 text-none" color="primary" 
            @click="saveChanges" :loading="saveLoading">
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
    FormLabel,
  },
  data() {
    return {
      uploadedBanner: null,
      dialogState: false,
      postFields: {
        title: { name: "Post Title" },
        description: { type: "textarea", name: "Description" },
        supportLink: { type: "link", name: "Supported Link" },
        type: { type: "select", name: "Post Category" },
        eventDate: {
          type: "datetime-local",
          name: "Scheduled Date and Time (dd-mm-yyyy)"
        },
        location: { type: "textarea", name: "Location / Venue" },
        mobile: { name: "Mobile Phone No." },
        email: { type: "email", name: "Contact Email" }
      },
      typeItems: [
        { text: "Services", value: "Services" },
        { text: "Events", value: "Events" },
        { text: "Support Groups", value: "Support Groups" },
        { text: "Campaigns", value: "Campaigns" },
        { text: "Hotlines", value: "Hotlines"}
      ],
      postContent: {
        title: null,
        description: null,
        supportLink: null,
        type: null,
        eventDate: null,
        location: null,
        mobile: null,
        email: null,
        bannerURL: null
      },
      saveLoading: false,
      formState: 'add',
      tempBanner: null
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
    },
    user() {
      return this.$store.getters["auth/GET_USER"];
    },
    sampleUsername() {
      return this.user.email;
    }
  },
  methods: {
    openDialog(post, state) {
      this.dialogState = true;
      this.formState = state;

      if (post) {
        this.postContent = Object.assign({}, this.postContent, post);

      } else {
        Object.keys(this.postContent).forEach(
          field => (this.postContent[field] = null)
        );
      }

      this.$nextTick(() => {
        this.tempBanner = null;
        this.uploadedBanner = null;
        this.$refs.resetForm.reset();
      });
    },
    async saveChanges() {
      try { 
        this.saveLoading = true;

        if(!this.postContent.type) {
          this.$emit("showNotice", "error", "Please indicate Post Category");
          this.saveLoading = false;
          return; 
        }

        if(this.formState === 'add') {
          await this.$store.dispatch("posts/ADD_POST", {
            content: this.postContent,
            file: this.uploadedBanner
          });
          this.$emit("showNotice", "success", "Post added!");
          this.saveLoading = false;
        
        } else if(this.formState === 'edit') {
          await this.$store.dispatch("posts/EDIT_POST", {
            content: this.postContent,
            file: this.uploadedBanner
          });
          this.$emit("showNotice", "success", "Post edited!");
          this.saveLoading = false;
        }
        
      } catch(error) {
        this.saveLoading = false;
        this.$emit("showNotice", "error", "Post not added!");
        throw error;
      }
      this.dialogState = false;
    },
    uploadBannerPhoto() {
      this.$refs.bannerPhotoFile.click();
    },
    async removeBannerPhoto() {
      if(this.tempBanner) {
        this.uploadedBanner = null;
        this.tempBanner = null;
        this.$refs.resetForm.reset();
        return;
      }

      if (this.uploadedBanner) {
        this.uploadedBanner = null;
        this.$refs.resetForm.reset();
        console.log(this.$refs.bannerPhotoFile.files[0]);
        return;
      }

      if(this.postContent.bannerURL) {
        this.postContent.bannerURL = null;
        await this.$store.dispatch("posts/REMOVE_BANNER_PHOTO", this.postContent);
      }

      //remove if there is an avatar
    },
    async onFileSelect(file) {
      this.uploadedBanner = file.target.files[0];
      const reader = new FileReader
      reader.onload = e => {
        this.tempBanner = e.target.result;
      }
      reader.readAsDataURL(file.target.files[0])
    }
  }
};
</script>
