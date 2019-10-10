<template>
  <v-card flat>
    <v-img :src="default_image" contain aspect-ratio="1" max-height="300" />
    <v-card-title>
      {{ item.name }}
    </v-card-title>
    <v-card-text>
      <v-chip-group>
        <v-chip
          v-for="tag in tags"
          :key="tag.value"
          :color="tagColor(tag.type)"
        >
          {{ tag.value }}
        </v-chip>
      </v-chip-group>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>住所</v-list-item-title>
            <v-list-item-subtitle>{{ address }}</v-list-item-subtitle>
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

export default {
  components: {
    FavoriteButton
  },

  props: {
    item: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      default_image: DefaultImage
    };
  },

  computed: {
    tags() {
      return this.item.tags;
    },

    address() {
      return `${this.item.prefecture}${this.item.city}${this.item.ward}${this.item.address}`;
    },

    openingHours() {
      return `${this.item.nursery.facility.openingTime} 〜 ${this.item.nursery.facility.closingTime}`;
    },

    parkingLot() {
      if (this.item.nursery.facility.hasParkingLot) {
        return `${this.item.nursery.facility.numberOfParkingLot}台`;
      } else {
        return "なし";
      }
    }
  },

  methods: {
    tagColor(type) {
      if (type === "service") {
        return "pink lighten-4";
      } else {
        return null;
      }
    },

    open() {
      this.$router.push(`/nurseries/${this.item.id}`);
    }
  }
};
</script>
