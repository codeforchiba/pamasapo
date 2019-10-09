<template>
  <v-btn icon :color="buttonColor" @click="toggleFavorite">
    <v-icon>favorite</v-icon>
  </v-btn>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import {
  REGISTER_FAVORITE,
  UNREGISTER_FAVORITE
} from "../store/mutation-types";

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },

  computed: {
    ...mapGetters({
      favorited: `favorite/included`
    }),

    buttonColor() {
      return this.favorited(this.id) ? "pink" : null;
    }
  },

  methods: {
    ...mapMutations({
      register: REGISTER_FAVORITE,
      unregister: UNREGISTER_FAVORITE
    }),

    toggleFavorite() {
      if (this.favorited(this.id)) {
        this.unregister(this.id);
      } else {
        this.register(this.id);
      }
    }
  }
};
</script>
