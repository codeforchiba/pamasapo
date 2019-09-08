<template>
  <v-bottom-navigation
    app
    fixed
    color="pink lighten-2"
  >
    <v-btn to="/nurseries/">
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
  </v-bottom-navigation>
</template>
