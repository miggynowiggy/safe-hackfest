<template>
  <auth-container>
    <v-form class="mt-7 mb-5">
      <form-label text="I want to create an account as ..." />
      <v-select
        v-model="selectedUser"
        @change="cleanFormFields"
        :items="userTypes"
        hide-details="auto"
        class="text-body-2"
        dense
        outlined
      />
      <div class="my-5">
        <div v-if="selectedUser === 'provider'">
          <div class="mt-3" v-for="(field, key) in providerFields" :key="key">
            <form-label :text="field['label']" />
            <v-text-field
              v-model="provider[key]"
              class="text-body-2"
              :type="field.type || 'text'"
              color="primary"
              hide-details="auto"
              autocomplete="off"
              outlined
              dense
            >
              <template v-if="field['append']" #append>
                <v-icon
                  v-if="key === 'password'"
                  @click="onClickAppend(providerFields, key)"
                  v-text="field['append']"
                  size="18"
                  color="grey lighten-1"
                  class="mt-1 mr-2 pointer-cursor"
                />
              </template>
              <template v-if="field['prepend']" #prepend-inner>
                <v-icon
                  v-text="field['prepend']"
                  size="18"
                  color="grey lighten-1"
                  class="mt-1 mr-2 pointer-cursor"
                />
              </template>
            </v-text-field>
          </div>
          <v-checkbox
            v-model="provider['isAgree']"
            dense
            hide-details
            class="mt-5"
          >
            <template #label>
              <div class="text-caption text-justify">
                I have read and agreed with the
                <span class="primary--text font-weight-medium">
                  Terms and Conditions.
                </span>
              </div>
            </template>
          </v-checkbox>
        </div>
        <div v-else>
          <div class="mt-3" v-for="(field, key) in userFields" :key="key">
            <form-label :text="field['label']" />
            <v-text-field
              v-model="user[key]"
              :type="field.type || 'text'"
              class="text-body-2"
              color="primary"
              hide-details="auto"
              autocomplete="off"
              outlined
              dense
            >
              <template v-if="field['append']" #append>
                <v-icon
                  v-if="key === 'password'"
                  @click="onClickAppend(userFields, key)"
                  v-text="field['append']"
                  size="18"
                  color="grey lighten-1"
                  class="mt-1 mr-2 pointer-cursor"
                />
              </template>
              <template v-if="field['prepend']" #prepend-inner>
                <v-icon
                  v-text="field['prepend']"
                  size="18"
                  color="grey lighten-1"
                  class="mt-1 mr-2 pointer-cursor"
                />
              </template>
            </v-text-field>
          </div>
          <v-checkbox v-model="user['isAgree']" dense hide-details class="mt-5">
            <template #label>
              <div class="text-caption text-justify">
                I have read and agreed with the
                <span class="primary--text font-weight-medium">
                  Terms and Conditions.
                </span>
              </div>
            </template>
          </v-checkbox>
        </div>
      </div>
      <v-btn
        class="mt-8 text-none"
        color="secondary"
        block
        :loading="registerLoading"
        :disabled="!user['isAgree']"
        @click="register"
        >Signup</v-btn
      >
    </v-form>
    <v-snackbar
      v-model="snackBarState"
      top
      right
      dark
      rounded
      color="error"
      :timeout="5000"
      >{{ snackBarMessage }}</v-snackbar
    >
  </auth-container>
</template>

<script>
import AuthContainer from "@/components/AuthContainer";
import FormLabel from "@/components/FormLabel";
export default {
  components: {
    AuthContainer,
    FormLabel
  },
  data: function() {
    return {
      selectedUser: this.$route.hash === "#provider" ? "provider" : "user",
      userTypes: [
        { text: "User", value: "user" },
        { text: "Service Provider", value: "provider" }
      ],
      userFields: {
        firstName: { label: "First Name" },
        lastName: { label: "Last Name" },
        email: { type: "email", label: "Email", prepend: "fa-at" },
        password: {
          type: "password",
          label: "Password",
          append: "fa-eye",
          prepend: "fa-key"
        }
      },
      providerFields: {
        company: {
          label: "Company / Institution / Group",
          prepend: "fa-building"
        },
        email: { type: "email", label: "Email", prepend: "fa-at" },
        password: {
          type: "password",
          label: "Password",
          append: "fa-eye",
          prepend: "fa-key"
        }
      },
      user: {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        isAgree: null
      },
      provider: { company: null, email: null, password: null, isAgree: null },
      showPassword: false,
      registerLoading: false,
      snackBarState: false
    };
  },
  methods: {
    openSnackBar(message) {
      this.snackBarMessage = message;
      this.snackBarState = true;
    },
    cleanFormFields(value) {
      if (value === "provider")
        Object.keys(this.user).forEach(field => (this.user[field] = null));
      else
        Object.keys(this.provider).forEach(
          field => (this.provider[field] = null)
        );
    },
    onClickAppend(fields, key) {
      if (key === "password") {
        this.showPassword = !this.showPassword;
        fields[key]["type"] = this.showPassword ? "text" : "password";
        fields[key]["append"] = this.showPassword ? "fa-eye-slash" : "fa-eye";
      }
    },
    async register() {
      try {
        this.registerLoading = true;
        
        if(this.user.password !== this.user.confirmPassword) {
          this.openSnackBar("Confirm Password does not match!");
          this.registerLoading = false;
          return;
        }

        if (this.selectedUser === "provider") {
          await this.$store.dispatch("auth/SIGN_UP", this.provider);
        } else {
          await this.$store.dispatch("auth/SIGN_UP", this.user);
        }

        this.registerLoading = false;
        this.$router.push({ name: "Home" });
      } catch (error) {
        this.registerLoading = false;
        this.openSnackBar(error.message);
        throw error;
      }
    }
  }
};
</script>
