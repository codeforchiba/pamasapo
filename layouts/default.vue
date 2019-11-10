<template>
  <v-app>
    <v-content app>
      <nuxt />
    </v-content>
    <navigation app />
  </v-app>
</template>

<script>
import Navigation from "~/components/Navigation";

export default {
  components: {
    Navigation
  }
};
</script>
