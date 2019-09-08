<template>
  <v-btn
    v-if="canFavorited"
    color="amber"
    @click="addFavorite"
  >
    <v-icon>favorite</v-icon>
    お気に入りに追加
  </v-btn>
  <v-btn
    v-else
    color=""
    @click="removeFavorite"
  >
    <v-icon>favorite</v-icon>
    お気に入りから削除
  </v-btn>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
  },

  computed: {
    canFavorited() {
      return !(this.$store.state.favorite.items.includes(this.id))
    },
  },

  methods: {
    addFavorite() {
      this.$store.commit('favorite/add', this.id)
    },

    removeFavorite() {
      this.$store.commit('favorite/remove', this.id)
    }
  },
}
</script>
