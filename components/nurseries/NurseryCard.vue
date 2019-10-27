<template>
  <v-card flat>
    <v-img :src="defaultImage" contain aspect-ratio="1" max-height="300" />
    <v-card-title>
      {{ item.name }}
    </v-card-title>
    <v-card-text>
      <tag-bar :item="item" />
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>住所</v-list-item-title>
            <v-list-item-subtitle>{{ item.fullAddress }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="deep-purple accent-4" @click="open">
        詳細を見る...
      </v-btn>
      <div class="flex-grow-1"></div>
      <favorite-button :id="item.id" />
    </v-card-actions>
  </v-card>
</template>
<script>
import DefaultImage from "~/assets/image.png";
import FavoriteButton from "~/components/FavoriteButton";
import TagBar from "~/components/nurseries/TagBar";

export default {
  components: {
    FavoriteButton,
    TagBar
  },

  props: {
    item: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      defaultImage: DefaultImage
    };
  },

  methods: {
    open() {
      this.$router.push(`/nurseries/${this.item.id}`);
    }
  }
};
</script>
