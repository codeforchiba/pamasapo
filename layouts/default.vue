<template>
  <v-app>
    <app-bar @open-drawer="openDrawer" />
    <filter-drawer :open="drawer" @close-drawer="closeDrawer" />
    <v-main app>
      <nuxt />
    </v-main>
    <navigation app />
    <notification />
  </v-app>
</template>

<script>
import AppBar from "~/components/AppBar"
import FilterDrawer from "~/components/Filter"
import Navigation from "~/components/Navigation"
import Notification from "~/components/Notification"

export default {
  components: {
    AppBar,
    FilterDrawer,
    Navigation,
    Notification
  },

  data() {
    return {
      drawer: false
    }
  },

  methods: {
    openDrawer() {
      this.drawer = true
    },

    closeDrawer() {
      this.drawer = false
    }
  }
};
</script>
