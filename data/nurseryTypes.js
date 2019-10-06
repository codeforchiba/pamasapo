const nurseryTypes = [
  { id: "A", name: "認可保育所" },
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
  {
    id: "C",
    name: "小規模保育",
    children: [
      { id: "C1", name: "A型" },
      { id: "C2", name: "B型" },
      { id: "C3", name: "C型" }
    ]
  },
  { id: "D", name: "家庭的保育" },
  {
    id: "E",
    name: "事業所内保育",
    children: [
      { id: "E1", name: "保育所型" },
      { id: "E2", name: "小規模A型" },
      { id: "E3", name: "小規模B型" }
    ]
  },
  {
    id: "F",
    name: "居宅訪問型保育"
  },
  {
    id: "G",
    name: "認可外保育所",
    children: [
      { id: "G1", name: "先取りプロジェクト" },
      { id: "G2", name: "保育ルーム" }
    ]
  },
  {
    id: "H",
    name: "幼稚園"
  },
  {
    id: "I",
    name: "無認可保育所"
  }
];

export default nurseryTypes;
