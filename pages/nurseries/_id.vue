<template>
  <v-container pa-0>
    <v-row no-gutters>
      <v-col cols="12">
        <v-card flat class="pa-3">
          <h1>{{ item.name }}</h1>
          <p class="subtitle-1 grey--text">
            {{ item.kana }}
          </p>
          <div class="text-right">
            <favorite-button :id="item.id" />
          </div>
          <tag-bar :item="item" />
        </v-card>
      </v-col>
      <v-col cols="12">
        <nursery-summary :item="item" />
      </v-col>
      <v-col cols="12">
        <map-view :item="item" />
      </v-col>
      <v-col cols="12">
        <nursery-detail :item="item" />
      </v-col>
      <v-col cols="12">
        <nursery-service :item="item" />
      </v-col>
      <v-col cols="12">
        <nursery-status :item="item" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

import FavoriteButton from "~/components/FavoriteButton";
import Map from "~/components/nurseries/Map";
import NurseryDetail from "~/components/nurseries/Detail";
import NurseryService from "~/components/nurseries/Service";
import NurseryStatus from "~/components/nurseries/Status";
import NurserySummary from "~/components/nurseries/Summary";
import TagBar from "~/components/nurseries/TagBar";

export default {
  components: {
    FavoriteButton,
    NurseryDetail,
    NurseryService,
    NurseryStatus,
    NurserySummary,
    TagBar,
    "map-view": Map
  },

  computed: {
    ...mapGetters({
      item: "center/current"
    })
  },

  watch: {
    item(newValue) {
      this.$store.commit("recent/add", newValue.id);
    }
  },

  async fetch({ store, params }) {
    await store.dispatch("center/load", params.id);
  }
};
</script>
