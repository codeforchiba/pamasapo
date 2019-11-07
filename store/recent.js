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
    state.histories.unshift({ id: id, timestamp: new Date() });
    state.histories = state.histories.slice(0, state.limitLength);
  }
};
