export const state = () => ({
  current: undefined,
  items: [],
  filteredItems: [],
  filters: {
    nursery: {
      types: [],
      ownerships: [],
      services: []
    },
  },
  error: undefined,
  loading: false,
});
