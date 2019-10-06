import { serializeError } from "serialize-error";

export default {
  SEARCH_CENTER(state) {
    state.loading = true;
  },

  SEARCH_CENTER_SUCCESS(state, data) {
    state.items = data.search.items;
    state.loading = false;
  },

  SEARCH_CENTER_FAILURE(state, error) {
    state.error = serializeError(error);
    state.loading = false;
  }
};
