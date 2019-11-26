import * as queries from "~/graphql/queries/childcenter";

function convertFilter(filter) {
  return {
    nursery: {
      types: filter.nurseryTypes,
      ownerships: filter.ownerships,
      services: filter.services,
      startTime: filter.startTime,
      endTime: filter.endTime
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

  async search({ commit , getters }) {
    if(getters.items.length > 0 ) {
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

  applyFilter({ commit }, filters) {
    commit("APPLY_FILTER", convertFilter(filters));
  }
};
