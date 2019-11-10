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
          ~nType.indexOf("B4") &&
          row.nursery.facility.nurseryType == "地方裁量型認定こども園"
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
          ~nType.indexOf("E") &&
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
    var selectedOpeningTime = 1000;
    var selectedClosingTime = 1800;

    if (selectedOpeningTime || selectedClosingTime) {
      data = data.filter(row => {
        var openingTime = row.nursery.facility.openingTime;
        openingTime = openingTime.replace(/：/g, "");
        openingTime = openingTime.replace(/:/g, "");

        if (parseInt(openingTime) > selectedOpeningTime) {
          return false;
        }

        var closingTime = row.nursery.facility.closingTime;
        closingTime = closingTime.replace(/：/g, "");
        closingTime = closingTime.replace(/:/g, "");

        if (parseInt(closingTime) < selectedClosingTime) {
          return false;
        }
        return row;
      });
    }

    console.log("保育施設開園/閉園時間抽出後", data.length);

    //保育施設
    //保育開始年齢:ageFrom(なし→追加するとエラー発生)
    //保育終了年齢:ageTo(取得完了)
    //var selectedAgeFrom = 1;
    var selectedAgeTo = 2;

    if (selectedAgeTo) {
      data = data.filter(row => {
        //var ageFrom = row.nursery.facility.ageFrom;

        //if (ageFrom != null && ageFrom > selectedAgeFrom) {
        //  return false;
        //}

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
    //土曜保育:saturdayCareService
    //休日保育:holidayCareService(※対象データなし)
    //夜間保育:nightCareService(※対象データなし)
    //24時間保育:h24CareService(※対象データなし)
    var selectedService = [
      "supportMaturnityLeave",
      "saturdayCareService",
      "holidayCareService",
      "nightCareService",
      "h24CareService"
    ];

    data = data.filter(row => {
      if (
        ~selectedService.indexOf("saturdayCareService") &&
        row.nursery.service.saturdayCareService == true
      ) {
        return row;
      }
      return false;
    });

    console.log("保育サービス抽出後", data.length);
    commit("APPLY_FILTER_SUCCESS", data, convertFilter(filters));
    console.log("actions/applyfilter--end");
  }
};
