<template>
  <v-container grid-list-md text-xs-center pa-0>
    <v-layout row wrap>
      <nursery-filter />
    </v-layout>
    <v-layout row wrap>
      <v-flex v-for="item in filteredCenters" :key="item.name" xs12>
        <nursery-card :item="item" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

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

    const sortItems = [
      { key: "openingTime", label: "開園時間" },
      { key: "closingTime", label: "閉園時間" },
      { key: "numberOfParkingLot", label: "駐車場" }
    ];

    const sortOrders = {};

    Object.keys(sortItems).forEach(function(key) {
      sortOrders[key] = 1;
    });

    return {
      filterItems,
      sortItems,
      filterCategory: [],
      sortCategory: [],
      sortOrders: sortOrders
    };
  },

  computed: {
    ...mapGetters({
      centers: "center/items"
    }),

    filteredCenters: function() {
      var filter_category = this.filterCategory;
      var data = this.centers;

      data = data.filter(row => {
        if (
          ~filter_category.indexOf("nurserySubType") &&
          row.nursery.facility.ownership == "認可外保育施設"
        ) {
          return false;
        }
        if (
          ~filter_category.indexOf("ownershipPublic") &&
          row.nursery.facility.ownership == "私立"
        ) {
          return false;
        }
        if (
          ~filter_category.indexOf("ownershipPrivate") &&
          row.nursery.facility.ownership == "公立"
        ) {
          return false;
        }
        if (
          ~filter_category.indexOf("numberOfParkingLot") &&
          row.nursery.facility.hasParkingLot == false
        ) {
          return false;
        }
        if (
          ~filter_category.indexOf("temporaryCareService") &&
          row.nursery.service.temporaryCareService == false
        ) {
          return false;
        }
        if (
          ~filter_category.indexOf("spotCareService") &&
          row.nursery.service.spotCareService == false
        ) {
          return false;
        }
        if (
          ~filter_category.indexOf("nightCareService") &&
          row.nursery.service.nightCareService == false
        ) {
          return false;
        }
        if (
          ~filter_category.indexOf("h24CareService") &&
          row.nursery.service.h24CareService == false
        ) {
          return false;
        }
        if (
          ~filter_category.indexOf("extendedCareService") &&
          row.nursery.service.extendedCareService == false
        ) {
          return false;
        }
        return row;
      });

      let sortKey = this.sortCategory;
      let order = this.sortOrders[sortKey] || 1;

      if (sortKey == "numberOfParkingLot") {
        data = data.slice().sort(function(a, b) {
          a = a.nursery.facility[sortKey];
          b = b.nursery.facility[sortKey];
          return (a - b) * order;
        });
      }

      if (sortKey == "openingTime") {
        data = data.slice().sort(function(a, b) {
          a = a.nursery.facility[sortKey].toString();
          b = b.nursery.facility[sortKey].toString();
          if (a < b) {
            return -1;
          } else if (a > b) {
            return 1;
          }
          return 0;
        });
      }

      if (sortKey == "closingTime") {
        data = data.slice().sort(function(a, b) {
          a = a.nursery.facility[sortKey].toString();
          b = b.nursery.facility[sortKey].toString();
          if (a < b) {
            return -1;
          } else if (a > b) {
            return 1;
          }
          return 0;
        });
      }

      return data;
    }
  },

  async fetch({ store }) {
    await store.dispatch("center/search");
  }
};
</script>
