<template>
  <v-container grid-list-md text-xs-center pa-0>
    <v-list three-line>
      <template v-for="(item, index) in favorites">
        <v-divider v-if="index > 0" :key="item.id" />
        <v-list-item :key="item.id" @click="open(item)">
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ item.fullAddress }}</v-list-item-subtitle>
            <tag-bar :item="item" />
          </v-list-item-content>
          <v-list-item-icon>
            <favorite-button :id="item.id" />
          </v-list-item-icon>
        </v-list-item>
      </template>
    </v-list>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
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
      centers: "center/items",
      favoriteCenters: "favorite/items"
    }),

    favorites() {
      return _.filter(this.centers, (c) => this.favoriteCenters.includes(c.id));
    }
  },

  methods: {
    open(item) {
      this.$router.push(`/nurseries/${item.id}`);
    }
  }
};
</script>
