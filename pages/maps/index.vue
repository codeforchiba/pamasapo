<template>
  <div>
    <client-only>
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
    </client-only>
    <div>
      <v-bottom-sheet v-model="displaySheet">
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="displaySheet = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>
              {{ dialogData.title }} ({{ dialogData.type }})
            </v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-list three-line subheader>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>住所</v-list-item-title>
                <v-list-item-subtitle>
                  {{ dialogData.address }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>時間</v-list-item-title>
                <v-list-item-subtitle>
                  {{ dialogData.start_time }}〜{{ dialogData.end_time }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-card-actions>
            <v-btn
              text
              color="deep-purple accent-4"
              :to="`/nurseries/${dialogData.id}`"
              nuxt
            >
              詳細を見る...
            </v-btn>
            <div class="flex-grow-1" />
            <favorite-button :id="dialogData.id" />
            <v-btn @click="displaySheet = false">
              閉じる
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-bottom-sheet>
    </div>
  </div>
</template>

<script>
import Mapbox from "mapbox-gl-vue";
import FavoriteButton from "~/components/FavoriteButton";
import { mapGetters } from "vuex";

export default {
  components: {
    Mapbox,
    FavoriteButton
  },

  async fetch({ store }) {
    await store.dispatch("center/search");
  },

  asyncData(context) {
    return {
      accessToken: context.env.mapbox.accessToken
    };
  },

  data() {
    return {
      displaySheet: false,
      mapBoxOptions: {
        style: "mapbox://styles/mapbox/streets-v10",
        center: [140.13217, 35.590360000000004],
        zoom: 10
      },
      navControl: { show: true, position: "top-right" },
      dialogData: {
        id: "",
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

  methods: {
    showDialog() {
      this.displaySheet = true;
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
        const properties = e.features[0].properties;
        self.setDialog("id", properties.id);
        self.setDialog("title", properties.name);
        self.setDialog(
          "address",
          properties.prefecture +
            properties.city +
            properties.ward +
            properties.address
        );

        const nursery = JSON.parse(properties.nursery);
        self.setDialog("start_time", nursery.facility.openingTime);
        self.setDialog("end_time", nursery.facility.closingTime);
        self.setDialog("type", nursery.facility.nurseryType);
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
