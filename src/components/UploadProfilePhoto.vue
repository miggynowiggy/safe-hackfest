<template>
  <v-dialog
    max-width="800"
    v-model="dialogState"
    overlay-opacity="0.95"
    scrollable
  >
    <v-card height="100%" class="pa-10"> </v-card
  ></v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogState: false
    };
  },
  methods: {
    openDialog() {
      this.dialogState = true;
    }
  }
};
</script>

<style lang="scss" scoped></style>
