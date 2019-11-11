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

  async search({ commit }) {
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
    var data = state.items;
    var nType = Array.from(filters.nurseryTypes);
    var oType = Array.from(filters.ownerships);
    console.log("抽出条件");
    console.table(filters);
    console.log("抽出前件数", data.length);
    console.log(filters.services);

    if (oType.length > 0) {
      data = data.filter(row => {
        if (
          ~oType.indexOf("public") &&
          row.nursery.facility.ownership == "公立"
        ) {
          return row;
        }
        if (
          ~oType.indexOf("private") &&
          row.nursery.facility.ownership == "私立"
        ) {
          return row;
        }
        return false;
      });
    }

    console.table("保育施設属性抽出後", data.length);

    //保育施設種別
    if (nType.length > 0) {
      data = data.filter(row => {
        //保育施設種別
        //未実装
        //
        //園庭:hasYard
        //庭園広さ:areaOfYard
        //プール:hasPool
        //駐車場:hasParkingLot
        //駐車場:numberOfParkingLot
        //if (row.nursery.facility.nurseryType != "保育園") {
        //  return false;
        //}
        if (
          ~nType.indexOf("A") &&
          row.nursery.facility.nurseryType == "保育園"
        ) {
          return row;
        }
        if (
          ~nType.indexOf("B4") &&
          row.nursery.facility.nurseryType == "地方裁量型認定こども園"
        ) {
          return row;
        }
        if (
          (~nType.indexOf("C1") || ~nType.indexOf("C2")  || ~nType.indexOf("C3") ) &&
          row.nursery.facility.nurseryType == "小規模保育事業"
        ) {
          return row;
        }
        if (
          ~nType.indexOf("D") &&
          row.nursery.facility.nurseryType == "家庭的保育事業"
        ) {
          return row;
        }
        if (
          (~nType.indexOf("E1") || ~nType.indexOf("E2")  || ~nType.indexOf("E3") ) &&
          row.nursery.facility.nurseryType == "事業所内保育事業"
        ) {
          return row;
        }
        if (
          ~nType.indexOf("G1") &&
          row.nursery.facility.nurserySubType == "先取りプロジェクト"
        ) {
          return row;
        }
        if (
          ~nType.indexOf("G2") &&
          row.nursery.facility.nurserySubType == "保育ルーム"
        ) {
          return row;
        }
      });
    }
    console.log("保育施設種別抽出後", data.length);

    //保育施設
    //開園時間:openingTime
    //閉園時間:closingTime
    var selectedOpeningTime = filters.startTime;
    if(selectedOpeningTime != null )
      selectedOpeningTime = selectedOpeningTime.replace(/:/g, "");
    console.log("startTime",selectedOpeningTime);
    
    var selectedClosingTime = filters.endTime;
    if(selectedClosingTime != null)
      selectedClosingTime = selectedClosingTime.replace(/:/g, "");
    console.log("endTime",selectedClosingTime);

    if (selectedOpeningTime || selectedClosingTime) {
      data = data.filter(row => {
        var openingTime = row.nursery.facility.openingTime;
        openingTime = openingTime.replace(/：/g, "");
        openingTime = openingTime.replace(/:/g, "");

        if (parseInt(openingTime) > parseInt(selectedOpeningTime)) {
          return false;
        }

        var closingTime = row.nursery.facility.closingTime;
        closingTime = closingTime.replace(/：/g, "");
        closingTime = closingTime.replace(/:/g, "");

        if (parseInt(closingTime) < parseInt(selectedClosingTime)) {
          return false;
        }
        return row;
      });
    }

    console.log("保育施設開園/閉園時間抽出後", data.length);

    //保育施設
    //保育開始年齢:ageFrom
    //保育終了年齢:ageTo
    var selectedAgeFrom = 1;
    var selectedAgeTo = 2;

    if (selectedAgeTo) {
      data = data.filter(row => {
        var ageFrom = row.nursery.facility.ageFrom;

        if (ageFrom != null && ageFrom > selectedAgeFrom) {
          return false;
        }

        var ageTo = row.nursery.facility.ageTo;
        if (ageTo != null && ageTo < selectedAgeTo) {
          return false;
        }
        return row;
      });
    }

    console.log("保育終了年齢抽出後", data.length);
    //■保育サービス
    //産休明け保育:supportMaturnityLeave(※データなし)
    //休日保育:holidayCareService(※対象データなし)
    //夜間保育:nightCareService(※対象データなし)
    //24時間保育:h24CareService(※対象データなし)
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
        let Sflag = false;

        serviceProperties.forEach(p => {
          if (filters.services[p.key] == true && 
            (row.nursery.service[p.key] == null || row.nursery.service[p.key] == true)) {
            Sflag = true;
          }
        });  

        if(Sflag == true){
          return row;
        }
        else{
          return false;
        }
      });
    }
    console.log("保育サービス抽出後", data.length);
    commit("APPLY_FILTER_SUCCESS", data, convertFilter(filters));
    console.log("actions/applyfilter--end");
  }
};
