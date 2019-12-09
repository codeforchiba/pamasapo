# パマサポ

忙しいパパママの子育てを応援するサービス

## 開発手順

以下をローカル環境に準備してください。

* Node.js 10.0 以上
* npm 6.0 以上

``` bash
# install dependencies
$ npm ci

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

### 環境変数
設定が必要な環境変数はこちらを参考にshellで設定してくださ。
```
export APPSYNC_ENDPOINT=https://cc-api.code4chiba.org/graphql
export APPSYNC_API_KEY={APPSYNC_API_KEY}を入力してください
export MAPBOX_ACCESS_TOKEN={MAPBOX_ACCESS_TOKEN}を入力してください
```
