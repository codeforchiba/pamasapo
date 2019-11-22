import * as queries from "~/graphql/queries/childcenter";

function convertFilter(filter) {
  return {
    nursery: {
      types: filter.nurseryTypes,
      ownerships: filter.ownerships
    }
  };
}

export default {
  async load({ commit }, id) {
    commit("LOAD_CENTER");

    try {
      let { data } = await this.$apiClient.query({
        query: queries.get,
        variables: { id: id }
      });

      commit("LOAD_CENTER_SUCCESS", data.get);
    } catch (e) {
      commit("LOAD_CENTER_FAILURE", e);
    }
  },

  async search({ commit, getters }) {
    if (getters['items'].length > 0) {
      return;
    }

    commit("SEARCH_CENTER");

    try {
      let { data } = await this.$apiClient.query({
        query: queries.search
      });
      commit("SEARCH_CENTER_SUCCESS", data);
    } catch (e) {
      commit("SEARCH_CENTER_FAILURE", e);
    }
  },

  applyFilter({ commit, state }, filters) {
    commit("APPLY_FILTER", filters);
    let data = state.items;
    let nurseryTypes = Array.from(filters.nurseryTypes);
    let ownerships = Array.from(filters.ownerships);

    //
    if (ownerships.length > 0) {
      data = data.filter(row => {
        if (
          ~ownerships.indexOf("public") &&
          row.nursery.facility.ownership == "公立"
        ) {
          return row;
        }
        if (
          ~ownerships.indexOf("private") &&
          row.nursery.facility.ownership == "私立"
        ) {
          return row;
        }
        return false;
      });
    }

    //保育施設種別
    if (nurseryTypes.length > 0) {
      data = data.filter(row => {
        //以下、未実装
        //園庭:hasYard
        //庭園広さ:areaOfYard
        //プール:hasPool
        //駐車場:hasParkingLot
        //駐車場:numberOfParkingLot
        if (
          ~nurseryTypes.indexOf("A") &&
          row.nursery.facility.nurseryType == "保育園"
        ) {
          return row;
        }
        if (
          ~nurseryTypes.indexOf("B1") &&
          row.nursery.facility.nurseryType == "幼保連携型認定こども園"
        ) {
          return row;
        }
        if (
          ~nurseryTypes.indexOf("B2") &&
          row.nursery.facility.nurseryType == "幼稚園型認定こども園"
        ) {
          return row;
        }
        if (
          ~nurseryTypes.indexOf("B3") &&
          row.nursery.facility.nurseryType == "保育所型認定こども園"
        ) {
          return row;
        }
        if (
          ~nurseryTypes.indexOf("B4") &&
          row.nursery.facility.nurseryType == "地方裁量型認定こども園"
        ) {
          return row;
        }
        if (
          (~nurseryTypes.indexOf("C1") || ~nurseryTypes.indexOf("C2")  || ~nurseryTypes.indexOf("C3") ) &&
          row.nursery.facility.nurseryType == "小規模保育事業"
        ) {
          return row;
        }
        if (
          ~nurseryTypes.indexOf("D") &&
          row.nursery.facility.nurseryType == "家庭的保育事業"
        ) {
          return row;
        }
        if (
          (~nurseryTypes.indexOf("E1") || ~nurseryTypes.indexOf("E2")  || ~nurseryTypes.indexOf("E3") ) &&
          row.nursery.facility.nurseryType == "事業所内保育事業"
        ) {
          return row;
        }
        if (
          ~nurseryTypes.indexOf("G1") &&
          row.nursery.facility.nurserySubType == "先取りプロジェクト"
        ) {
          return row;
        }
        if (
          ~nurseryTypes.indexOf("G2") &&
          row.nursery.facility.nurserySubType == "保育ルーム"
        ) {
          return row;
        }
      });
    }

    //保育施設(開園時間と終園時間)
    let selectedOpeningTime = filters.startTime;
    if(selectedOpeningTime != null ) selectedOpeningTime = selectedOpeningTime.replace(/:/g, "");

    let selectedClosingTime = filters.endTime;
    if(selectedClosingTime != null) selectedClosingTime = selectedClosingTime.replace(/:/g, "");

    if (selectedOpeningTime || selectedClosingTime) {
      data = data.filter(row => {
        let openingTime = row.nursery.facility.openingTime;
        openingTime = openingTime.replace(/：/g, "");
        openingTime = openingTime.replace(/:/g, "");

        if (parseInt(openingTime) > parseInt(selectedOpeningTime)) {
          return false;
        }

        let closingTime = row.nursery.facility.closingTime;
        closingTime = closingTime.replace(/：/g, "");
        closingTime = closingTime.replace(/:/g, "");

        if (parseInt(closingTime) < parseInt(selectedClosingTime)) {
          return false;
        }
        return row;
      });
    }

    //保育施設(保育開始年齢と保育終了年齢)
    let selectedAgeFrom = 1;
    let selectedAgeTo = 2;

    if (selectedAgeTo||selectedAgeFrom) {
      data = data.filter(row => {
        let ageFrom = row.nursery.facility.ageFrom;

        if (ageFrom != null && ageFrom > selectedAgeFrom) {
          return false;
        }

        let ageTo = row.nursery.facility.ageTo;
        if (ageTo != null && ageTo < selectedAgeTo) {
          return false;
        }
        return row;
      });
    }

    //■保育サービス
    const serviceProperties = [
      { key: "supportMaternityLeave"},
      { key: "saturdayCareService"},
      { key: "holidayCareService"},
      { key: "temporaryCareService"},
      { key: "spotCareService"},
      { key: "extendedCareService"},
      { key: "nightCareService"},
      { key: "h24CareService"}
    ];

    let serviceSelectFlag = false;

    serviceProperties.forEach(p => {
      if (filters.services[p.key] == true)
      serviceSelectFlag = true;
    });

    if (serviceSelectFlag == true) {

      data = data.filter(row => {
        let serviceFlag = false;

        serviceProperties.forEach(p => {
          if (filters.services[p.key] == true &&
            (row.nursery.service[p.key] == null || row.nursery.service[p.key] == true)) {
              serviceFlag = true;
          }
        });

        return serviceFlag ? row: false;

      });
    }

    commit("APPLY_FILTER_SUCCESS", data, convertFilter(filters));
  }
};
