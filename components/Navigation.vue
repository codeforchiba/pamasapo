<template>
  <v-bottom-navigation :app="app" fixed color="pink lighten-2">
    <v-btn to="/">
      <span>リスト表示</span>
      <v-icon>list</v-icon>
    </v-btn>
    <v-btn to="/maps/">
      <span>地図表示</span>
      <v-icon>map</v-icon>
    </v-btn>
    <v-btn to="/favorites/">
      <span>お気に入り</span>
      <v-icon>favorite</v-icon>
    </v-btn>
    <v-btn to="/recent/">
      <span>履歴</span>
      <v-icon>history</v-icon>
    </v-btn>
    <v-btn @click="openForm">
      <span>フィードバック</span>
      <v-icon>feedback</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
const typeform = require('@typeform/embed')

const FORM_URL = 'https://codeforchiba.typeform.com/to/ozCQwu'

export default {
  props: {
    app: Boolean
  },

  methods: {
    openForm() {
      typeform.makePopup(FORM_URL, {autoOpen: true})
    }
  }
}
</script>

<style scoped>
.v-item-group.v-bottom-navigation .v-btn.v-size--default {
  height: inherit;
}
</style>
