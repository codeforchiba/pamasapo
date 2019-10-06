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

  applyFilter({ commit }, filter) {
    commit("APPLY_CENTER_FILTER");
    commit("APPLY_CENTER_FILTER_SUCCESS", convertFilter(filter));
  }
};
