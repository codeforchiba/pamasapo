<template>
  <div>
    <Dialog :dialog-data="dialogData" />
    <no-ssr>
      <mapbox
        v-if="accessToken"
        :access-token="accessToken"
        :map-options="mapBoxOptions"
        :nav-control="navControl"
        @map-load="mapLoaded"
      />
      <p v-else>
        mapboxのapikeyが設定されていません。
      </p>
    </no-ssr>
  </div>
</template>

<script>
import Mapbox from "mapbox-gl-vue";
import Dialog from "~/components/maps/Dialog.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    Mapbox,
    Dialog
  },

  data() {
    return {
      mapBoxOptions: {
        style: "mapbox://styles/mapbox/streets-v10",
        center: [140.13217, 35.590360000000004],
        zoom: 10
      },
      navControl: { show: true, position: "top-right" },
      dialogData: {
        dialogShow: false,
        title: "開発中の画面です。タイトル",
        address: "千葉県松戸市五香1-1-1",
        aki: "",
        start_time: "00:00",
        end_time: "00:00",
        type: "type"
      }
    };
  },
  computed: {
    ...mapGetters({
      centers: "center/items"
    })
  },
  asyncData(context) {
    return {
      accessToken: context.env.mapbox.accessToken
    };
  },
  async fetch({ store }) {
    await store.dispatch("center/search");
  },
  methods: {
    showDialog() {
      this.dialogData.dialogShow = true;
    },
    setDialog(key, value) {
      this.dialogData[key] = value;
    },
    mapLoaded(map) {
      const self = this;
      const features = this.centers.map(item => {
        return {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [item.long, item.lat]
          },
          properties: item
        };
      });
      // eslint-disable-next-line no-debugger
      debugger;
      const geojson = {
        type: "FeatureCollection",
        features: features
      };
      // nursery
      map.addLayer({
        id: "nursery",
        type: "symbol",
        source: {
          type: "geojson",
          data: geojson
        },
        layout: {
          "icon-image": "star-15",
          "text-field": "{name}",
          "text-anchor": "top",
          "text-offset": [0, 0.6]
        }
      });

      // station
      map.addLayer({
        id: "station",
        type: "symbol",
        source: {
          type: "geojson",
          data:
            "https://raw.githubusercontent.com/codeforchiba/papamama/develop/data/station.geojson"
        },
        layout: {
          "icon-image": "rail-15",
          "text-field": "{station_name}",
          "text-anchor": "top",
          "text-offset": [0, 0.6]
        }
      });

      map.on("click", "nursery", function(e) {
        // let coordinates = e.features[0].geometry.coordinates.slice();
        // eslint-disable-next-line no-debugger
        debugger;
        let properties = e.features[0].properties;
        self.setDialog("title", properties.name);
        self.setDialog(
          "address",
          properties.prefecture +
            properties.city +
            properties.ward +
            properties.address
        );
        // TODO
        // e.features[0].properties.nursery が Stringになってしまう。
        self.setDialog("start_time", properties.nursery.facility.openingTime);
        self.setDialog("end_time", properties.nursery.facility.closingTime);
        self.setDialog("type", properties.nursery.facility.nurseryType);
        self.showDialog();
      });
    }
  }
};
</script>

<style scoped>
#map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
</style>
