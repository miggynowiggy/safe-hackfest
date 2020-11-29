<template>
  <v-snackbar
    v-model="snackbarState"
    top
    right
    dark
    rounded
    :color="snackbarColor"
    >{{ snackbarMessage }}</v-snackbar
  >
</template>
<script>
export default {
  name: "Notice",
  data () {
    return {
      snackbarMessage: null,
      snackbarState: false,
      snackbarColor: "success"
    }
  },
  methods: {
    open(state, message) {
      this.snackbarColor = state.toLowerCase() === "success"
        ? "success"
        : "error";
      this.snackbarMessage = message;
      this.snackbarState = true;
    }
  }
}
</script>