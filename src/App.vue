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
.pre-text-layout {
  white-space: pre-wrap;
}
.gradient-theme {
  background-color: #9921e8;
  background-image: linear-gradient(315deg, #9921e8 0%, #5f72be 74%);
  height: 100%;
}
</style>
