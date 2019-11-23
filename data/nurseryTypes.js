const nurseryTypes = [
  { id: "A", name: "保育園" },
  {
    id: "B",
    name: "こども園",
    children: [
      { id: "B1", name: "幼保連携型" },
      { id: "B2", name: "幼稚園型" },
      { id: "B3", name: "保育所型" },
      { id: "B4", name: "地方裁量型" }
    ]
  },
  { id: "C", name: "小規模保育事業" },
  { id: "D", name: "家庭的保育事業" },
  { id: "E", name: "事業所内保育事業" },
  { id: "F", name: "居宅訪問型保育" },
  {
    id: "G",
    name: "認可外保育施設",
    children: [
      { id: "G1", name: "先取りプロジェクト" },
      { id: "G2", name: "保育ルーム" }
    ]
  },
  { id: "H", name: "幼稚園" },
  { id: "I", name: "無認可保育施設" }
];

export default nurseryTypes;
