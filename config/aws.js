const settings = {
  AppSync: {
    graphqlEndpoint: process.env.apiEndpoint,
    region: "ap-northeast-1",
    apiKey: process.env.apiKey
  }
};

export default settings;
