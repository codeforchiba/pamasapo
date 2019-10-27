const webpack = require("webpack");

const environment = process.env.NODE_ENV || "development";
const envConfig = require(`./config/environments/${environment}.js`);

const title = "ちば保育園マップ powered by Code for Chiba";

module.exports = {
  mode: "spa",

  /*
   ** Headers of the page
   */
  head: {
    title: title,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "next papamama project"
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
      },
      {
        rel: "stylesheet",
        href: "https://api.tiles.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css"
      }
    ]
  },
  plugins: [
    "~/plugins/vuetify",
    "~/plugins/appsync",
    { src: "~/plugins/localStorage.js", ssr: false }
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
    ...envConfig
  }
};
