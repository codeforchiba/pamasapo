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
import MapIcon1 from "~/assets/map_icons/1.png";
import MapIcon2 from "~/assets/map_icons/2.png";
import MapIcon3 from "~/assets/map_icons/3.png";

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
      // station
      map.addLayer({
        id: "station",
        type: "symbol",
        source: {
          type: "geojson",
          data:
            "/station.geojson"
        },
        layout: {
          "icon-image": "rail-15",
          "text-field": "{station_name}",
          "text-anchor": "top",
          "text-offset": [0, 0.6]
        }
      });

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

      // 幼稚園
      map.loadImage(MapIcon1, function(error, image) {
        if (error) throw error;
        map.addImage("icon1", image, { width: 1, height: 1 });
      });

      // 認可外
      map.loadImage(MapIcon2, function(error, image) {
        if (error) throw error;
        map.addImage("icon2", image, { width: 1, height: 1 });
      });

      // 保育園
      map.loadImage(MapIcon3, function(error, image) {
        if (error) throw error;
        map.addImage("icon3", image, { width: 1, height: 1 });
      });

      // nurser
      map.addSource("nursery", {
        type: "geojson",
        data: geojson,
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50
      });

      // cluster_count
      map.addLayer({
        id: "clusters",
        type: "circle",
        source: "nursery",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": "#fbb03b",
          "circle-radius": 20
        }
      });

      map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "nursery",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 14
        }
      });

      // 保育園
      map.addLayer({
        id: "nursery3",
        type: "symbol",
        minzoom: 0,
        maxzoom: 0,
        source: "nursery",
        filter: ["!", ["has", "point_count"]],
        layout: {
          "icon-allow-overlap": true,
          "icon-image": "icon3",
          "icon-size": 0.5
        }
        // TODO: 色分け表示はデータを見直さないと無理
        //
        // filter: ['==', 'nursery.facility.nurseryType', "保育園"]
      });

      map.on("click", "nursery3", function(e) {
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
