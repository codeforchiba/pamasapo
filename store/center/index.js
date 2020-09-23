export const state = () => ({
  current: undefined,
  items: [],
  filteredItems: [],
  filters: {
    types: [],
    ownerships: [],
    services: []
  },
  error: undefined,
  loading: false,
});
