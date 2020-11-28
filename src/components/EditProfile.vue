<template>
  <v-dialog width="600" v-model="dialogState" overlay-opacity="0.95" scrollable>
    <v-card height="100%">
      <div class="d-flex flex-row-reverse">
        <v-btn class="mr-5 mt-3" icon @click="dialogState = !dialogState" large>
          <v-icon v-text="'fa-times'" />
        </v-btn>
      </div>
      <v-form class="px-10 pb-10">
        <div class="d-flex align-center">
          <v-icon v-text="'fa-user-edit'" color="primary" size="18" left />
          <span class="text-h6 primary--text">Edit Profile</span>
        </div>
        <div>
          <!-- TODO: file upload here-->
        </div>
        <div class="mt-5">
          <div
            v-for="(field, key) in fields[info.type]"
            :key="key"
            class="my-4"
          >
            <form-label :text="field.name" />
            <div v-if="field.type === 'time'">
              <v-row dense align="center">
                <v-col>
                  <v-text-field
                    v-model="info['openingTime']"
                    class="text-body-2"
                    :type="field.type"
                    dense
                    color="primary"
                    outlined
                    hide-details="auto"
                  />
                </v-col>
                <span class="text-body-2 mx-4">to</span>
                <v-col>
                  <v-text-field
                    v-model="info['closingTime']"
                    class="text-body-2"
                    :type="field.type"
                    dense
                    color="primary"
                    outlined
                    hide-details="auto"
                  />
                </v-col>
              </v-row>
            </div>
            <div v-else-if="field.type === 'textarea'">
              <v-textarea
                v-model="info[key]"
                dense
                class="text-body-2"
                color="primary"
                outlined
                rows="3"
                hide-details="auto"
                auto-grow
              />
            </div>
            <div v-else>
              <v-text-field
                v-model="info[key]"
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
          @click="saveChanges" :loading="saveBtnLoading">
          <v-icon v-text="'fa-save'" size="16" left />
          Save Changes
        </v-btn>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script>
import FormLabel from "@/components/FormLabel";
import clone from 'lodash/cloneDeep';

export default {
  components: {
    FormLabel
  },
  data() {
    return {
      info: {},
      sampleUsername: "valenzuela.city@gov.ph",
      dialogState: false,
      fields: {
        provider: {
          name: { name: "Display Name" },
          officeHours: { type: "time", name: "Office Hours" },
          address: { type: "textarea", name: "Address" },
          phoneNumber: { name: "Mobile Phone" },
          telephone: { name: "Telephone" },
          website: { type: "url", name: "Website" }
        },
        individual: {
          name: { name: "Full Name" },
          phoneNumber: { name: "Mobile Phone" },
          birthday: { type: "date", name: "Birthday (dd-mm-yyyy)" }
        }
      },
      saveBtnLoading: false,
    };
  },
  computed: {
    sameEmail: {
      get: function() {
        return this.sampleUsername === this.info["email"];
      },
      set: function(newValue) {
        if (newValue) this.info["email"] = this.sampleUsername;
        else this.info["email"] = null;
      }
    },

  },
  methods: {
    openDialog(info) {
      if (info.officeHours) {
        const [openingTime, closingTime] = info.officeHours.split(" - ");
        this.$set(info, "openingTime", openingTime);
        this.$set(info, "closingTime", closingTime);
      }

      this.info = Object.assign({}, info);

      this.dialogState = true;
    },
    async saveChanges() {
      try {
        this.saveBtnLoading = true;
        if(this.info.type === 'provider') {
          await this.saveProvider();

        } else {
          await this.saveIndividual();
        }

        this.saveBtnLoading = false;
        this.dialogState = false;
        this.$emit("showNotice", 'success', 'Profile updated!');
      } catch(error) {
        this.saveBtnLoading = false;
        this.dialogState = false;
        this.$emit("showNotice", 'error', 'Profile not updated!');
        throw error;
      }
    },

    async saveProvider() {
      try {
        const {
          id, name, address, closingTime,
          openingTime, phoneNumber, telephone, website
        } = this.info;

        await this.$store.dispatch('auth/UPDATE_USER', {
          id,
          newDetails: {
            name,
            address: address || null,
            phoneNumber: phoneNumber || null,
            telephone: telephone || null,
            website: website || null,
            closingTime: closingTime || null,
            openingTime: openingTime || null
          }
        });

        return true;
      } catch(error) {
        throw error;
      }
    },

    async saveIndividual() {
      try {
        const { id, name, email, phoneNumber, birthday } = this.info;
        await this.$store.dispatch('auth/UPDATE_USER', {
          id,
          newDetails: {
            name,
            phoneNumber: phoneNumber || null,
            birthday: birthday || null
          }
        });

        return true;
      } catch(error) {
        throw error;
      }
    },
  }
};
</script>
