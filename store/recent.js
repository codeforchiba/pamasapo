import { DateTime } from 'luxon';

export const state = () => ({
  histories: [],
  limitLength: process.env.historySize
});

export const getters = {
  histories: state => {
    return state.histories;
  },

  items: (state, getters, rootState, rootGetters) => {
    const items = rootGetters["center/items"];

    return getters.histories.map(h => {
      return {
        item: items.find(i => i.id === h.id),
        timestamp: h.timestamp
      }
    });
  }
};

export const mutations = {
  ADD(state, id) {
    state.histories = state.histories.filter(history => {
      return history.id != id;
    });
    state.histories.unshift({ id: id, timestamp: DateTime.local().toISO() });
    state.histories = state.histories.slice(0, state.limitLength);
  },

  CLEAR(state) {
    state.histories = []
  }
};
