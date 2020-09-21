<template>
  <v-app>
    <v-main app>
      <nuxt />
    </v-main>
    <navigation app />
    <notification />
  </v-app>
</template>

<script>
import Navigation from "~/components/Navigation";
import Notification from "~/components/Notification";

export default {
  components: {
    Navigation,
    Notification
  }
};
</script>
