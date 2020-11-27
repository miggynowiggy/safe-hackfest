<template>
  <v-app class="body-color">
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({})
};
</script>

<style scoped>
.body-color {
  background-color: #eff1f5 !important;
}
</style>

<style>
.pointer-cursor {
  cursor: pointer;
}
</style>
