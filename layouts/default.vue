<template>
  <v-app>
    <v-content app>
      <nuxt />
    </v-content>
    <navigation />
  </v-app>
</template>

<script>
import Navigation from '~/components/Navigation'

export default {
  components: {
    navigation: Navigation
  }
}
</script>
