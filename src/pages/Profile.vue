<template>
  <div>
    <nav-bar />
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="10" xl="8">
            <profile-info
              :info="provider"
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
  data() {
    return {
      provider: {
        name: "Valenzuela City Government",
        email: "valenzuela.city@gov.ph",
        officeHours: "08:00 - 17:00",
        address:
          "OFFICE ADDRESS, 3rd Floor, Executive Building Valenzuela\
          City Hall, MacArthur Highway, Barangay Karuhatan, Valenzuela\
          City, Metro Manila, Philippines",
        website: "www.valenzuela.gov.ph",
        mobile: "09112233445",
        posts: [
          {
            id: "1",
            title: "VALENZUELA CITY MENTAL HEALTH AWARENESS",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. \
      ",
            author: "Department of Health",
            type: "Advocacy",
            banner:
              "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          }
        ],
        type: "provider"
      },
      user: {
        firstName: "Juan",
        lastName: "Dela Cruz",
        email: "john.doe@gmail.com",
        birthday: "2020-07-20",
        mobile: "09112233445",
        posts: [
          {
            id: "1",
            title: "VALENZUELA CITY MENTAL HEALTH AWARENESS",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. \
      ",
            author: "Department of Health",
            type: "Advocacy",
            banner:
              "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          }
        ],
        type: "user"
      }
    };
  }
};
</script>
