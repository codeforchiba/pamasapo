const webpack = require("webpack");

const environment = process.env.NODE_ENV || "development";
const envConfig = require(`./config/environments/${environment}.js`);

const title = "ちば保育園マップ powered by Code for Chiba";
const description = "千葉市在住在勤の忙しいパパママの子育てを応援するため、" +
  "簡単にお好みの保育施設を探せるサービスです。";

module.exports = {
  mode: "spa",

  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns#'
    },
    titleTemplate: (titleChunk) => {
      return titleChunk ?  `${titleChunk} - ちば保育園マップ` : "ちば保育園マップ powered by Code for Chiba"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: description },
      { hid: 'og:site_name', property: 'og:site_name', content: title },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://papamama.code4chiba.org/' },
      { hid: 'og:title', property: 'og:title', content: title },
      { hid: 'og:description', property: 'og:description', content: description },
      { hid: 'og:image', property: 'og:image', content: 'https://papamama.code4chiba.org/ogp.jpg' },
      { hid: 'twitter:card', property: 'twitter:card', content: 'summary_large_image' },
      { hid: 'twitter:site', property: 'twitter:site', content: '@code4chiba' }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "stylesheet", href:  "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons" },
      { rel: "stylesheet", href: "https://api.tiles.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css" }
    ]
  },
  plugins: [
    "~/plugins/vuetify",
    "~/plugins/appsync",
    "~/plugins/localStorage.js"
  ],
  /*
   ** Customize the progress bar color
   */
  loading: { color: "#3B8070" },
  /*
   ** Build configuration
   */
  build: {
    extractCSS: true,
    plugins: [
      new webpack.ProvidePlugin({
        mapboxgl: "mapbox-gl"
      })
    ],
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.devtool = "inline-source-map";

        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }

      config.module.noParse = /(mapbox-gl)\.js$/;
    }
  },
  buildModules: ["@nuxtjs/vuetify"],
  env: {
    ...envConfig,
    mapboxAccessToken: process.env.MAPBOX_ACCESS_TOKEN
  }
};
