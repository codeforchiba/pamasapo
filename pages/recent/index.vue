<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex v-for="item in recentCenters" :key="item.id" xs12>
        <NurseryCard :item="item.item" />
        <p class="grey--text lighten-4 float-right">
          {{ item.timestamp }}に閲覧しました
        </p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

import NurseryCard from "~/components/nurseries/Card.vue";

export default {
  components: { NurseryCard },

  async fetch({ store }) {
    await store.dispatch("center/search");
  },

  computed: {
    ...mapGetters({
      recentCenters: "recent/items"
    })
  }
};
</script>
