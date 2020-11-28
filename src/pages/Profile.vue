<template>
  <div>
    <nav-bar />
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="10" xl="8">
            <profile-info
              :info="info"
              @editProfile="editProfileInfo"
              @uploadPhoto="uploadProfilePhoto"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <edit-profile ref="editDialog" />
    <upload-profile-photo ref="uploadPhoto" />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import ProfileInfo from "@/components/ProfileInfo";
import EditProfile from "@/components/EditProfile";
import UploadProfilePhoto from "@/components/UploadProfilePhoto";

export default {
  components: {
    NavBar,
    ProfileInfo,
    EditProfile,
    UploadProfilePhoto
  },
  methods: {
    editProfileInfo(info) {
      this.$refs.editDialog.openDialog(info);
    },
    uploadProfilePhoto() {
      this.$refs.uploadPhoto.openDialog();
    }
  },
  computed: {
    info() {
      return this.$store.getters["auth/GET_USER"];
    }
  }
};
</script>
