<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12 v-for="item in recent_nursery_items()" :key="item.name">
        <NurseryCard :item="item.item" />
        <p class="grey--text lighten-4 float-right">{{item.timestamp}}に閲覧しました</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters} from "vuex"
import NurseryCard from "~/components/nurseries/NurseryCard.vue"

export default {
  components: { NurseryCard },
  data() {
    return {}
  },

  computed: {
    ...mapGetters({
      recent_filter_items: "recent/filter_items",
      recent_items: "recent/items",
    })
  },

  methods: {
    recent_nursery_items: function() {
      return this.recent_filter_items(this.recent_items);
    }
  },

  async fetch({ store }) {
    await store.dispatch("nursery/search")
  }
}
</script>
