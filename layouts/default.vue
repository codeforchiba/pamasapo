<template>
  <v-app>
    <v-content app>
      <nuxt />
    </v-content>
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
