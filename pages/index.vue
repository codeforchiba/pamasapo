<template>
  <v-container fluid pa-0>
    <v-row>
      <nursery-filter @applyFilter="applyFiltertoStore" />
    </v-row>
    <v-row>
      <v-col v-for="item in filteredCenters" :key="item.name" cols="12">
        <nursery-card :item="item" />
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

  data() {
    return {
      Object
    };
  },

  computed: {
    ...mapGetters({
      centers: "center/filteredItems"
    }),
    filteredCenters: function() {
      var data = this.centers;
      return data;
    }
  },

  methods: {
    ...mapActions({
      applyFilter: "center/applyFilter"
    }),

    applyFiltertoStore: function(filters) {
      this.applyFilter(filters);
    }
  }
};
</script>
