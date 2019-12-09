<template>
  <v-container>
    <template v-if="hasFavorite">
      <v-list three-line>
        <template v-for="(item, index) in favorites">
          <v-divider v-if="index > 0" :key="index" />
          <v-list-item :key="item.id" @click="open(item)">
            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ item.fullAddress }}</v-list-item-subtitle>
              <tag-bar :item="item" :small="true" />
            </v-list-item-content>
            <v-list-item-icon>
              <favorite-button :id="item.id" />
            </v-list-item-icon>
          </v-list-item>
        </template>
      </v-list>
    </template>
    <v-row v-else>
      <v-col cols="12">
        <p class="text-sm-center">
          気になる保育施設は
          <v-icon color="pink">
            favorite
          </v-icon>
          を使って、お気に入りに設定しましょう。
        </p>
      </v-col>
    </v-row>
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

  data() {
    return {
      title: 'お気に入り'
    }
  },

  computed: {
    ...mapGetters({
      centers: "center/items",
      favoriteCenters: "favorite/items"
    }),

    hasFavorite() {
      return this.favoriteCenters.length > 0
    },

    favorites() {
      return _.filter(this.centers, (c) => this.favoriteCenters.includes(c.id));
    }
  },

  methods: {
    open(item) {
      this.$router.push(`/nurseries/${item.id}`);
    }
  },

  head() {
    return {
      title: this.title
    }
  }
};
</script>
