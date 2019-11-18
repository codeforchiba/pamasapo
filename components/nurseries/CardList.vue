<template>
  <div class="infinite-scroll">
    <div class="infinite-scroll-list">
      <div v-for="item in lists" :key="item.id" class="infinite-scroll-list-item">
        <NurseryCard :item="item" />
      </div>
      <infinite-loading
        ref="infiniteLoading"
        spinner="spiral"
        @infinite="infiniteHandler"
      >
        <div slot="spinner">
          読み込み中...
        </div>
        <div slot="no-more">
          ここで最後です
        </div>
        <div slot="no-results">
          検索結果がありません。
        </div>
      </infinite-loading>
    </div>
  </div>
</template>

<script>
import NurseryCard from "~/components/nurseries/Card";

export default {
  name: 'CardList',
  components: {
    NurseryCard
  },

  props: {
    listData: {
      type: Array[NurseryCard],
      required: true,
      'default': () => ({ count: 0 }) 
    }
  },

  data() {
    return {
      lists: [],
      start: 0,
      end: 50,
      windowSize : 50,
    }
  },

  watch: {
    listData: function() {
      this.lists=[];
      this.start=0;
      this.end=this.windowSize;
      this.$refs.infiniteLoading.stateChanger.reset();
    }
  },
  
  methods: {
    infiniteHandler($state) {

      if (this.end > this.listData.length) {
        $state.complete()
      } else {
        this.getLists()
        $state.loaded()
      }
    },
    getLists() {
      this.lists = this.lists.concat(this.listData.slice(this.start, this.end))
      this.start = this.start + this.windowSize
      this.end = this.end + this.windowSize
    }
  }
}
</script>