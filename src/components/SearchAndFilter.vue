<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col lg="6" md="12" sm="12">
        <v-text-field
          v-model="search"
          outlined
          dense
          rounded
          placeholder="serach..."
          prepend-inner-icon="search"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row align="center" justify="center" class="my-n4">
      <v-col lg="6" md="12" sm="12">
        <v-slide-group multiple show-arrows v-model="filter">
          <v-slide-item
            v-for="filter in search_filters"
            :key="filter"
            v-slot="{ active, toggle }"
            :value="filter.toLowerCase()"
          >
            <v-btn
              class="mx-2"
              :input-value="active"
              active-class="primary white--text"
              depressed
              rounded
              @click="toggle"
            >
              {{ filter }}
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
    search_filters: ["Services", "Events", "Support Groups", "Campaigns"],
    filter: []
  }),
  methods: {},
  watch: {
    filter(val) {
      console.log(val);
    }
  }
};
</script>
<style scoped>
.border-rounded {
  border-radius: 5px;
}
</style>
