<template>
  <auth-container>
    <div>
      <v-form class="my-7">
        <div class="mt-3" v-for="(field, key) in loginFields" :key="key">
          <form-label :text="field['label']" />
          <v-text-field
            v-model="data[key]"
            @keypress.enter="loginThroughEmailAndPassword"
            :type="field.type"
            class="text-body-2"
            color="primary"
            hide-details="auto"
            autocomplete="off"
            outlined
            dense
          >
            <template #prepend-inner>
              <v-icon
                v-text="field['prepend']"
                size="18"
                color="grey lighten-1"
                class="mt-1 mr-2"
              />
            </template>
            <template v-if="field['append']" #append>
              <v-icon
                v-if="key === 'password'"
                @click="onClickAppend"
                v-text="field['append']"
                size="18"
                color="grey lighten-1"
                class="mt-1 mr-2 pointer-cursor"
              />
            </template>
          </v-text-field>
        </div>
        <v-btn
          class="my-8 text-none"
          color="secondary"
          @click="loginThroughEmailAndPassword"
          :loading="loginBtnLoading"
          block
          >Login</v-btn
        >
      </v-form>
      <!-- <div>
        <div class="d-flex align-center">
          <v-divider />
          <span class="mx-5 text-caption">Or, connect using</span>
          <v-divider />
        </div>

        <div class="my-3 d-flex justify-center">
          <v-btn
            class="text-none mx-2"
            small
            color="#EA4335"
            dark
            @click="loginThroughGoogle"
            :loading="googleLoading"
          >
            <v-icon v-text="'mdi-gmail'" size="16" left />
            Gmail
          </v-btn>
          <v-btn class="text-none mx-2" small color="#3b5998 " dark>
            <v-icon v-text="'mdi-facebook'" size="16" left />
            Facebook
          </v-btn>
        </div>
      </div> -->
    </div>
    <notice ref="snackbarNotice" />
  </auth-container>
</template>

<script>
import AuthContainer from "@/components/AuthContainer";
import FormLabel from "@/components/FormLabel";
import Notice from "@/components/Notice";

export default {
  components: {
    AuthContainer,
    FormLabel,
    Notice
  },
  data: () => {
    return {
      loginFields: {
        email: {
          type: "email",
          prepend: "fa-user-circle",
          label: "Username / Email"
        },
        password: {
          type: "password",
          prepend: "fa-key",
          append: "fa-eye",
          label: "Password"
        }
      },
      data: { email: "", password: "" },
      showPassword: false,
      googleLoading: false,
      loginBtnLoading: false
    };
  },
  methods: {
    toggleNotice(type, message) {
      this.$refs.snackbarNotice.open(type, message);
    },
    onClickAppend() {
      this.showPassword = !this.showPassword;
      this.loginFields["password"]["type"] = this.showPassword
        ? "text"
        : "password";
      this.loginFields["password"]["append"] = this.showPassword
        ? "fa-eye-slash"
        : "fa-eye";
    },
    async loginThroughEmailAndPassword() {
      try {
        this.loginBtnLoading = true;
        await this.$store.dispatch("auth/LOGIN", this.data);
        this.data = { email: null, password: null };
        this.loginBtnLoading = false;
        this.$router.push({ name: "Home" });
      } catch (error) {
        this.loginBtnLoading = false;
        this.toggleNotice("error", error.message);
        throw error;
      }
    }
  }
};
</script>
