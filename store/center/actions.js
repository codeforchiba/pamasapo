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
    //var oType = Array.from(filters.ownerships);
    console.table(nType);

    data = data.filter(row => {
      //if (row.nursery.facility.nurseryType != "保育園") {
      //  return false;
      //}
      if (
        ~nType.indexOf("B4") &&
        row.nursery.facility.nurseryType != "地方裁量型認定こども園"
      ) {
        return false;
      }
      if (
        ~nType.indexOf("D") &&
        row.nursery.facility.nurseryType != "家庭的保育事業"
      ) {
        return false;
      }
      if (
        ~nType.indexOf("E") &&
        row.nursery.facility.nurseryType != "事業所内保育事業"
      ) {
        return false;
      }
      if (
        ~nType.indexOf("G1") &&
        row.nursery.facility.nurserySubType != "先取りプロジェクト"
      ) {
        return false;
      }
      if (
        ~nType.indexOf("G2") &&
        row.nursery.facility.nurserySubType != "保育ルーム"
      ) {
        return false;
      }
      //if (row.nursery.facility.ownership != "私立") {
      //  return false;
      //}
      return row;
    });

    commit("APPLY_FILTER_SUCCESS", data, convertFilter(filters));
    console.log("actions/applyfilter--end");
  }
};
