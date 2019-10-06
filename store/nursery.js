import * as queries from "~/graphql/queries/childcenter";
import serialize from "serialize-error";

export const state = () => ({
  items: [],
  error: undefined,
  loading: false
});

export const getters = {
  items: state => {
    return state.items;
  },
  // store.dispatch('nursery/search')を呼んだあとでないと使えない。
  // TOOD: 一覧データの取得方式を考える
  filter_items: state => ids => {
    // idsでフィルタをかける
    return state.items.filter(item => ids.includes(item.id));
  }
};

export const actions = {
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
  }
};

export const mutations = {
  SEARCH_CENTER(state) {
    state.loading = true;
  },

  SEARCH_CENTER_SUCCESS(state, data) {
    state.items = data.search.items;
    state.loading = false;
  },

  SEARCH_CENTER_FAILURE(state, error) {
    state.error = serialize(error);
    state.loading = false;
  }
};
