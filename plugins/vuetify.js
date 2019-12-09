import Vue from "vue";
import Vuetify from "vuetify/lib";
import Mapbox from "mapbox-gl-vue";

Vue.use(Vuetify, Mapbox);

export default new Vuetify({
  icons: {
    iconfont: "mdi"
  }
});
