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
            <v-spacer />
            <favorite-button :id="dialogData.id" />
          </v-card-actions>
        </v-card>
      </v-bottom-sheet>
    </div>
  </div>
</template>

<script>
import Mapbox from "mapbox-gl-vue";
import {mapGetters, mapMutations} from "vuex";

import FavoriteButton from "~/components/FavoriteButton";

import MapIcon1 from "~/assets/map_icons/1.png";
import MapIcon2 from "~/assets/map_icons/2.png";
import MapIcon3 from "~/assets/map_icons/3.png";
import MapIcon4 from "~/assets/map_icons/4.png";
import {UPDATE_MAP_HISTORY_CENTER, UPDATE_MAP_HISTORY_ZOOM} from "../../store/mutation-types";

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
        style: process.env.mapbox.style,
        center: [140.13217, 35.590360000000004],
        zoom: 10,
        localIdeographFontFamily: "'Noto Sans', 'Noto Sans CJK SC', sans-serif"
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
      centers: "center/items",
      mapHistory: 'center/mapHistory',
    })
  },

  methods: {
    showDialog() {
      this.displaySheet = true;
    },

    setDialog(key, value) {
      this.dialogData[key] = value;
    },

    clearDialog() {
      for (const x in Object.keys(this.dialogData)) {
        this.setDialog(x, '')
      }
    },

    mapLoaded(map) {
      // zoom処理mapInitだとvuexからlocalstorageの値が取れない
      const {zoom,center} = this.mapHistory

      if (typeof zoom === 'undefined') {
        map.setZoom(10)
      } else {
        map.setZoom(zoom)
      }
      if (typeof center === 'undefined') {
        map.setCenter([140.13217, 35.590360000000004])
      } else {
        map.setCenter(center)
      }

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

      // mapboxのfilterではnestしたpropertyを読めないのでデータ加工する
      // https://github.com/mapbox/feature-filter/issues/13
      const self = this;
      const features = this.centers.map(item => {
        // TODO: 仕方ないのでデータ加工する
        // かなり良くない実装なので種別を確実に判定できるカラムをを必ず追加すること
        item['nurseryType'] =  ""
        if (
          item.nursery !== null &&
          item.nursery.facility !== null &&
          item.nursery.facility.nurseryType !== null
        ) {
          item['nurseryType'] = item.nursery.facility.nurseryType
        } else if (typeof item['afterSchool'] !== 'undefined') {
          item['nurseryType'] = '学童'
        }
        return {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [item.long, item.lat]
          },
          properties: item
        };
      });
      // console.log(this.centers);
      const geojson = {
        type: "FeatureCollection",
        features: features
      };

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

      const nurseryTypes = [
        {id: 1, title: '幼稚園'},
        {id: 2, title: '認可外'},
        {id: 3, title: '保育園'},
        {id: 4, title: '学童'},
      ]
      // console.log(nurseryTypes)

      // 種別でループする
      for(const index in nurseryTypes){
        // なぜかindexでしかとれない。。。
        const item = nurseryTypes[index]
        // console.log(item)
        const nurseryTypeId = item['id']
        const nurseryTypeTitle = item['title']
        const layerId = `nursery${nurseryTypeId}`
        // console.log(layerId)
        // console.log(nurseryTypeTitle)

        map.addLayer({
          id: layerId,
          type: "symbol",
          minzoom: 0,
          maxzoom: 0,
          source: "nursery",
          filter: ["all",
            ["!has", "point_count"],
            ['==', 'nurseryType', nurseryTypeTitle],
          ],
          layout: {
            "icon-allow-overlap": true,
            "icon-image": `icon${nurseryTypeId}`,
            "icon-size": 0.5
          }
        });

        map.on("click", layerId, function(e) {
          const properties = e.features[0].properties;
          self.clearDialog();
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
          if(nursery !== null) {
            self.setDialog("start_time", nursery.facility.openingTime);
            self.setDialog("end_time", nursery.facility.closingTime);
            self.setDialog("type", nursery.facility.nurseryType);
          }

          const afterSchool = JSON.parse(properties.afterSchool);
          if (afterSchool !== null) {
            self.setDialog("start_time", afterSchool.facility.openingTime);
            self.setDialog("end_time", afterSchool.facility.closingTime);
            self.setDialog("type", afterSchool.facility.ownership);
          }
          self.showDialog();
        });
        map.on('zoom', function(){
          self.updateMapHistoryZoom(map.getZoom())
        })
        map.on('dragend', function () {
          self.updateMapHistoryCenter(map.getCenter())
        })
      }
    },
    ...mapMutations({
      updateMapHistoryCenter: UPDATE_MAP_HISTORY_CENTER,
      updateMapHistoryZoom: UPDATE_MAP_HISTORY_ZOOM,
    })
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

.v-toolbar__title {
  white-space: normal;
}
</style>
