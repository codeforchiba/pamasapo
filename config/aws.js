const settings = {
  AppSync: {
    graphqlEndpoint: process.env.aws.appsync.endpoint,
    region: process.env.aws.region,
    apiKey: process.env.aws.appsync.apiKey
  }
};

export default settings;
