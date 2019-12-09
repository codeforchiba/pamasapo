<template>
  <v-container fluid pa-0>
    <v-row>
      <nursery-filter @applyFilter="runFilter" />
    </v-row>
    <v-row>
      <v-col v-for="item in centers" :key="item.name" cols="12" md="6">
        <v-lazy :options="{ threshold: .5 }">
          <nursery-card :item="item" />
        </v-lazy>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import NurseryCard from "~/components/nurseries/Card";
import NurseryFilter from "~/components/nurseries/Filter";

export default {
  components: {
    NurseryCard,
    NurseryFilter
  },

  async fetch({ store }) {
    await store.dispatch("center/search");
  },

  computed: {
    ...mapGetters({
      centers: "center/filteredItems"
    })
  },

  methods: {
    ...mapActions({
      applyFilter: "center/applyFilter"
    }),

    runFilter: function(filters) {
      this.applyFilter(filters);
    }
  }
};
</script>
