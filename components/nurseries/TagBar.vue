<template>
  <v-chip-group>
    <v-chip v-for="tag in tags" :key="tag.value" :color="tagColor(tag.type)">
      {{ tag.value }}
    </v-chip>
  </v-chip-group>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },

  computed: {
    tags() {
      return this.item.tags;
    }
  },

  methods: {
    tagColor(type) {
      if (type === "service") {
        return "pink lighten-4";
      } else {
        return null;
      }
    }
  }
};
</script>
