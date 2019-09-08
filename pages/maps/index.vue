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
import Mapbox from 'mapbox-gl-vue';
import Dialog from '~/components/maps/Dialog.vue'

export default {
  components: {
    Mapbox,
    Dialog
  },

  data() {
    return {
      mapBoxOptions: {
        style: 'mapbox://styles/mapbox/streets-v10',
        center: [140.13217,35.590360000000004],
        zoom: 10
      },
      navControl: {show: true, position: 'top-right' },
      dialogData: {
        dialogShow: false,
        title: '開発中の画面です。タイトル',
        address: '千葉県松戸市五香1-1-1',
        aki: '',
        start_time: '00:00',
        end_time: '00:00',
        type: 'type',
      }
    }
  },

  asyncData(context){
    return {
      accessToken: context.env.mapbox.accessToken
    }
  },

  methods: {
    showDialog() {
      this.dialogData.dialogShow = true
    },
    setDialog(key, value) {
      this.dialogData[key] = value
    },
    mapLoaded(map){
      const self = this
      // nursery
      map.addLayer({
        "id": 'nursery',
        "type": "symbol",
        "source": {
          type: 'geojson',
          data: 'https://raw.githubusercontent.com/codeforchiba/papamama/develop/data/nurseryFacilities.geojson',
        },
        'layout': {
          'icon-image': 'star-15',
          'text-field': '{Name}',
          'text-anchor': 'top',
          'text-offset': [ 0, 0.6 ]
        },
      });

      // station
      map.addLayer({
        "id": 'station',
        "type": "symbol",
        "source": {
          type: 'geojson',
          data: 'https://raw.githubusercontent.com/codeforchiba/papamama/develop/data/station.geojson',
        },
        'layout': {
          'icon-image': 'rail-15',
          'text-field': '{station_name}',
          'text-anchor': 'top',
          'text-offset': [ 0, 0.6 ]
        },
      });

      map.on('click', 'nursery', function (e) {
        let coordinates = e.features[0].geometry.coordinates.slice();
        let properties = e.features[0].properties;
        self.setDialog('title', properties.Name)
        self.setDialog('address', properties.Address)
        self.setDialog('start_time', properties.Open)
        self.setDialog('end_time', properties.Close)
        self.setDialog('type', properties.Type)
        self.showDialog()
      });
    }
  },
}
</script>

<style scoped>
#map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
</style>
