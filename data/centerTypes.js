/*
 name: アプリ上の表示名
 value: API 上の定義値
 mapCategory: マップ上のカテゴリ。アイコンの出し分けに使用
 */

const centerTypes = {
  nursery: [
    { id: "NA", name: "認可保育園", value: "保育園", mapCategory: "保育園" },
    { id: "NB", name: "認定こども園", value: "認定こども園", mapCategory: "こども園" },
    { id: "NC", name: "小規模保育", value: "小規模保育事業", mapCategory: "保育園" },
    { id: "ND", name: "家庭的保育", value: "家庭的保育事業", mapCategory: "保育園" },
    { id: "NE", name: "事業所内保育", value: "事業所内保育事業", mapCategory: "保育園" },
    { id: "NF", name: "居宅訪問型保育", value: "居宅訪問型保育", mapCategory: "保育園" },
    { id: "NG", name: "千葉市認可保育園", value: "認可外保育所", mapCategory: "保育園" },
    { id: "NH", name: "幼稚園", value: "幼稚園", mapCategory: "幼稚園" },
    { id: "NI", name: "認可外保育園", value: "認可外保育所", mapCategory: "保育園" }
  ],
  afterSchool: [
    { id: "AA", name: "子どもルーム", value: "子どもルーム", mapCategory: "子どもルーム" }
  ]
}

export default centerTypes
