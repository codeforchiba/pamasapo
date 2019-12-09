const config = {
  apiEndpoint: process.env.APPSYNC_ENDPOINT,
  apiKey: process.env.APPSYNC_API_KEY,
  historySize: 5,
  mapbox: {
    accessToken: process.env.MAPBOX_ACCESS_TOKEN
  }
}

module.exports = config
