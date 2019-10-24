<template>
  <v-container grid-list-md text-xs-center pa-0>
    <v-layout row wrap>
      <nursery-filter @applyFilter="applyFiltertoStore" />
    </v-layout>
    <v-layout row wrap>
      <v-flex v-for="item in filteredCenters" :key="item.name" xs12>
        <nursery-card :item="item" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import NurseryCard from "~/components/nurseries/NurseryCard";
import NurseryFilter from "~/components/nurseries/Filter";

export default {
  components: {
    NurseryCard,
    NurseryFilter
  },

  data() {
    const filterItems = [
      { key: "nurserySubType", label: "許認可" },
      { key: "ownershipPublic", label: "公立" },
      { key: "ownershipPrivate", label: "私立" },
      { key: "h24CareService", label: "24時間" },
      { key: "extendedCareService", label: "延長" },
      { key: "temporaryCareService", label: "一時保育 定期" },
      { key: "spotCareService", label: "一時保育 不定期" },
      { key: "nightCareService", label: "夜間・休日" },
      { key: "numberOfParkingLot", label: "駐車場" }
    ];

    return {
      filterItems
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
  },

  async fetch({ store }) {
    await store.dispatch("center/search");
  }
};
</script>
