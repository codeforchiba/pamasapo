<template>
  <v-container fluid pa-0 class="grey lighten-5">
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
import { mapGetters } from "vuex"

import NurseryCard from "~/components/nurseries/Card"

export default {
  components: {
    NurseryCard
  },

  async fetch({ store }) {
    await store.dispatch("center/search");
  },

  computed: {
    ...mapGetters({
      centers: "center/filteredItems"
    })
  }
};
</script>
