<template>
  <v-container grid-list-md text-xs-center pa-0>
    <v-layout row wrap>
      <v-flex v-for="item in favorites" :key="item.id" xs12>
        <nursery-card :item="item" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import _ from "lodash";

import NurseryCard from "~/components/nurseries/Card";

export default {
  components: {
    NurseryCard
  },

  async fetch({ store }) {
    await store.dispatch("center/search");
  },

  computed: {
    ...mapGetters({
      centers: "center/items",
      favoriteCenters: "favorite/items"
    }),

    favorites() {
      return _.filter(this.centers, (c) => this.favoriteCenters.includes(c.id));
    }
  }
};
</script>
