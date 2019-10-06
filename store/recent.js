const limitLength = process.env.recent.limitLength;
export const state = () => ({
  histories: [],
  limitLength: limitLength
});

export const getters = {
  histories: state => {
    return state.histories;
  },
  recent_items: (state, getters, rootState, rootGetters) => () => {
    const ids = [];
    state.histories.forEach(function(item) {
      ids.push(item.id);
    });

    const ns = rootGetters["nursery/filter_items"](ids);

    const ns_hash = {};
    ns.forEach(nursery => {
      ns_hash[nursery.id] = nursery;
    });

    const nurseries = [];
    state.histories.forEach(function(item) {
      let d = new Date(item.timestamp);
      nurseries.push({
        item: ns_hash[item.id],
        timestamp: `${d.toLocaleDateString()} ${`${d.getHours()}時${d.getMinutes()}分`}`
      });
    });

    return nurseries;
  }
};

export const mutations = {
  add(state, id) {
    state.histories = state.histories.filter(history => {
      return history.id != id;
    });
    state.histories.unshift({ id: id, timestamp: new Date() });
    state.histories = state.histories.slice(0, state.limitLength);
  }
};
