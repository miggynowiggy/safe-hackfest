<template>
  <v-container fluid class="gradient-theme rounded-lg pa-10 my-5">
    <div class="text-center my-5">
      <span class="text-h4 white--text font-weight-semibold"
        >How can we help you?</span
      >
      <p class="text-body-1 white--text my-2">
        We provide various mental health products and services from legitimate
        service providers.
      </p>
    </div>
    <v-row align="center" justify="center">
      <v-col lg="6" md="12" sm="12">
        <v-text-field
          v-model="search"
          placeholder="Search keywords, titles, names"
          prepend-inner-icon="search"
          background-color="white"
          class="text-body-2"
          outlined
          rounded
        />
      </v-col>
    </v-row>
    <v-row align="center" justify="center" class="mt-n2">
      <v-col lg="6" md="12" sm="12">
        <v-slide-group multiple show-arrows v-model="filter" dark>
          <v-slide-item
            v-for="filter in search_filters"
            :key="filter.value"
            v-slot="{ active, toggle }"
            :value="filter['value']"
          >
            <v-btn
              class="mx-2 text-body-2 text-none"
              :input-value="active"
              active-class="error white--text"
              depressed
              rounded
              color="rgba(0,0,0,0.2)"
              @click="toggle"
            >
              <v-icon v-text="filter.icon" size="16" left />

              <span v-text="filter.text" />
            </v-btn>
          </v-slide-item>
        </v-slide-group>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "SearchAndFilter",
  data: () => ({
    search: null,
    search_filters: [
      { text: "Services", value: "Services", icon: "fa-user-nurse" },
      { text: "Events", value: "Events", icon: "fa-calendar-alt" },
      { text: "Support Groups", value: "Support Groups", icon: "fa-users" },
      { text: "Campaign", value: "Campaigns", icon: "fa-bullhorn" },
      { text: "Hotline", value: "Hotlines", icon: "fa-mobile-alt" }
    ],
    filter: []
  }),
  methods: {},
  watch: {
    filter(val) {
      this.$store.commit("posts/SET_FILTER_POST", val);
    },
    search(val) {
      this.$store.commit("posts/SET_SEARCH_POST", val);
    }
  }
};
</script>
<style scoped>
.border-rounded {
  border-radius: 5px;
}
</style>
