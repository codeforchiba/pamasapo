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
        <v-card v-if="selectedData">
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="displaySheet = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-spacer />
            <favorite-button :id="selectedDataId" />
          </v-toolbar>
          <v-list two-line>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  {{ selectedData.name }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ selectedData.address }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <tag-bar :item="selectedData" :small="true" />
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-card-actions>
            <v-spacer />
            <v-btn
              text
              color="deep-purple accent-4"
              :to="`/nurseries/${selectedDataId}`"
              nuxt
            >
              詳細を見る...
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-bottom-sheet>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import Mapbox from "mapbox-gl-vue";
import {mapGetters, mapMutations} from "vuex";

import FavoriteButton from "~/components/FavoriteButton";
import TagBar from "~/components/nurseries/TagBar";

import mapCategories from "~/data/mapCategories";

import MapIcon1 from "~/assets/map_icons/1.png";
import MapIcon2 from "~/assets/map_icons/2.png";
import MapIcon3 from "~/assets/map_icons/3.png";
import MapIcon4 from "~/assets/map_icons/4.png";

import { UPDATE_MAP_HISTORY_CENTER, UPDATE_MAP_HISTORY_ZOOM } from "@/store/mutation-types";

export default {
  components: {
    Mapbox,
    FavoriteButton,
    TagBar
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
      defaultCenter: [140.13217, 35.590360000000004],
      mapBoxOptions: {
        style: process.env.mapbox.style,
        center: [140.13217, 35.590360000000004],
        zoom: 10,
        localIdeographFontFamily: "'Noto Sans', 'Noto Sans CJK SC', sans-serif"
      },
      navControl: { show: true, position: "top-right" },
      displaySheet: false,
      selectedData: undefined
    };
  },

  computed: {
    ...mapGetters({
      centers: "center/items",
      mapHistory: 'center/mapHistory',
    }),

    selectedDataId() {
      return _.isNil(this.selectedData) ? null : this.selectedData.id
    }
  },

  methods: {
    ...mapMutations({
      updateMapHistoryCenter: UPDATE_MAP_HISTORY_CENTER,
      updateMapHistoryZoom: UPDATE_MAP_HISTORY_ZOOM,
    }),

    showDialog() {
      this.displaySheet = true;
    },

    mapLoaded(map) {
      // zoom処理mapInitだとvuexからlocalstorageの値が取れない
      const { zoom, center } = this.mapHistory

      map.setZoom(_.isNil(zoom) ? 10 : zoom)
      map.setCenter(_.isNil(center) ? this.defaultCenter : center)

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

      // 幼稚園
      map.loadImage(MapIcon1, (error, image) => {
        if (error) throw error;
        map.addImage("icon1", image, { width: 1, height: 1 });
      });

      // 認可外
      map.loadImage(MapIcon2, (error, image) => {
        if (error) throw error;
        map.addImage("icon2", image, { width: 1, height: 1 });
      });

      // 保育園
      map.loadImage(MapIcon3, (error, image) => {
        if (error) throw error;
        map.addImage("icon3", image, { width: 1, height: 1 });
      });

      // 学童
      map.loadImage(MapIcon4, (error, image) => {
        if (error) throw error;
        map.addImage("icon4", image, { width: 1, height: 1 });
      });

      const features = _.chain(this.centers)
        .map(item => {
          return {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [ item.long, item.lat ]
            },
            properties: item
          }
        });

      const geojson = {
        type: "FeatureCollection",
        features: features
      };

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

      // 種別でループする
      _.forEach(mapCategories, (c) => {
        const layerName = c.name
        const layerId = `map${layerName}`

        map.addLayer({
          id: layerId,
          type: "symbol",
          minzoom: 0,
          maxzoom: 0,
          source: "nursery",
          filter: ["all",
            ["!has", "point_count"],
            ['==', 'mapCategory', layerName],
          ],
          layout: {
            "icon-allow-overlap": true,
            "icon-image": c.icon,
            "icon-size": 0.5
          }
        });

        map.on("click", layerId, (e) => {
          const item = e.features[0].properties
          this.selectedData = {
            id: item.id,
            name: item.name,
            address: item.fullAddress,
            // GeoJSON では、Value に Object を持てないため Stringify されているので復元する
            tags: JSON.parse(item.tags),
            mapCategory: item.mapCategory
          }

          this.showDialog();
        });

        map.on('zoom', () => {
          this.updateMapHistoryZoom(map.getZoom())
        })

        map.on('dragend', () => {
          this.updateMapHistoryCenter(map.getCenter())
        })
      })
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
