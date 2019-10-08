<template>
  <v-btn icon :color="buttonColor" @click="toggleFavorite">
    <v-icon>favorite</v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },

  computed: {
    buttonColor() {
      return this.canFavorited ? null : "pink";
    },

    canFavorited() {
      return !this.$store.state.favorite.items.includes(this.id);
    }
  },

  methods: {
    toggleFavorite() {
      if (this.canFavorited) {
        this.$store.commit("favorite/add", this.id);
      } else {
        this.$store.commit("favorite/remove", this.id);
      }
    }
  }
};
</script>
