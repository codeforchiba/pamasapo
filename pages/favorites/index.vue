<template>
  <v-container
    grid-list-md
    text-xs-center
  >
    <v-layout
      row
      wrap
    >
      <v-flex xs6>
        <v-select
          :items="filter_items"
          label="絞り込み"
          multiple
          chips
          filled
        />
      </v-flex>

      <v-flex xs6>
        <v-select
          :items="sort_items"
          label="並び替え"
          chips
          filled
        />
      </v-flex>
    </v-layout>
    <v-layout
      row
      wrap
    >
      <v-flex xs6>
        <v-btn
          block
          color="grey lighten-3"
        >
          常時
        </v-btn>
      </v-flex>

      <v-flex xs6>
        <v-btn
          block
          color="grey lighten-3"
        >
          新年度
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout
      row
      wrap
    >
      <v-flex
        v-for="item in favorite_nursery_items()"
        :key="item.id"
        xs12
      >
        <nursery-card :item="item" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import NurseryCard from "~/components/nurseries/NurseryCard";

export default {
  components: {
    NurseryCard
  },

  data() {
    return {
      filter_items: ['許認可',
        '私立・公立',
        '開園時間',
        '閉園時間',
        '24時間',
        '延長',
        '一時保育',
        '夜間・休日',
        '駐車場'],
      sort_items: ['許認可',
        '私立・公立',
        '開園時間',
        '閉園時間',
        '24時間',
        '延長',
        '一時保育',
        '夜間・休日',
        '駐車場'],
    }
  },

  computed: {
    ...mapGetters({
      nursery_filter_items: 'nursery/filter_items',
      favorite_items: 'favorite/items',
    }),
  },

  async fetch({store}) {
    await store.dispatch('nursery/search')
  },

  methods: {
    favorite_nursery_items: function () {
      const ids = this.favorite_items
      return this.nursery_filter_items(ids)
    },
  },
}
</script>
