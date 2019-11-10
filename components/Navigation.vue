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
  </v-bottom-navigation>
</template>

<script>
export default {
  props: {
    app: Boolean
  }
}
</script>

<style scoped>
.v-item-group.v-bottom-navigation .v-btn.v-size--default {
  height: inherit;
}
</style>
