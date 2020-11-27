<template>
  <div class="bg-color d-flex justify-center align-start">
    <v-card width="450" class="pa-8 my-10">
      <div class="d-flex align-center justify-center">
        <div class="mr-3">
          <v-img :src="require('@/assets/img/safe-logo.svg')" width="35px" />
        </div>
        <span class="primary--text text-h4 font-weight-semibold">SAFE</span>
      </div>
      <span class="text-caption text-center d-block">
        Online Mental Health Services Directory
      </span>
      <v-tabs
        :value="0"
        background-color="transparent"
        color="secondary"
        class="mt-3"
        grow
      >
        <v-tab v-text="'Login'" :to="{ name: 'Login' }" />
        <v-tab v-text="'Signup'" :to="{ name: 'Signup' }" />
      </v-tabs>
      <slot />
    </v-card>
  </div>
</template>

<script>
export default {
  computed: {
    activeTab() {
      const tabs = ["Login", "Signup"];
      return tabs.indexOf(this.$route.name);
    }
  }
};
</script>

<style scoped>
.bg-color {
  background-color: #9921e8;
  background-image: linear-gradient(315deg, #9921e8 0%, #5f72be 74%);
  height: 100%;
}
</style>
