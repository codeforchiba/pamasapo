export const state = () => ({
  items: []
});

export const getters = {
  items: state => {
    return state.items;
  },

  included: state => id => {
    return state.items.includes(id);
  }
};

export const mutations = {
  REGISTER(state, id) {
    state.items.push(id);
  },

  UNREGISTER(state, id) {
    state.items.splice(state.items.indexOf(id), 1);
  }
};
