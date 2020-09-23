<template>
  <v-app-bar app dense flat color="white">
    <v-toolbar-title>
      <v-img :src="logoPath" width="240" height="48" contain />
    </v-toolbar-title>
    <v-spacer />
    <v-btn v-if="enableFilter" icon @click="openDrawer">
      <v-icon>search</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  computed: {
    logoPath() {
      return require("assets/logo.png");
    },

    enableFilter() {
      return this.$route.path === "/"
    }
  },

  methods: {
    openDrawer() {
      this.$emit('open-drawer')
    }
  }
}
</script>
