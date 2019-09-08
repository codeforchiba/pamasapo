<template>
  <div class="home-view">
    <v-toolbar dense>
      <a
        href="/"
        class="d-flex ml-2 router-link-active"
      >
        <img
          src="logo.png"
          width="220px"
          height="32px"
        >
      </a>
      <v-text-field
        v-model="searchKeyword"
        type="text"
        name="input-10-1"
        placeholder="住所検索..."
      />
      <v-btn
        flat
        @click="keywordSearch()"
      >
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      searchKeyword: '',
    };
  },
  methods: {
    keywordSearch() {
      alert('検索キーワード「'+this.searchKeyword+'」で検索します。')
    　this.$router.push({path:'lists'})
    }
  }
};
</script>

<style lang="scss" scoped>
.toolbar {
  background-color: #fff;
}
</style>
