export const state = () => ({
  current: undefined,
  items: [],
  mapHistory:{
    center: undefined,
    zoom: undefined,
  },
  filteredItems: [],
  filters: {
    types: [],
    ownerships: [],
    services: []
  },
  error: undefined,
  loading: false,
});
