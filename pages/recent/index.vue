<template>
  <v-container grid-list-md text-xs-center pa-0>
    <v-list three-line>
      <template v-for="(values, key) in groupedItems">
        <v-subheader :key="key">
          {{ key }}
        </v-subheader>
        <template v-for="(value, index) in values">
          <v-divider v-if="index > 0" :key="value.item.id" />
          <v-list-item :key="value.item.id" @click="open(value.item)">
            <v-list-item-content>
              <v-list-item-title>{{ value.item.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ value.item.fullAddress }}</v-list-item-subtitle>
              <tag-bar :item="value.item" />
            </v-list-item-content>
            <v-list-item-icon>
              <favorite-button :id="value.item.id" />
            </v-list-item-icon>
          </v-list-item>
        </template>
      </template>
    </v-list>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { DateTime } from "luxon";
import _ from "lodash";

import FavoriteButton from "~/components/FavoriteButton";
import TagBar from "~/components/nurseries/TagBar";

export default {
  components: {
    FavoriteButton,
    TagBar
  },

  async fetch({ store }) {
    await store.dispatch("center/search");
  },

  computed: {
    ...mapGetters({
      recentCenters: "recent/items"
    }),

    groupedItems() {
      return _.groupBy(this.recentCenters, (item) => {
        return DateTime.fromISO(item.timestamp).toFormat('yyyy-LL-dd')
      })
    }
  }
};
</script>
