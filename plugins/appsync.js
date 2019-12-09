import AWSAppSyncClient, { AUTH_TYPE } from "aws-appsync";

import settings from "~/config/aws";

const client = new AWSAppSyncClient({
  url: settings.AppSync.graphqlEndpoint,
  region: settings.AppSync.region,
  auth: {
    type: AUTH_TYPE.API_KEY,
    apiKey: settings.AppSync.apiKey
  },
  disableOffline: true
});

// eslint-disable-next-line no-unused-vars
export default ({ app }, inject) => {
  inject("apiClient", client);
};
