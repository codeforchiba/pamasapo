export const state = () => ({
  current: undefined,
  items: [],
  filteredItems: [],
  filters: {
    nurseryTypes: [],
    ownerships: []
  },
  error: undefined,
  loading: false,
  itemsIsCached: false
});
