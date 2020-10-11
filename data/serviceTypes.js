const serviceTypes = {
  common: [
    { id: "CA", key: "saturdayCareService", name: "土曜日対応", label: "土曜可" },
    { id: "CB", key: "holidayCareService", name: "休日対応", label: "休日可" },
    { id: "CC", key: "extendedCareService", name: "延長対応", label: "延長" }
  ],
  nursery: [
    { id: "NA", key: "supportMaternityLeave", name: "産休明け保育対応", label: "産休明け" },
    { id: "NB", key: "temporaryCareService", name: "一時利用(定期)", label: "一時(定期)" },
    { id: "NC", key: "spotCareService", name: "一時利用(不定期)", label: "一時(不定期)" },
    { id: "ND", key: "nightCareService", name: "夜間保育対応", label: "夜間" },
    { id: "NE", key: "h24CareService", name: "24時間保育対応", label: "24時間" }
  ]
}

export default serviceTypes
