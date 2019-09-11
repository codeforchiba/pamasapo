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
import { mapGetters } from "vuex";
import NurseryCard from "~/components/nurseries/NurseryCard.vue";

export default {
  components: { NurseryCard },
  data() {
    return {};
  },

  computed: {
    ...mapGetters({
      nursery_filter_items: "nursery/filter_items",
      recent_items: "recent/items",
    })
  },

  methods: {
    recent_nursery_items: function() {
      const items = this.recent_items;
      const ids = [];
      items.forEach(function(item) {
        ids.push(item.id);
      });
      const ns = this.nursery_filter_items(ids);
      const ns_hash = {};
      ns.forEach((nursery) =>  {
        ns_hash[nursery.id] = nursery;
      })

      const nurseries = [];
      items.forEach(function(item) {
        let d = new Date(item.timestamp)
        nurseries.push({item: ns_hash[item.id],timestamp: `${d.toLocaleDateString()} ${`${d.getHours()}時${d.getMinutes()}分`}`});
      });

      return nurseries;
    }
  },

  async fetch({ store }) {
    await store.dispatch("nursery/search");
  }
};
</script>
