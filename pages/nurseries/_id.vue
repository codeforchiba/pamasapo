<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <h1>{{ item.name }}</h1>
        <p class="subtitle-1 grey--text">{{ item.kana }}</p>
        <tag-bar :item="item" />
        <nursery-summary :item="item" />
        <nursery-detail :item="item" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

import NurseryDetail from "~/components/nurseries/NurseryDetail";
import NurserySummary from "~/components/nurseries/Summary";
import TagBar from "~/components/nurseries/TagBar";

export default {
  components: {
    NurseryDetail,
    NurserySummary,
    TagBar
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
