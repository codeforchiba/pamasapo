<template>
  <client-only>
    <mapbox
      v-if="accessToken"
      :access-token="accessToken"
      :map-options="mapBoxOptions"
      :nav-control="navControl"
      @map-load="mapLoaded"
    />
    <p v-else>
      地図を表示できません。
    </p>
  </client-only>
</template>

<script>
import Mapbox from "mapbox-gl-vue";
import * as mapboxgl from "mapbox-gl";

export default {
  components: {
    Mapbox
  },

  props: {
    item: { type: Object, required: true }
  },

  data() {
    return {
      navControl: { show: false },
      accessToken: process.env.mapboxAccessToken
    };
  },

  computed: {
    mapBoxOptions() {
      return {
        style: "mapbox://styles/mapbox/streets-v10",
        center: [this.item.long, this.item.lat],
        zoom: 13,
        interactive: false
      };
    }
  },

  methods: {
    mapLoaded(map) {
      const self = this;
      new mapboxgl.Marker()
        .setLngLat([self.item.long, self.item.lat])
        .addTo(map);
    }
  }
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 200px;
}

.marker {
  /*TODO: 保育園のアイコンを用意して差し替える*/
  background-image: url("https://docs.mapbox.com/help/demos/custom-markers-gl-js/mapbox-icon.png");
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
}
</style>
