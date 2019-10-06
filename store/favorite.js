export const state = () => ({
  items: []
});

export const getters = {
  items: state => {
    return state.items;
  }
};

export const mutations = {
  add(state, id) {
    state.items.push(id);
  },
  remove(state, id) {
    state.items.splice(state.items.indexOf(id), 1);
  }
};
