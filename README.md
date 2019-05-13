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
設定が必要な環境変数は `.envrc_sample` を参照してください。

direnv を利用して環境変数を設定する場合は [こちら](https://github.com/direnv/direnv "direnv") 
を参照してインストールしてください。

`.envrc`は
```bash
cp .envrc_sample .envrv
```
としてファイルをcopyし `.envrv` の内容を編集してください。
