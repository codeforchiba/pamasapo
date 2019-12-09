<template>
  <v-btn icon large :color="buttonColor" @click.stop="toggleFavorite">
    <v-icon>favorite</v-icon>
  </v-btn>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { REGISTER_FAVORITE, UNREGISTER_FAVORITE, NOTIFY_SYSTEM } from "../store/mutation-types";

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
      unregister: UNREGISTER_FAVORITE,
      notify: NOTIFY_SYSTEM
    }),

    toggleFavorite() {
      if (this.favorited(this.id)) {
        this.unregister(this.id);
        this.notify({ type: 'info', message: 'お気に入りを削除しました。' })
      } else {
        this.register(this.id);
        this.notify({ type: 'info', message: 'お気に入りに追加しました。' })
      }
    }
  }
};
</script>
