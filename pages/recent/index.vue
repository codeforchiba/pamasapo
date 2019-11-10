<template>
  <v-container>
    <template v-if="hasHistory">
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
                <tag-bar :item="value.item" :small="true" />
              </v-list-item-content>
              <v-list-item-icon>
                <favorite-button :id="value.item.id" />
              </v-list-item-icon>
            </v-list-item>
          </template>
        </template>
      </v-list>
      <v-card flat>
        <v-card-actions>
          <v-spacer />
          <v-btn color="red darken-2" text @click="clear">
            履歴をすべて削除する
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
    <v-row v-else>
      <v-col cols="12">
        <p class="text-center">
          閲覧した保育施設の履歴が表示されます。
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { DateTime } from "luxon";
import _ from "lodash";

import FavoriteButton from "~/components/FavoriteButton";
import TagBar from "~/components/nurseries/TagBar";
import { CLEAR_HISTORY } from "../../store/mutation-types";

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

    hasHistory() {
      return this.recentCenters.length > 0
    },

    groupedItems() {
      return _.groupBy(this.recentCenters, (item) => {
        return DateTime.fromISO(item.timestamp).toFormat('yyyy-LL-dd')
      })
    }
  },

  methods: {
    ...mapMutations({
      clearHistory: CLEAR_HISTORY
    }),

    clear() {
      this.clearHistory();
    }
  }
};
</script>
